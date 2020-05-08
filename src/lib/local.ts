import utils from './utils';
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
            if (!utils.getCurrentRoot()) {
                vscode.window.showInformationMessage($l['open_with_folder']);
                return null;
            }

            let saveFolder = this.config.local.path.startsWith('/') ? 
                path.join(utils.getCurrentRoot(), this.config.local.path) :
                path.join(path.dirname(utils.getCurrentFilePath()), this.config.local.path);
            
            console.log(`Create Project Upload Folder.`);
            
            savePath = path.join(saveFolder, savePath);
            saveFolder = path.dirname(savePath);

            if (!fs.existsSync(saveFolder)) {
                utils.mkdirs(saveFolder);
            }

            if (fs.existsSync(savePath) && 
            (await utils.confirm($l['replace_or_no'], [$l['Yes'], $l['Yes']])) === $l['Yes']) {
                return null;
            }
            fs.copyFileSync(filePath, savePath);

            return path.relative(path.dirname(utils.getCurrentFilePath()), savePath).replace(/\\/g, '/');
        }
        catch(e) {
            vscode.window.showInformationMessage(`${$l['save_failed']}${e.message}`);
            return null;
        }
    }
}

export default Local;