import * as vscode from 'vscode';
import { spawn } from 'child_process';
import { tmpdir } from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as packages from '../../package.json';
import * as crypto from 'crypto';
import Uploads from './uploads';
import i18n from '../i18n/index';

let pkg = packages as any;
let locale = i18n();

function getUpload(config: Config) : Upload | null {
    switch(config.base.uploadMethod) {
        case 'Local': return new Uploads.Local(config);
        case 'Coding': return new Uploads.Coding(config);
        case 'Imgur': return new Uploads.Imgur(config);
        case 'SM.MS': return new Uploads.SM_MS(config);
        case 'Qiniu': return new Uploads.Qiniu(config);
        case 'DIY': return new Uploads.Define(config);
        case '本地': return new Uploads.Local(config);
        case '七牛': return new Uploads.Qiniu(config);
        case '自定义': return new Uploads.Define(config);
        case '自定義': return new Uploads.Define(config);
    }
    return null;
}

function showProgress(message: string) {
    let show = true;
    function stopProgress() {
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
                resolve();
            }, 100);
        });
    });

    return stopProgress;
}

function editorEdit(selection: vscode.Selection | vscode.Position | undefined | null, text: string) :Promise<boolean> {
    return new Promise((resolve, reject) => {
        vscode.window.activeTextEditor?.edit(editBuilder => {
            if(selection) {
                editBuilder.replace(selection, text);
            }
        }).then(resolve);
    });
}

function getSelections() : vscode.Selection[] | null{
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No open text editor
    }

    let selections = editor.selections;
    return selections;
}

async function formatName(format: string, filePath: string, isPaste: boolean): Promise<string> {
    let saveName = format;
    let variables = [
        'filename', 'mdname', 'hash', 'timestramp', 'YY', 'MM', 'DD', 'HH', 'hh', 'mm', 'ss', 'mss', 'rand,(\\d+)'
    ];
    for (let i = 0; i < variables.length; i++) {
        let reg = new RegExp(`\\$\\{${variables[i]}\\}`, 'g');
        let mat = format.match(reg);
        if (!mat) { continue; }
        switch(variables[i]) {
            case 'filename': {
                let data = !isPaste ? path.basename(filePath, path.extname(filePath)) : 
                    (path.basename(await prompt(locale['named_paste'], path.basename(filePath, '.png'))) || '');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'mdname': {
                let data = path.basename(getCurrentFilePath(), '.md');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'hash': {
                let data = hash(fs.readFileSync(filePath));
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'timestramp': {
                let data = new Date().getTime().toString();
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'YY': {
                let data = new Date().getFullYear().toString();
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'MM': {
                let data = (new Date().getMonth() + 1).toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'DD': {
                let data = (new Date().getDate() + 1).toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'hh': {
                let hours = new Date().getHours();
                let data = (hours > 12 ? hours - 12 : hours).toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'HH': {
                let data = new Date().getHours().toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'mm': {
                let data = new Date().getMinutes().toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'ss': {
                let data = new Date().getSeconds().toString().padStart(2, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'mss': {
                let data = new Date().getMilliseconds().toString().padStart(3, '0');
                saveName = saveName.replace(reg, data);
                break;
            }
            case 'rand,(\\d+)': {
                let n = parseInt(mat[1]);
                let data = parseInt((Math.random() * n).toString()).toString();
                saveName = saveName.replace(reg, data);
                break;
            }
        }
    }

    
    return saveName + (filePath ? path.extname(filePath) : '.png');
}

function mkdirs(dirname: string) {  
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirs(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}

function getConfig() {
    let keys: string[] = Object.keys(pkg.contributes.configuration.properties);
    let values: Config = {};
    function toVal(str: string, val: string|undefined, cfg: Config) : string | Config {
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

function getPasteImage(imagePath: string) : Promise<string[]>{
    return new Promise((resolve, reject) => {
        if (!imagePath) { return; }
    
        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = path.join(__dirname, '..', '..' , 'asserts/pc.ps1');
    
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
                if (data.toString().indexOf('Active code page:') < 0) { output += data.toString(); }
            });
            powershell.on('close', (code) => {
                resolve(output.trim().split('\n').map(i => i.trim()));
            });
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = path.join(__dirname, '..', '..' , 'asserts/mac.applescript');
    
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
    
            let scriptPath = path.join(__dirname, '..', '..' , 'asserts/linux.sh');
    
            let ascript = spawn('sh', [scriptPath, imagePath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.log('exit',code,signal);
            });
            ascript.stdout.on('data', (data) => {
                let result = data.toString().trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage(locale['install_xclip']);
                    return;
                }
                let match = result.trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/g);
                resolve(match || []);
            });
        }
    });
}

function getCurrentRoot() : string {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) { return ''; }
    const resource = editor.document.uri;
    if (resource.scheme !== 'file') { return ''; }
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    if (!folder) { return ''; }
    return folder.uri.fsPath;
}

function getCurrentFilePath() : string {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) { return ''; }
    return editor.document.uri.fsPath;
}

function getTmpFolder() {
    let savePath = path.join(tmpdir(), pkg.name);
    if (!fs.existsSync(savePath)) { fs.mkdirSync(savePath); }
    return savePath;
}

function sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function confirm(message: string, options: string[]) : Promise<string> {
    return new Promise((resolve, reject) => {
        return vscode.window.showInformationMessage(message, ...options).then(resolve);
    });
}

function prompt(message: string, defaultVal: string = '') : Promise<string> {
    return new Promise((resolve, reject) => {
        return vscode.window.showInputBox({
            value: defaultVal,
            prompt: message
        }).then(resolve);
    });
}

function hash(buffer:Buffer): string {
    let sha256 = crypto.createHash('sha256');
    let hash = sha256.update(buffer).digest('hex');
    return hash;
}

export default {
    getUpload,
    showProgress,
    editorEdit,
    formatName,
    mkdirs,
    getConfig,
    getSelections,
    getPasteImage,
    getCurrentRoot,
    getCurrentFilePath,
    getTmpFolder,
    sleep,
    confirm,
    prompt,
    hash,
};
export { locale };