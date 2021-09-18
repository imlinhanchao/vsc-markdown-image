'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import utils from './lib/utils';
import { locale as $l } from './lib/utils';
import { imageSize } from 'image-size';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let index = 1;
    // Use the console to output diagnostic information (console.debug) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.info('Congratulations, your extension "markdown-image" is now active!');
    let config = utils.getConfig();
    let upload : Upload | null = utils.getUpload(config);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let pasteCommand = vscode.commands.registerCommand('markdown-image.paste', async () => {
        let stop = () => {};
        try {
            stop = utils.showProgress($l['uploading']);
            
            let editor = vscode.window.activeTextEditor;
            let selections = utils.getSelections();
            let savePath = utils.getTmpFolder();
            savePath = path.join(savePath, `pic_${new Date().getTime()}.png`);
            let images = await utils.getPasteImage(savePath);
            images = images.filter(img => ['.jpg', '.jpeg', '.gif', '.bmp', '.png', '.webp', '.svg'].find(ext => img.endsWith(ext)));

            console.debug(`Get ${images.length} Images`);

            let urls = [], maxWidth = [];
            for (let i = 0; i < images.length; i++) {
                let width = imageSize(images[i]).width || 0;
                maxWidth.push(config.base.imageWidth < width ? config.base.imageWidth : 0);
                let name = config.base.fileNameFormat ? await utils.formatName(config.base.fileNameFormat, images[i], savePath === images[i]) + (images[i] ? path.extname(images[i]) : '.png') : images[i];
                console.debug(`Uploading ${images[i]} to ${name}.`);
                let p = await upload?.upload(images[i], name);
                if(p) { urls.push(p); }
            }

            let insertCode = '', insertTag = '';
            for (let i = 0; i < urls.length; i++) {
                let selection = `${$l['picture']} ${index++}`;
                if (selections?.length === 1 && editor?.document.getText(selections[0])) {
                    selection = `${editor?.document.getText(selections[0])} ${i + 1}`;
                }
                else if(selections?.[i] && editor?.document.getText(selections[i]))
                {
                    selection = selections?.[i] && editor?.document.getText(selections[i]);
                }
                
                if (config.base.uploadMethod !== 'Data URL') { 
                    if(config.base.urlEncode) { urls[i] = encodeURIComponent(urls[i].toString()).replace(/%5C/g, '\\').replace(/%2F/g, '/').replace(/%3A/g, ':'); }
                    let text = utils.formatCode(urls[i], selection, maxWidth[i], config.base.codeType);
                    if (selections?.[i] && selections?.length > 1) {
                        await utils.editorEdit(selections[i], text);
                    }
                    else {
                        insertCode += text;
                    }
                }
                else
                {
                    let tag = new Date().getTime().toString();
                    let text = utils.formatCode(tag, selection, maxWidth[i], 'Markdown');
                    tag = `\n[${tag}]: ${urls[i]}`;
                    if (selections?.[i] && selections?.length > 1) {
                        await utils.insertToEnd(tag);
                        await utils.editorEdit(selections[i], text);
                    }
                    else {
                        insertCode += text;
                        insertTag += tag;
                    }
                }
            }

            if (insertCode) {
                let pos = editor?.selection.active;
                if (config.base.uploadMethod === 'Data URL') { 
                    await utils.insertToEnd(insertTag);
                }
                await utils.editorEdit(pos, insertCode);
            }

            utils.noticeComment(context);
        } catch (error :any) {
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

    let richTextCommand = vscode.commands.registerCommand('markdown-image.paste-rich-text', async () => {
        let stop = () => {};
        try {
            let editor = vscode.window.activeTextEditor;
            let text = await utils.getRichText();

            if(text) { 
                utils.editorEdit(editor?.selection, utils.html2Markdown(text));
            }
        } catch (error:any) {
            console.dir(error);
            vscode.window.showErrorMessage(`${$l['something_wrong']}${error.message}\n${error.toString()}`);
        }

        stop(); 
    });

    context.subscriptions.push(richTextCommand);

    vscode.workspace.onDidChangeConfiguration(function(event) {
        config = utils.getConfig();
        upload = utils.getUpload(config);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}
