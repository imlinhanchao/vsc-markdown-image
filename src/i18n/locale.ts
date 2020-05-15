import zh_cn from './locale.zh-cn';
import zh_tw from './locale.zh-tw';

export default {
    config_failed: "Config Failed: ",
    upload_failed: "Upload File Failed: ",
    save_failed: "Save File Failed: ",
    something_wrong: "Something was wrong: ",
    open_with_folder: "Please Open the project of the file with folder.",
    replace_or_no: "The file was exists. Would you replace it?",
    Yes: "Yes",
    No: "No",
    'qiniu.east': "East China",
    'qiniu.north': "North China",
    'qiniu.south': "South China",
    'qiniu.na': "North America",
    'qiniu.sa': "Southeast Asia",
    named_paste: "Name the picture you pasted (don't include extname, it's will be replace the ${filename} in the format).",
    uploading: "Uploading...",
    picture: "picture",
    install_xclip: "You need to install xclip command first.",
    powershell_not_found: "The powershell command is not in you PATH environment variables. Please add it and retry.",
    "like.extension": "Do you like this extension? Hope to get your kindly favorable comments.",
    "like.ok": "Yes",
    "like.no": "No",
    "like.later": "Remind later",
};

let $: any = { 'zh-cn': zh_cn, 'zh-tw': zh_tw };
export { $ };