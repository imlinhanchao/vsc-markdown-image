import * as vscode from 'vscode';
import { locale as $l } from './utils';
import { BlobServiceClient } from "@azure/storage-blob";

class Azure implements Upload
{
    config: Config;
    lastTimestamp: number;
    constructor(config: Config) {
        this.config = config;
        this.lastTimestamp = 0;
    }

    async reconfig(config: Config) {
        this.config = config;
        this.lastTimestamp = 0;
    }

    async upload(filePath: string, savePath: string): Promise<string | null> {
        try {
            const blobServiceClient = BlobServiceClient.fromConnectionString(
                this.config.azure.connectionString
            );

            const containerClient = blobServiceClient.getContainerClient(this.config.azure.container);
            const blockBlobClient = containerClient.getBlockBlobClient(savePath);
            await blockBlobClient.uploadFile(filePath);

            return blockBlobClient.url;
        }
        catch(error) {
            let e = error as Error;
            vscode.window.showInformationMessage(`${$l['upload_failed']}${e.message}`);
            return null;
        }
    }
}

export default Azure;