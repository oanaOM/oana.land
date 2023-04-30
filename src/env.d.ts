/*
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
*/


declare global {
    interface Window {
        document: Document;
        onload: () => void;
    }
}


export {};