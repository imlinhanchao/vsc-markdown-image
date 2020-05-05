import * as vscode from 'vscode';
import got from 'got';
import * as formData from 'form-data';
import * as fs from 'fs';

class Imgur implements Upload
{
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    async reconfig(config: Config) {
        this.config = config;
    }

    async upload(filePath: string): Promise<string | null> {
        try {
            const form = new formData();
            form.append('file_id', 0);
            form.append('smfile', fs.createReadStream(filePath));
            let rsp = await got.post('https://sm.ms/api/v2/upload?inajax=1', {
                body: form
            });
            
            let body = JSON.parse(rsp.body);
            return body.images || body.data.url;
        }
        catch(e) {
            vscode.window.showInformationMessage(`Upload File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Imgur;