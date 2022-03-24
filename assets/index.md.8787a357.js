import { _ as _export_sfc, o as openBlock, c as createElementBlock, b as createBaseVNode, d as createVNode, u as unref, V as VTIconShuttle, F as Fragment, a as createStaticVNode } from "./app.adabc9dd.js";
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { id: "hero" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 class="tagline" data-v-e108845a>Shuttle.Recall</h1><p class="description" data-v-e108845a> An event sourcing/projection mechanism that abstracts the storage of events. </p><p class="actions" data-v-e108845a><a class="why" href="/shuttle-recall/why.html" data-v-e108845a>Why?</a><a class="get-started" href="/shuttle-recall/getting-started.html" data-v-e108845a> Get Started <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" data-v-e108845a><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" data-v-e108845a></path></svg></a></p>', 3);
const _hoisted_5 = /* @__PURE__ */ createStaticVNode('<section id="highlights" class="vt-box-container" data-v-e108845a><div class="vt-box" data-v-e108845a><h2 data-v-e108845a>Framework Support</h2><div data-v-e108845a> Packages currently target <code data-v-e108845a>netstandard2.0</code> and <code data-v-e108845a>netstandard2.1</code> which means that they can be used with .NET Core 2.1+, .NET Framework 4.6.1+, and .NET 5.0+ </div></div><div class="vt-box" data-v-e108845a><h2 data-v-e108845a>Storage</h2><div data-v-e108845a> Since the storage of events is abstracted any relevant data store may be used. The default mechanism is a Sql Server database. </div></div><div class="vt-box" data-v-e108845a><h2 data-v-e108845a>Open Source</h2><div data-v-e108845a> These packages are free open source software licensed under the <a href="https://opensource.org/licenses/BSD-3-Clause" data-v-e108845a>3-Clause BSD License</a>. Pull requests are welcome. </div></div></section>', 1);
const _sfc_main$1 = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1, [
          createVNode(unref(VTIconShuttle), { class: "logo" }),
          _hoisted_2
        ]),
        _hoisted_5
      ], 64);
    };
  }
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e108845a"]]);
const __pageData = '{"title":"Home","description":"","frontmatter":{"page":true,"title":"Home"},"headers":[],"relativePath":"index.md"}';
const __default__ = {};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Home)
      ]);
    };
  }
});
export { __pageData, _sfc_main as default };
