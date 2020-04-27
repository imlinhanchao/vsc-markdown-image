interface Upload
{
    config: Config;
    upload(filePath: string): Promise<string|null>;
    reconfig(config: Config): Promise<void>;
}