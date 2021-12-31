import * as vscode from 'vscode';
import * as fs from 'fs';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import { locale as $l } from './utils';

const cloudflareUrl = (accountId: string) =>
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;

class Cloudflare implements Upload {
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
      const result = await this.doUpload(filePath, savePath);
      if (result.success) {
        return result.result.variants[0];
      }
      throw new Error(result.errors[0].message);
    } catch (error) {
      let e = error as Error;
      vscode.window.showInformationMessage(
        `${$l['upload_failed']}${e.message}\n${e.stack}`
      );
      return null;
    }
  }

  async doUpload(filePath: string, savePath: string): Promise<any> {
    const { accountId, apiToken } = this.config.cloudflare;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), {
      filepath: savePath,
    });
    const response = await fetch(cloudflareUrl(accountId), {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    });
    return response.json();
  }
}

export default Cloudflare;
