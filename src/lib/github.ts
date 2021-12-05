import utils from './utils';
import { locale as $l } from './utils';
import * as path from 'path';
import * as vscode from 'vscode';
import * as GitHubPic from 'github-picbed';

class GitHub implements Upload
{
    config: Config;
    static github: any;
    constructor(config: Config) {
        if (!GitHub.github) { GitHub.github = GitHubPic(config.github); }
        if(!GitHub.github.lastconfig || 
            GitHub.github.lastconfig.token !== config.github.token ||
            GitHub.github.lastconfig.repository !== config.github.repository
        ) {
            this.reconfig(config);
        }
        this.config = config;
    }

    async reconfig(config: Config) {
        try {
            this.config = config;
            GitHub.github.lastconfig = config.github;
            await GitHub.github.config(config.github);
        } catch (error: any) {
            vscode.window.showErrorMessage(`${$l['config_failed']}${error.message}`);
        }
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            while (!GitHub.github.isInitialized()) { await utils.sleep(100); }  

            savePath = path.join(this.config.github.path, savePath);
            let data = await GitHub.github.upload(filePath, null, savePath.replace(/\\/g, '/'));

            return data.url.replace('http:', 'https:');
        }
        catch(e: any) {
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default GitHub;