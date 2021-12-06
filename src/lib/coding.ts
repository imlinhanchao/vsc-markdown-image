import utils from './utils';
import { locale as $l } from './utils';
import * as vscode from 'vscode';
import { Coding as CodingPicbed } from 'coding-picbed';

class Coding implements Upload
{
    config: Config;
    static coding: any;
    constructor(config: Config) {
        if (!Coding.coding) { Coding.coding = new CodingPicbed(); }
        if(!Coding.coding.lastconfig || 
            Coding.coding.lastconfig.token !== config.coding.token ||
            Coding.coding.lastconfig.repository !== config.coding.repository
        ) {
            this.reconfig(config);
        }
        this.config = config;
    }

    async reconfig(config: Config) {
        try {
            this.config = config;
            Coding.coding.lastconfig = config.coding;
            await Coding.coding.config({ token: config.coding.token, repository: config.coding.repository });
        } catch (error) {
            let e = error as Error;
            vscode.window.showErrorMessage(`${$l['config_failed']}${e.message}`);
        }
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            while (!Coding.coding.isInitialized()) { await utils.sleep(100); }  

            let saveFolder = this.config.coding.path;
            let data = await Coding.coding.upload(filePath, saveFolder.replace(/\\/g, '/'), savePath.replace(/\\/g, '/'));

            return data.urls[0].replace('http:', 'https:');
        }
        catch(e: any) {
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default Coding;