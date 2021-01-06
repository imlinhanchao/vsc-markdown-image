import * as vscode from 'vscode';
import got from 'got';
import * as formData from 'form-data';
import * as fs from 'fs';
import { locale as $l } from './utils';

class Imgur implements Upload
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
            form.append('smfile', fs.createReadStream(filePath));
            if (this.config.sm_ms.token) { form.append('file_id', 0); }
            let headers = this.config.sm_ms.token ? {
                Authorization: `Basic ${this.config.sm_ms.token}`
            } : undefined;
            let rsp = await got.post('https://sm.ms/api/v2/upload', {
                body: form,
                headers
            });
            
            let body = JSON.parse(rsp.body);
            return body.images || body.data.url;
        }
        catch(e) {
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default Imgur;