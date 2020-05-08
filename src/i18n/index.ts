import * as vscode from 'vscode';

export default () => {
    let locale = require('./locale.json');
    let lang = vscode.env.language;
    let langLocale = null;

    try {
        langLocale = require(`./locale.${lang}.json`);
    } catch (error) { 
        lang = lang.split('.')[0];
    }
    
    try {
        langLocale = require(`./locale.${lang}.json`);
    } catch (error) { }
    
    if (langLocale) { locale = Object.assign(locale, langLocale); }

    return locale;
};