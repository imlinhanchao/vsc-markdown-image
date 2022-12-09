import * as vscode from 'vscode';
import * as path from 'path';
import { locale as $l } from './utils';
import * as fs from 'fs';
import * as url from 'url';
const upyun = require('upyun');

class Upyun implements Upload
{
    config: Config;
    client: any;
    lastTimestamp: number;
    constructor(config: Config) {
        this.config = config;
        this.client = null;
        this.lastTimestamp = 0;
    }

    async reconfig(config: Config) {
        this.config = config;
        this.client = null;
        this.lastTimestamp = 0;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try{
            savePath = path.join(this.config.upyun.path, savePath).replace(/\\/g, '/').replace(/^\/|\/$/, '');
            let link = "v0.api.upyun.com";
            switch(this.config.upyun.link) {
                case $l['upyun.smart']: link = "v0.api.upyun.com"; break;
                case $l['upyun.telecom']: link = "v1.api.upyun.com"; break;
                case $l['upyun.unicom']: link = "v2.api.upyun.com"; break;
                case $l['upyun.mobile']: link = "v3.api.upyun.com"; break;
            }
            let client = this.getClient(
                this.config.upyun.bucket, 
                this.config.upyun.operator, 
                this.config.upyun.password,
                link);
                let file = fs.readFileSync(filePath)

                let upload = () : Promise<string> => {
                    return new Promise((resolve, reject) => {
                        client.putFile(savePath, file).then( (res: any) => {
                            console.debug(res);
                            if(res){
                                resolve(url.resolve(this.config.upyun.domain, savePath));
                            }else{
                                reject();
                            }
                        });
                    });
                };
            return await upload(); 
        }catch(error) {
            let e = error as Error;
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }


    getClient(bucket: string, operator: string, password: string, domain: string){
        var options = {
            domain: domain
        };
        return  new upyun.Client(new upyun.Service(bucket, operator, password),options);
    }


}

export default Upyun;