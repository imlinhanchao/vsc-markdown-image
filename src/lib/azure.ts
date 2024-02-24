import * as vscode from 'vscode';
import { locale as $l } from './utils';
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from '@azure/identity';

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
            const { authenticationMethod, connectionString, accountName, container } = this.config.azure;
            let authMethod = authenticationMethod;
            if (connectionString !== '' && accountName === '') {
                authMethod = 'connectionString';
            }
            else if (connectionString === '' && accountName !== '') {
                authMethod = 'Passwordless';
            }
            if (authMethod === 'connectionString' && connectionString === '') {
                vscode.window.showInformationMessage($l['connection_string_empty']);
                return null;
            }
            if (authMethod === 'Passwordless' && accountName === '') {
                vscode.window.showInformationMessage($l['account_name_empty']);
                return null;
            }

            let blobServiceClient: BlobServiceClient;
            if (authMethod === 'connectionString') {
                blobServiceClient = BlobServiceClient.fromConnectionString(
                    connectionString
                );
            } else {
                blobServiceClient = new BlobServiceClient(
                    `https://${accountName}.blob.core.windows.net`,
                    new DefaultAzureCredential()
                );
            }

            const containerClient = blobServiceClient.getContainerClient(container);
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