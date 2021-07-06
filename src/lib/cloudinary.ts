import * as vscode from "vscode";
import utils, { locale as $l } from "./utils";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

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
      let result = await this.doUpload(filePath, savePath, {
        overwrite: false,
      });
      if (result.existing) {
        const replace = await utils.confirm($l["replace_or_no"], [
          $l["Yes"],
          $l["No"],
        ]);
        if (replace === $l["No"]) {
          return null;
        }
        // yes, so re-upload with overwrite: true
        result = await this.doUpload(filePath, savePath, { overwrite: true });
      }
      return result.secure_url;
    } catch (e) {
      vscode.window.showInformationMessage(
        `${$l["upload_failed"]}${e.message}`,
      );
      return null;
    }
  }

  async doUpload(
    filePath: string,
    savePath: string,
    config: { overwrite: boolean },
  ): Promise<UploadApiResponse> {
    cloudinary.config({
      cloud_name: this.config.cloudinary.cloudName,
      api_key: this.config.cloudinary.apiKey,
      api_secret: this.config.cloudinary.apiSecret,
    });
    return cloudinary.uploader.upload(filePath, {
      folder: this.config.cloudinary.folder,
      filename_override: savePath,
      use_filename: true,
      unique_filename: false,
      overwrite: config.overwrite,
      fetch_format: "auto",
      quality: "auto",
    });
  }
}

export default Cloudinary;
