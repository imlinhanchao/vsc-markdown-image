interface Upload
{
    config: Config;
    upload(filePath: string, savePath: string): Promise<string|null>;
    reconfig(config: Config): Promise<void>;
}