// Source - https://stackoverflow.com/a/56659180
// Posted by Stephani Bishop, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-18, License - CC BY-SA 4.0

// Allows importing markdown files as text module
declare module '*.md' {
    const value: string; // markdown is just a string
    export default value;
}