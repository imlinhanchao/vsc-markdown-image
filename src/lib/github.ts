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
            GitHub.github.lastconfig.branch !== config.github.branch ||
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
        } catch (error) {
            let e = error as Error;
            vscode.window.showErrorMessage(`${$l['config_failed']}${e.message}`);
        }
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            while (!GitHub.github.isInitialized()) { await utils.sleep(100); }  

            savePath = path.join(this.config.github.path, savePath).replace(/\\/g, '/').replace(/^\/|\/$/, '');
            let data = await GitHub.github.upload({ data: filePath, filename: savePath });
            let options = GitHub.github.options;

            return this.config.github.cdn
              .replace(/\${username}/g, options.username)
              .replace(/\${repository}/g, options.repository)
              .replace(/\${branch}/g, options.branch)
              .replace(/\${filepath}/g, data.filename)

        } catch (error) {
            let e = error as Error;
            vscode.window.showErrorMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default GitHub;