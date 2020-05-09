import * as vscode from 'vscode';
import * as i18n from './locale'; 

export default () => {
    let locale = i18n.default;
    let lang = vscode.env.language;
    let langLocale: any = null;

    try {
        langLocale = i18n.$[lang];
    } catch (error) { 
        lang = lang.split('-')[0];
    }
    
    try {
        langLocale = i18n.$[lang];
    } catch (error) { }
    
    if (langLocale) { locale = Object.assign(locale, langLocale); }

    return locale;
};