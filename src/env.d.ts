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

interface ImportMetaEnv {
  readonly XATA_API_KEY: string;
  readonly XATA_BRANCH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
