//@ts-ignore
import * as vscode from "vscode";
import { locale as $l } from "./utils";
import { v2 as cloudinary } from "cloudinary";

class Cloudinary implements Upload {
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    async getSavePath(filePath: string) {
        return filePath;
    }

    async reconfig(config: Config) {
        this.config = config;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            cloudinary.config({
                cloud_name: this.config.cloudinary.cloudName,
                api_key: this.config.cloudinary.apiKey,
                api_secret: this.config.cloudinary.apiSecret,
            });

            const result = await cloudinary.uploader.upload(filePath, {
                folder: this.config.cloudinary.folder,
                fetch_format: "auto",
                quality: "auto",
            });
            return result.secure_url;
        } catch (e) {
            vscode.window.showInformationMessage(
                `${$l["upload_failed"]}${e.message}`
            );
            return null;
        }
    }
}

export default Cloudinary;
