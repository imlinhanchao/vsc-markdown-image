import tools from './tool';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';


class Local implements Upload
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
            if (!tools.getCurrentRoot()) {
                vscode.window.showInformationMessage('Please Open the project of the file with folder.');
                return null;
            }

            let saveFolder = this.config.path.startsWith('/') ? 
                path.join(tools.getCurrentRoot(), this.config.path) :
                path.join(path.dirname(tools.getCurrentFilePath()), this.config.path);

            if (!fs.existsSync(saveFolder)) {
                fs.mkdirSync(saveFolder);
            }

            console.log(`Create Project Upload Folder.`);

            let now = new Date();
            if (this.config.createDirectoryByDate) {
                saveFolder = path.join(saveFolder, 
                    `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${(now.getDate()).toString().padStart(2, '0')}`);
                if (!fs.existsSync(saveFolder)) {
                    fs.mkdirSync(saveFolder);
                }
            }

            let savePath = path.join(saveFolder, path.basename(filePath));
            if (fs.existsSync(savePath) && 
            (await tools.confirm('The file was exists. Would you replace it?', ['Yes', 'No'])) === 'No') {
                return null;
            }
            fs.copyFileSync(filePath, savePath);

            return path.relative(path.dirname(tools.getCurrentFilePath()), savePath);
        }
        catch(e) {
            vscode.window.showInformationMessage(`Save File Failed: ${e.message}`);
            return null;
        }
    }
}

export default Local;