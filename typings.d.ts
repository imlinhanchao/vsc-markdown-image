declare module "*.json" {
    const value: any;
    export default value;
}

declare type Config = {
    [key: string]: any;
} 

declare module 'coding-picbed' {
    const Coding: any;
}

declare module 'github-picbed';

declare module 'turndown-plugin-gfm' {
    export function gfm(turndownService: any) : void;
    export function highlightedCodeBlock(turndownService: any) : void;
    export function strikethrough(turndownService: any) : void;
    export function tables(turndownService: any) : void;
    export function taskListItems(turndownService: any) : void;
}
