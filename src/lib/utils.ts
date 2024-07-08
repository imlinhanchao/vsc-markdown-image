import * as vscode from 'vscode';
import { spawn, exec } from 'child_process';
import { tmpdir } from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as packages from '../../package.json';
import * as crypto from 'crypto';
import Uploads from './uploads';
import i18n from '../i18n/index';
import * as TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import * as pngToJpeg from 'png-to-jpeg';

let pkg = packages as any;
let locale = i18n();

function getUpload (uploadMethod: string, config: any): Upload | null {
    switch (uploadMethod) {
        case 'Local': return new Uploads.Local(config);
        case 'Coding': return new Uploads.Coding(config);
        case 'GitHub': return new Uploads.GitHub(config);
        case 'Imgur': return new Uploads.Imgur(config);
        case 'SM.MS': return new Uploads.SM_MS(config);
        case 'Data URL': return new Uploads.DataUrl(config);
        case 'Qiniu': return new Uploads.Qiniu(config);
        case 'DIY': return new Uploads.Define(config);
        case '本地': return new Uploads.Local(config);
        case '七牛': return new Uploads.Qiniu(config);
        case 'Upyun': return new Uploads.Upyun(config);
        case '又拍云': return new Uploads.Upyun(config);
        case '又拍雲': return new Uploads.Upyun(config);
        case '自定义': return new Uploads.Define(config);
        case '自定義': return new Uploads.Define(config);
        case 'Cloudinary': return new Uploads.Cloudinary(config);
        case 'Cloudflare': return new Uploads.Cloudflare(config);
        case 'S3': return new Uploads.S3(config);
        case 'SFTP': return new Uploads.Sftp(config);
        case 'Azure Storage': return new Uploads.Azure(config);
    }
    return null;
}

function showProgress (message: string) {
    let show = true;
    function stopProgress () {
        show = false;
    }

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: message,
        cancellable: false
    }, (progress, token) => {
        return new Promise(resolve => {
            let timer = setInterval(() => {
                if (show) { return; }
                clearInterval(timer);
                resolve(show);
            }, 100);
        });
    });

    return stopProgress;
}

function editorEdit (selection: vscode.Selection | vscode.Position | undefined | null, text: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        vscode.window.activeTextEditor?.edit(editBuilder => {
            if (selection) {
                editBuilder.replace(selection, text);
            }
        }).then(resolve);
    });
}

function insertToEnd (text: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let linenumber = vscode.window.activeTextEditor?.document.lineCount || 1;
        let pos = vscode.window.activeTextEditor?.document.lineAt(linenumber - 1).range.end || new vscode.Position(0, 0);
        vscode.window.activeTextEditor?.edit(editBuilder => {
            editBuilder.insert(pos, text);
        }).then(resolve);
    });
}

function getSelections (): vscode.Selection[] | null {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No open text editor
    }

    let selections = editor.selections;
    return selections;
}

function formatCode (filePath: string, selection: string, maxWidth: number, codeType: string): string {
    if (codeType === "Markdown") {
        return `![${selection}](${filePath}${maxWidth > 0 ? ` =${maxWidth}x` : ''})  \n`;
    }

    return `<img alt="${selection}" src="${filePath}" ${maxWidth > 0 ? `width="${maxWidth}" ` : ''}/>  \n`;
}

async function variableGetter (variable: string,
    { filePath, isPaste, match, context, saveName }:
        {
            filePath: string,
            isPaste: boolean,
            match?: string,
            context?: vscode.ExtensionContext,
            saveName?: string;
        }): Promise<string> {
    switch (variable) {
        case 'filename': {
            return !isPaste ? path.basename(filePath, path.extname(filePath)) :
                (path.basename((await prompt(locale['named_paste'], path.basename(filePath, '.png'))) || '') || '');
        }
        case 'mdname': {
            return path.basename(getCurrentFilePath(), path.extname(getCurrentFilePath()));
        }
        case 'path': {
            return path.dirname(getCurrentFilePath()).replace(getCurrentRoot(), '').slice(1).replace(/\\/g, '/');
        }
        case 'hash': {
            return hash(fs.readFileSync(filePath));
        }
        case 'timestramp': // spell mistake
        case 'timestamp': {
            return new Date().getTime().toString();
        }
        case 'YY': {
            return new Date().getFullYear().toString();
        }
        case 'MM': {
            return (new Date().getMonth() + 1).toString().padStart(2, '0');
        }
        case 'DD': {
            return (new Date().getDate()).toString().padStart(2, '0');
        }
        case 'hh': {
            let hours = new Date().getHours();
            return (hours > 12 ? hours - 12 : hours).toString().padStart(2, '0');
        }
        case 'HH': {
            return new Date().getHours().toString().padStart(2, '0');
        }
        case 'mm': {
            return new Date().getMinutes().toString().padStart(2, '0');
        }
        case 'ss': {
            return new Date().getSeconds().toString().padStart(2, '0');
        }
        case 'mss': {
            return new Date().getMilliseconds().toString().padStart(3, '0');
        }
        case 'rand,(\\d+)': {
            let numberMat = match!.match(/\d+/);
            if (!numberMat) { return ''; }
            let n = parseInt(numberMat[0]);
            return parseInt((Math.random() * n).toString()).toString();
        }
        case 'prompt': {
            let promptInput = await vscode.window.showInputBox({ prompt: `${locale['prompt_name_component']}${saveName || ''}` });
            // make sure that promptInput is a filename-safe string
            promptInput = promptInput?.replace(/[:*?<>|]/g, '').trim();
            if (promptInput)
                return promptInput;
            else
                throw Error(locale['user_did_not_answer_prompt']);
        }
        case 'index': {
            const fsPath = getCurrentFilePath();
            let lastIndex = parseInt(context!.globalState.get(fsPath) || '0')
            context!.globalState.update(fsPath, `${lastIndex + 1}`);
            return lastIndex.toString();
        }
    }
    return '';
}

async function formatName (format: string, filePath: string, isPaste: boolean): Promise<string> {
    let saveName = format;
    let variables = [
        'filename', 'mdname', 'path', 'hash', 'timestramp', 'timestamp', 'YY', 'MM', 'DD', 'HH', 'hh', 'mm', 'ss', 'mss', 'rand,(\\d+)', 'prompt'
    ];
    for (let i = 0; i < variables.length; i++) {
        let reg = new RegExp(`\\$\\{${variables[i]}\\}`, 'g');
        let mat = format.match(reg);
        if (!mat) { continue; }
        if (variables[i] === 'rand,(\\d+)') {
            for (let j = 0; j < mat.length; j++) {
                const data = await variableGetter(variables[i], { filePath, isPaste, match: mat[j] });
                if (!data) continue;
                saveName = saveName.replaceAll(mat[j], data);
            }
        } else {
            const data = await variableGetter(variables[i], { filePath, isPaste, saveName });
            if (!data) continue;
            saveName = saveName.replaceAll(mat[0], data);
        }
    }

    return saveName;
}

async function getAlt (format: string, filePath: string, context: vscode.ExtensionContext) {
    let alt = format;
    let variables = [
        'filename', 'mdname', 'path', 'hash', 'timestamp', 'YY', 'MM', 'DD', 'HH', 'hh', 'mm', 'ss', 'mss', 'rand,(\\d+)', 'index'
    ];

    for (let i = 0; i < variables.length; i++) {
        let reg = new RegExp(`\\$\\{${variables[i]}\\}`, 'g');
        let mat = format.match(reg);
        if (!mat) { continue; }
        if (variables[i] === 'rand,(\\d+)') {
            for (let j = 0; j < mat.length; j++) {
                const data = await variableGetter(variables[i], { filePath, isPaste: false, match: mat[j] });
                if (!data) continue;
                alt = alt.replaceAll(mat[j], data);
            }
        } else {
            const data = await variableGetter(variables[i], { filePath, isPaste: false, context });
            if (!data) continue;
            alt = alt.replaceAll(mat[0], data);
        }
    }
    return alt;
}

function mkdirs (dirname: string) {
    //console.debug(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function html2Markdown (data: string): string {
    let turndownService = new TurndownService({ codeBlockStyle: 'fenced', headingStyle: 'atx', });
    turndownService.use(gfm);
    return turndownService.turndown(data);
}

function getConfig () {
    const configurations: { properties: object, title: string }[] = pkg.contributes.configuration;
    const keys: string[] = configurations.reduce((acc, config) => acc.concat(Object.keys(config.properties)), [] as string[])

    let values: Config = {};
    function toVal (str: string, val: string | undefined, cfg: Config): string | Config {
        let keys = str.split('.');
        if (keys.length === 1) {
            cfg[keys[0]] = val;
        } else {
            cfg[keys[0]] = toVal(keys.slice(1).join('.'), val, cfg[keys[0]] || {});
        }
        return cfg;
    }
    keys.forEach(k => toVal(k.split('.').slice(1).join('.'), vscode.workspace.getConfiguration().get(k), values));
    return values;
}

function getPasteImage (imagePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        if (!imagePath) { return; }

        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = path.join(__dirname, '..', '..', 'asserts/pc.ps1');

            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = fs.existsSync(command);
            let output = '';
            if (!powershellExisted) {
                command = "powershell";
            }

            const powershell = spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
                imagePath
            ]);
            // the powershell can't auto exit in windows 7 .
            let timer = setTimeout(() => powershell.kill(), 2000);

            powershell.on('error', (e: any) => {
                if (e.code === 'ENOENT') {
                    vscode.window.showErrorMessage(locale['powershell_not_found']);
                } else {
                    vscode.window.showErrorMessage(e);
                }
            });

            powershell.on('exit', function (code, signal) {
                // console.debug('exit', code, signal);
            });
            powershell.stdout.on('data', (data) => {
                data.toString().split('\n').forEach(d => output += (d.indexOf('Active code page:') < 0 ? d + '\n' : ''));
                clearTimeout(timer);
                timer = setTimeout(() => powershell.kill(), 2000);
            });
            powershell.on('close', (code) => {
                resolve(output.trim().split('\n').map(i => i.trim()));
            });
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = path.join(__dirname, '..', '..', 'asserts/mac.applescript');

            let ascript = spawn('osascript', [scriptPath, imagePath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.debug('exit', code, signal);
            });
            ascript.stdout.on('data', (data) => {
                resolve(data.toString().trim().split('\n'));
            });
        } else {
            // Linux

            let scriptPath = path.join(__dirname, '..', '..', 'asserts/linux.sh');

            let ascript = spawn('sh', [scriptPath, imagePath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.debug('exit',code,signal);
            });
            ascript.stdout.on('data', (data) => {
                let result = data.toString().trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage(locale['install_xclip']);
                    return;
                }
                let match = decodeURI(result).trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/g);
                resolve(match || []);
            });
        }
    });
}

function getRichText (): Promise<string> {
    return new Promise((resolve, reject) => {
        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = path.join(__dirname, '..', '..', 'asserts/rtf.ps1');

            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = fs.existsSync(command);
            let output = '';
            if (!powershellExisted) {
                command = "powershell";
            }

            const powershell = spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
            ]);
            // the powershell can't auto exit in windows 7 .
            let timer = setTimeout(() => powershell.kill(), 2000);
            let buffers: any = []; let size = 0;
            powershell.on('error', (e: any) => {
                if (e.code === 'ENOENT') {
                    vscode.window.showErrorMessage(locale['powershell_not_found']);
                } else {
                    vscode.window.showErrorMessage(e);
                }
            });

            powershell.on('exit', function (code, signal) {
                // console.debug('exit', code, signal);
            });
            powershell.stdout.on('data', (data) => {
                buffers.push(data);
                size += data.length;
                clearTimeout(timer);
                timer = setTimeout(() => powershell.kill(), 2000);
            });
            powershell.on('close', (code) => {
                Buffer.concat(buffers, size).toString()
                    .split('\n').forEach(d => output += (d.indexOf('Active code page:') < 0 ? d : ''));
                resolve(output.replace('</html>', '').replace('</body>', '').split('<body>').slice(-1)[0].trim());
            });
        }
        else if (platform === 'darwin') {
            // Mac
            vscode.window.showInformationMessage('Not support in macos yet.');
            resolve('');
        } else {
            // Linux

            let scriptPath = path.join(__dirname, '..', '..', 'asserts/rtf.sh');
            let result = '';
            let ascript = spawn('sh', [scriptPath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                if (result === "no xclip") {
                    vscode.window.showInformationMessage(locale['install_xclip']);
                    return;
                }
                resolve(result);
            });
            ascript.stdout.on('data', (data) => {
                result += data.toString().trim();
            });
        }
    });
}

function getCurrentRoot (): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) { return ''; }
    const resource = editor.document.uri;
    if (resource.scheme == 'vscode-notebook-cell') {
        let filePath = resource.fsPath;
        let root = vscode.workspace.workspaceFolders.find(f => filePath.indexOf(f.uri.fsPath) >= 0);
        if (root) return root.uri.fsPath;
        else return '';
    }
    if (resource.scheme !== 'file' && resource.scheme !== 'vscode-remote') { return ''; }
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    if (!folder) { return ''; }
    return folder.uri.fsPath;
}

function getCurrentFilePath (): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) { return ''; }
    return editor.document.uri.fsPath;
}

function getTmpFolder () {
    let savePath = path.join(tmpdir(), pkg.name);
    if (!fs.existsSync(savePath)) { fs.mkdirSync(savePath); }
    return savePath;
}

function convertImage (imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        pngToJpeg({ quality: 90 })(fs.readFileSync(imagePath)).then((output: Buffer) => {
            const newImage = path.join(path.dirname(imagePath), path.basename(imagePath, path.extname(imagePath)) + '.jpg');
            fs.writeFileSync(newImage, output);
            resolve(newImage);
            fs.unlinkSync(imagePath);
        })
    });
}

function sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function confirm (message: string, options: string[]): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        return vscode.window.showInformationMessage(message, ...options).then(resolve);
    });
}

function prompt (message: string, defaultVal: string = ''): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        return vscode.window.showInputBox({
            value: defaultVal,
            prompt: message
        }).then(resolve);
    });
}

function hash (buffer: Buffer): string {
    let sha256 = crypto.createHash('sha256');
    let hash = sha256.update(buffer).digest('hex');
    return hash;
}

function getOpenCmd (): string {
    let cmd = 'start';
    if (process.platform === 'win32') {
        cmd = 'start';
    } else if (process.platform === 'linux') {
        cmd = 'xdg-open';
    } else if (process.platform === 'darwin') {
        cmd = 'open';
    }
    return cmd;
}

function noticeComment (context: vscode.ExtensionContext) {
    let notice = context.globalState.get('notice');
    let usetimes: number = context.globalState.get('usetimes') || 0;
    if (!notice && usetimes > 100) {
        confirm(locale['like.extension'], [locale['like.ok'], locale['like.no'], locale['like.later']])
            .then((option) => {
                switch (option) {
                    case locale['like.ok']:
                        exec(`${getOpenCmd()} https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image`);
                        context.globalState.update('notice', true);
                        break;
                    case locale['like.no']:
                        context.globalState.update('notice', true);
                        break;
                    case locale['like.later']:
                        usetimes = 50;
                        context.globalState.update('usetimes', usetimes);
                        context.globalState.update('notice', false);
                        break;
                }
            })
            .catch(e => console.debug(e));
    } else if (!notice) {
        context.globalState.update('usetimes', ++usetimes);
    }
}

export default {
    getUpload,
    showProgress,
    editorEdit,
    insertToEnd,
    formatCode,
    formatName,
    getAlt,
    mkdirs,
    html2Markdown,
    getConfig,
    getSelections,
    getPasteImage,
    getRichText,
    getCurrentRoot,
    getCurrentFilePath,
    getTmpFolder,
    convertImage,
    noticeComment,
    sleep,
    confirm,
    prompt,
    hash,
};
export { locale };