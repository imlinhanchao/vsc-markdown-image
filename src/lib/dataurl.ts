import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { locale as $l } from './utils';

class Local implements Upload
{
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    async reconfig(config: Config) {
        this.config = config;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            return 'data:image/' + path.extname(filePath).substr(1) + ';base64,' + Buffer.from(fs.readFileSync(filePath)).toString('base64');
        }
        catch(e) {
            vscode.window.showInformationMessage(`${$l['save_failed']}${e.message}`);
            return null;
        }
    }
}

export default Local;