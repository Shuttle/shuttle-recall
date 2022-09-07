import { _ as _export_sfc, a as createStaticVNode, o as openBlock, c as createElementBlock, b as createVNode } from "./app.0ac7c232.js";
const _sfc_main$1 = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<div><section id="hero"><h1 class="tagline">.Net Event Sourcing</h1><p class="description"> An event sourcing/projection mechanism that abstracts the storage of events. </p><p class="actions"><a class="why" href="/shuttle-recall/why.html">Why?</a><a class="get-started" href="/shuttle-recall/getting-started.html"> Get Started <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path></svg></a></p></section><section id="highlights" class="vt-box-container"><div class="vt-box"><h2>Framework Support</h2><div> Packages currently target <code>netstandard2.0</code> and <code>netstandard2.1</code> which means that they can be used with .NET Core 2.1+, .NET Framework 4.6.1+, and .NET 5.0+ </div></div><div class="vt-box"><h2>Storage</h2><div> Since the storage of events is abstracted any relevant data store may be used. The default mechanism is a Sql Server database. </div></div><div class="vt-box"><h2>Open Source</h2><div> These packages are free open source software licensed under the <a href="https://opensource.org/licenses/BSD-3-Clause">3-Clause BSD License</a>. Pull requests are welcome. </div></div></section></div>&gt; ', 2);
function _sfc_render(_ctx, _cache) {
  return _hoisted_1;
}
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const __pageData = JSON.parse('{"title":"Shuttle.Recall","description":"","frontmatter":{"page":true,"title":"Shuttle.Recall"},"headers":[],"relativePath":"index.md"}');
const __default__ = { name: "index.md" };
const _sfc_main = Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Home)
      ]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};