import * as vscode from 'vscode';
import got from 'got';
import * as formData from 'form-data';
import * as fs from 'fs';
import { locale as $l } from './utils';

class S_EE implements Upload
{
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }
    
    async getSavePath(filePath: string) {
        return filePath;
    }

    async reconfig(config: Config) {
        this.config = config;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            const form = new formData();
            form.append('file', fs.createReadStream(filePath));
            if(!this.config.s_ee.token) {
                vscode.window.showInformationMessage(`${$l['see.token-miss']}`);
                return null;
            }
            let headers = {
                Authorization: `${this.config.s_ee.token}`
            };
            let rsp = await got.post('https://s.ee/api/v1/file/upload', {
                body: form,
                headers
            });
            
            let body = JSON.parse(rsp.body);
            if (body.code !== 200) throw new Error(body.message);
            return body.data.url;
        }
        catch(error) {
            let e = error as Error;
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default S_EE;