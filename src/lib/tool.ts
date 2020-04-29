import * as vscode from 'vscode';
import { spawn } from 'child_process';
import { tmpdir } from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as packages from '../../package.json';

let pkg = packages as any;

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

function getConfig() {
    let keys: string[] = Object.keys(pkg.contributes.configuration.properties);
    let values: Config = {};
    keys.forEach(k => values[k.split('.')[1]] = vscode.workspace.getConfiguration().get(k));
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
                    vscode.window.showErrorMessage(`The powershell command is not in you PATH environment variables. Please add it and retry.`);
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
            let scriptPath = path.join(__dirname, '../asserts/mac.applescript');
    
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
    
            let scriptPath = path.join(__dirname, '../asserts/linux.sh');
    
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
                    vscode.window.showInformationMessage('You need to install xclip command first.');
                    return;
                }
                let match = result.trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/);
                resolve(match?.slice(0, -2) || []);
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

export default {
    showProgress,
    editorEdit,
    getConfig,
    getSelections,
    getPasteImage,
    getCurrentRoot,
    getCurrentFilePath,
    getTmpFolder,
    sleep,
    confirm,
    prompt
};