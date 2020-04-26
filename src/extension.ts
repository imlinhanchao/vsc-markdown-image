'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import tools from './lib/tool';
import Local from './lib/local';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "markdown-image" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let pasteCommand = vscode.commands.registerCommand('markdown-image.paste', async () => {
        let stop = () => {};
        let config = tools.getConfig();
        let index = 0;
        try {
            stop = tools.showProgress('Uploading...');
            
            let editor = vscode.window.activeTextEditor;
            let selections = tools.getSelections();
            let savePath = tools.getTmpFolder();
            savePath = path.join(savePath, `pic_${new Date().getTime()}.png`);
            let images = await tools.getPasteImage(savePath);
            images = images.filter(img => ['.jpg', 'jpeg', '.gif', '.bmp', '.png'].find(ext => img.endsWith(ext)));

            let upload;
            switch(config.saveLocation) {
                case 'local': upload = new Local(config); break;
            }

            let urls = [];
            for (let i = 0; i < images.length; i++) {
                if (images[i] !== savePath) { 
                    let p = await upload?.upload(images[i]);
                    if(p) { urls.push(p); }
                    continue;
                }
                let name = path.basename(await tools.prompt('Name the picture you pasted', path.basename(savePath, '.png')));
                if (name) {
                    name = path.basename(name, path.extname(name)) + '.png';
                    images[i] = path.join(path.dirname(savePath), name);
                    fs.renameSync(savePath, images[i]);
                }
                let p = await upload?.upload(images[i]);
                if(p) { urls.push(p); }
            }

            let insertCode = '';
            for (let i = 0; i < urls.length; i++) {
                let selection = selections?.[i] && editor?.document.getText(selections[i]) ? 
                editor.document.getText(selections[i]) : `图${index++}`;
                let text = `![${selection}](${urls[i].replace('http:', 'https:')})`;
                if (selections?.[i]) { 
                    editor?.edit(editBuilder => {
                        if(selections) {
                            editBuilder.replace(selections[i], text);
                        }
                    });
                }
                else {
                    insertCode += text + '\n';
                }
            }

            if (insertCode) {
                editor?.edit(editBuilder => {
                    if(editor?.selection.active) {
                        editBuilder.insert(editor?.selection.active, insertCode.trim());
                    }
                });
            }

        } catch (error) {
            vscode.window.showErrorMessage(`Something was wrong: ${error.message}`);
        }

        stop();
    });

    context.subscriptions.push(pasteCommand);

    let configCommand = vscode.commands.registerCommand('markdown-image.config', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'markdown-image' );
    });

    context.subscriptions.push(configCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
