import tools from './tool';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Coding as CodingPicbed } from 'coding-picbed';

class Coding implements Upload
{
    config: Config;
    static coding: any;
    constructor(config: Config) {
        if (!Coding.coding) { Coding.coding = new CodingPicbed(); }
        if(!Coding.coding.config || 
            Coding.coding.config['coding.token'] !== config['coding.token'] ||
            Coding.coding.config['coding.repository'] !== config['coding.repository']
        ) {
            this.reconfig(config);
        }
        this.config = config;
    }

    async reconfig(config: Config) {
        this.config = config;
        Coding.coding.config = config;
        await Coding.coding.config({ token: config.token, repository: config.repository });
    }

    async upload(filePath: string): Promise<string | null> {
        try {
            while (!Coding.coding.isInitialized()) { await tools.sleep(100); }  

            let saveFolder = this.config.path;
            let now = new Date();
            if (this.config.createDirectoryByDate) {
                saveFolder = path.join(saveFolder, 
                    `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${(now.getDate()).toString().padStart(2, '0')}`);
                if (!fs.existsSync(saveFolder)) {
                    fs.mkdirSync(saveFolder);
                }
            }

            let data = await Coding.coding.upload(filePath, saveFolder);

            return data.urls[0];
        }
        catch(e) {
            vscode.window.showInformationMessage(`Upload File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Coding;