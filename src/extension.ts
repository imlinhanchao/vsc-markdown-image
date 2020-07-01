'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import utils from './lib/utils';
import { locale as $l } from './lib/utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let index = 1;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "markdown-image" is now active!');
    let config = utils.getConfig();
    let upload : Upload | null = utils.getUpload(config);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let pasteCommand = vscode.commands.registerCommand('markdown-image.paste', async () => {
        let stop = () => {};
        try {
            stop = utils.showProgress($l['uploading']);
            console.log(config.base.uploadMethod);
            
            let editor = vscode.window.activeTextEditor;
            let selections = utils.getSelections();
            let savePath = utils.getTmpFolder();
            savePath = path.join(savePath, `pic_${new Date().getTime()}.png`);
            let images = await utils.getPasteImage(savePath);
            images = images.filter(img => ['.jpg', '.jpeg', '.gif', '.bmp', '.png', '.webp'].find(ext => img.endsWith(ext)));

            console.log(`Get ${images.length} Images`);

            let urls = [];
            for (let i = 0; i < images.length; i++) {
                let name = await utils.formatName(config.base.fileNameFormat, images[i], savePath === images[i]) || images[i];
                console.log(`Uploading ${images[i]} to ${name}.`);
                let p = await upload?.upload(images[i], name);
                if(p) { urls.push(p); }
            }

            let insertCode = '';
            for (let i = 0; i < urls.length; i++) {
                let selection = `${$l['picture']} ${index++}`;
                if (selections?.length === 1 && editor?.document.getText(selections[0])) {
                    selection = `${editor?.document.getText(selections[0])} ${i + 1}`;
                }
                else if(selections?.[i] && editor?.document.getText(selections[i]))
                {
                    selection = selections?.[i] && editor?.document.getText(selections[i]);
                }
                
                let text = `![${selection}](${encodeURIComponent(urls[i]).replace(/%2F/g, '/')})  \n`;
                if (selections?.[i] && selections?.length > 1) {
                    await utils.editorEdit(selections[i], text);
                }
                else {
                    insertCode += text;
                }
            }

            if (insertCode) {
                await utils.editorEdit(editor?.selection.active, insertCode);
            }

            utils.noticeComment(context);
        } catch (error) {
            console.dir(error);
            vscode.window.showErrorMessage(`${$l['something_wrong']}${error.message}\n${error.toString()}`);
        }

        stop();
    });

    context.subscriptions.push(pasteCommand);

    let configCommand = vscode.commands.registerCommand('markdown-image.config', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'markdown-image' );
    });

    context.subscriptions.push(configCommand);

    vscode.workspace.onDidChangeConfiguration(function(event) {
        config = utils.getConfig();
        upload = utils.getUpload(config);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}
