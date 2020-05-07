import * as vscode from 'vscode';
import * as HttpsProxyAgent from 'https-proxy-agent';
import got from 'got';
import * as formData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';

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

    async upload(filePath: string): Promise<string | null> {
        try {
            let tunnel = this.config.imgur.httpProxy ? new HttpsProxyAgent(this.config.imgur.httpProxy) : undefined;

            const form = new formData();
            form.append('name', path.basename(filePath));
            form.append('type', 'file');
            form.append('image', fs.createReadStream(filePath));
            let rsp = await got.post('https://api.imgur.com/3/image', {
                headers: {
                    'Authorization': `Client-ID ${this.config.imgur.clientId}`
                },
                body: form,
                agent: tunnel
            });

            return JSON.parse(rsp.body).data.link;
        }
        catch(e) {
            vscode.window.showInformationMessage(`Upload File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Imgur;