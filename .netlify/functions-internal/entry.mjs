import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_f7e28818.mjs';
import 'react';
import 'react-dom/server';
import './chunks/astro_5dbeb235.mjs';
import './chunks/pages/image-endpoint_e6c45218.mjs';

const _page0  = () => import('./chunks/image-endpoint_61cf93cf.mjs');
const _page1  = () => import('./chunks/index_84d7c0c9.mjs');
const _page2  = () => import('./chunks/index_c96b8c97.mjs');
const _page3  = () => import('./chunks/rss_37d1e0bc.mjs');
const _page4  = () => import('./chunks/index_ab0f4368.mjs');
const _page5  = () => import('./chunks/README_46fa51ce.mjs');
const _page6  = () => import('./chunks/add_ba4424b8.mjs');
const _page7  = () => import('./chunks/_id__506ddf8a.mjs');
const _page8  = () => import('./chunks/about_8562a9f6.mjs');
const _page9  = () => import('./chunks/index_6cd0c68b.mjs');
const _page10  = () => import('./chunks/_.._9893016b.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.1.0_@types+node@20.6.2/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/countdown/index.astro", _page2],["src/pages/rss.xml.js", _page3],["src/pages/garden/index.astro", _page4],["src/pages/garden/README.md", _page5],["src/pages/garden/add.astro", _page6],["src/pages/garden/[id].astro", _page7],["src/pages/about.astro", _page8],["src/pages/blog/index.astro", _page9],["src/pages/blog/[...slug].astro", _page10]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
