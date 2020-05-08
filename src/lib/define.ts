import * as vscode from 'vscode';
import utils from './utils';
import { locale as $l } from './utils';

class Define implements Upload
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
            let define = require(this.config.DIY.path);
            return await define(filePath, savePath, utils.getCurrentFilePath());
        }
        catch(e) {
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default Define;