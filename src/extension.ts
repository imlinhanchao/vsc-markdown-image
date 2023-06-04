'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import utils from './lib/utils';
import { locale as $l } from './lib/utils';
import { imageSize } from 'image-size';

function getUploadInstance(config: any) {
    let uploads: Upload[] = [];

    // Get All Upload Methods
    let uploadMethods = config.base.uploadMethods || [];
    uploadMethods.push(config.base.uploadMethod);
    uploadMethods = Array.from(new Set(uploadMethods));

    // Load All Upload Method Instance
    for (const t of uploadMethods) {
        const upload = utils.getUpload(t, config)
        if (upload) uploads.push(upload);
    }

    return uploads;
}

export function activate(context: vscode.ExtensionContext) {
    console.info('Congratulations, your extension "markdown-image" is now active!');
    let config = utils.getConfig();
    let uploads: Upload[] = getUploadInstance(config);

    let pasteCommand = vscode.commands.registerCommand('markdown-image.paste', async () => {
        let stop = () => {};
        try {
            stop = utils.showProgress($l['uploading']);

            let editor = vscode.window.activeTextEditor;
            let selections = utils.getSelections();
            let savePath = utils.getTmpFolder();
            savePath = path.resolve(savePath, `pic_${new Date().getTime()}.png`);
            let images = await utils.getPasteImage(savePath);
            images = images.filter(img => ['.jpg', '.jpeg', '.gif', '.bmp', '.png', '.webp', '.svg'].find(ext => img.endsWith(ext)));
            if (config.base.fileFormat == 'jpg' && images.length === 1 && images[0] == savePath) {
                images[0] = await utils.convertImage(images[0])
            }

            console.debug(`Get ${images.length} Images`);

            let urls = [], maxWidth = [];
            for (let i = 0; i < images.length; i++) {
                let width = imageSize(images[i]).width || 0;
                maxWidth.push(config.base.imageWidth < width ? config.base.imageWidth : 0);
                let name = config.base.fileNameFormat ? await utils.formatName(config.base.fileNameFormat, images[i], savePath === images[i]) + (images[i] ? path.extname(images[i]) : '.png') : images[i];
                console.debug(`Uploading ${images[i]} to ${name}.`);

                let p;
                for (let j = 0; j < uploads.length; j++) {
                    let upload = uploads[j];
                    const result = await upload.upload(images[i], name);
                    if (j == 0) p = result;
                }
                if(p) { urls.push(p); }
            }

            let insertCode = '', insertTag = '';
            for (let i = 0; i < urls.length; i++) {
                let selection = utils.getAlt(context);
                if (selections?.length === 1 && editor?.document.getText(selections[0])) {
                    selection = `${editor?.document.getText(selections[0])} ${i + 1}`;
                }
                else if(selections?.[i] && editor?.document.getText(selections[i]))
                {
                    selection = selections?.[i] && editor?.document.getText(selections[i]);
                }

                if (config.base.uploadMethod !== 'Data URL') {
                    if(config.base.urlEncode) { urls[i] = encodeURIComponent(urls[i].toString()).replace(/%5C/g, '\\').replace(/%2F/g, '/').replace(/%3A/g, ':').replace(/%40/g, '@'); }
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
                } else if (pos) {
                    await utils.editorEdit(pos, insertCode);
                } else {
                    vscode.env.clipboard.writeText(insertCode);
                    setTimeout(() => {
                        vscode.commands.executeCommand("editor.action.clipboardPasteAction");
                    }, 100);
                }
            }

            utils.noticeComment(context);
        } catch (error) {
            let e = error as Error;
            vscode.window.showErrorMessage(`${$l['something_wrong']}${e.message in $l ? (<any>$l)[e.message] : e.message}\n${e.toString()}`);
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
        } catch (error) {
            let e = error as Error;
            vscode.window.showErrorMessage(`${$l['something_wrong']}${e.message}\n${e.toString()}`);
        }

        stop();
    });

    context.subscriptions.push(richTextCommand);

    vscode.workspace.onDidChangeConfiguration(function(event) {
        config = utils.getConfig();
        uploads = getUploadInstance(config);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}
