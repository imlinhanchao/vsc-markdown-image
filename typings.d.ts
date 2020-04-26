declare module "*.json" {
    const value: any;
    export default value;
}

declare type Config = {
    [key: string]: any;
} 