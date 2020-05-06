import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import utils from './utils';
import * as qiniu from 'qiniu';

class Qiniu implements Upload
{
    config: Config;
    token: string;
    lastTimestramp: number;
    constructor(config: Config) {
        this.config = config;
        this.token = '';
        this.lastTimestramp = 0;
    }

    async reconfig(config: Config) {
        this.config = config;
        this.token = '';
        this.lastTimestramp = 0;
    }

    async upload(filePath: string): Promise<string | null> {
        try {
            let key = utils.hash(fs.readFileSync(filePath)) + path.extname(filePath);
            let token = this.getToken(key);
            let config: qiniu.conf.ConfigOptions = new qiniu.conf.Config();
            config.zone = qiniu.zone.Zone_z0;

            let formUploader = new qiniu.form_up.FormUploader(config);
            let putExtra = new qiniu.form_up.PutExtra();

            let upload = () : Promise<string> => {
                return new Promise((resolve, reject) => {
                    formUploader.putFile(token, key, filePath, putExtra, (respErr, respBody, respInfo) => {
                        if (respErr) {  
                            reject(respErr);
                        }
                        if (respInfo.statusCode === 200) {
                            console.log(respBody);
                        } else {
                            console.log(respInfo.statusCode);
                            console.log(respBody);
                            resolve(url.resolve(this.config.qiniu.domain, key));
                        }
                    });
                });
            };

            return await upload();
        }
        catch(e) {
            vscode.window.showInformationMessage(`Upload File Failed: ${e.message}`);
            return null;
        }
    }

    getToken(filename: string): string {
        let mac = new qiniu.auth.digest.Mac(this.config.qiniu.accessKey, this.config.qiniu.secretKey);
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: this.config.qiniu.bucket + ':' + filename,
        });
        return putPolicy.uploadToken(mac);
    }
}

export default Qiniu;