import utils from './utils';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';


class Local implements Upload
{
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    async getSavePath(filePath: string) {
        return utils.formatName(this.config.base.format, filePath);
    }

    async reconfig(config: Config) {
        this.config = config;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            if (!utils.getCurrentRoot()) {
                vscode.window.showInformationMessage('Please Open the project of the file with folder.');
                return null;
            }

            let saveFolder = this.config.local.path.startsWith('/') ? 
                path.join(utils.getCurrentRoot(), this.config.local.path) :
                path.join(path.dirname(utils.getCurrentFilePath()), this.config.local.path);

            if (!fs.existsSync(saveFolder)) {
                fs.mkdirSync(saveFolder);
            }

            console.log(`Create Project Upload Folder.`);

            let now = new Date();
            if (this.config.local.createFolderByDate) {
                saveFolder = path.join(saveFolder, 
                    `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${(now.getDate()).toString().padStart(2, '0')}`);
                if (!fs.existsSync(saveFolder)) {
                    fs.mkdirSync(saveFolder);
                }
            }

            savePath = path.join(saveFolder, savePath);
            if (fs.existsSync(savePath) && 
            (await utils.confirm('The file was exists. Would you replace it?', ['Yes', 'No'])) === 'No') {
                return null;
            }
            fs.copyFileSync(filePath, savePath);

            return path.relative(path.dirname(utils.getCurrentFilePath()), savePath).replace(/\\/, '/');
        }
        catch(e) {
            vscode.window.showInformationMessage(`Save File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Local;