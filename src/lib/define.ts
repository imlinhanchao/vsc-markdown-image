import * as vscode from 'vscode';
import utils from './utils';

class Define implements Upload
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
            let define = require(this.config.diy.path);
            return await define(filePath, utils.getCurrentFilePath());
        }
        catch(e) {
            vscode.window.showInformationMessage(`Upload File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Define;