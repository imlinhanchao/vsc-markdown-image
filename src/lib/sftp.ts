import utils from './utils';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { locale as $l } from './utils';
import * as SFTP from 'ssh2-sftp-client';

class Sftp implements Upload {
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    async reconfig (config: Config) {
        this.config = config;
    }

    async upload (filePath: string, savePath: string): Promise<string | null> {
        try {
            if (!utils.getCurrentRoot()) {
                vscode.window.showInformationMessage($l['open_with_folder']);
                return null;
            }

            if (!this.config.sftp.host) {
                vscode.window.showInformationMessage($l['sftp_not_host']);
                return null;
            }

            if (!this.config.sftp.port) {
                vscode.window.showInformationMessage($l['sftp_not_port']);
                return null;
            }

            if (!this.config.sftp.username) {
                vscode.window.showInformationMessage($l['sftp_not_username']);
                return null;
            }

            const sftpConfig: SFTP.ConnectOptions = {
                host: this.config.sftp.host,
                port: this.config.sftp.port,
                username: this.config.sftp.username,
            };

            if (this.config.sftp.password) {
                sftpConfig.password = this.config.sftp.password;
            } else if (fs.existsSync(this.config.sftp.privateKeyPath)) {
                sftpConfig.privateKey = fs.readFileSync(this.config.sftp.privateKeyPath).toString();
            } else {
                vscode.window.showInformationMessage($l['sftp_not_password']);
                return null;
            }

            const sftp = new SFTP();

            try {
                await sftp.connect(sftpConfig)
            } catch (error) {
                let e = error as Error;
                vscode.window.showErrorMessage(`${$l['sftp_connect_failed']}${e.message}`);
                return null;
            }

            let saveFolder = this.config.sftp.path.startsWith('/') ?
                path.join(utils.getCurrentRoot(), this.config.sftp.path) :
                path.join(path.dirname(utils.getCurrentFilePath()), this.config.sftp.path);

            savePath = path.join(saveFolder, savePath).replace(/\\/g, '/');
            saveFolder = path.dirname(savePath);

            if (!await sftp.exists(saveFolder)) {
                await sftp.mkdir(saveFolder);
            }

            if (await sftp.exists(savePath) &&
                (await utils.confirm($l['replace_or_no'], [$l['Yes'], $l['No']])) === $l['No']) {
                return savePath;
            }
            await sftp.put(fs.createReadStream(filePath), savePath);

            sftp.end();

            if (this.config.local.referencePath === '') {
                return path.relative(path.dirname(utils.getCurrentFilePath()), savePath).replace(/\\/g, '/');
            }

            return await utils.formatName(this.config.local.referencePath, savePath, false)
                .then(data => data + path.basename(savePath))
        }
        catch (error) {
            let e = error as Error;
            vscode.window.showInformationMessage(`${$l['save_failed']}${e.message}`);
            return null;
        }
    }
}

export default Sftp;