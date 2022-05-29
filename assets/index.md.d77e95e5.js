import { _ as _export_sfc, o as openBlock, c as createElementBlock, b as createBaseVNode, d as createVNode, u as unref, V as VTIconShuttle, e as VTIconDiscord, F as Fragment, a as createStaticVNode, f as createTextVNode } from "./app.8edda2d9.js";
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { id: "hero" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 class="tagline" data-v-9d35df06>Shuttle.Recall</h1><p class="description" data-v-9d35df06> An event sourcing/projection mechanism that abstracts the storage of events. </p><p class="actions" data-v-9d35df06><a class="why" href="/shuttle-recall/why.html" data-v-9d35df06>Why?</a><a class="get-started" href="/shuttle-recall/getting-started.html" data-v-9d35df06> Get Started <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" data-v-9d35df06><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" data-v-9d35df06></path></svg></a></p>', 3);
const _hoisted_5 = {
  href: "https://discord.gg/Fjg5mZP9ey",
  target: "_blank"
};
const _hoisted_6 = { class: "discord-link" };
const _hoisted_7 = /* @__PURE__ */ createTextVNode("Join our Discord channel ");
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<section id="highlights" class="vt-box-container" data-v-9d35df06><div class="vt-box" data-v-9d35df06><h2 data-v-9d35df06>Framework Support</h2><div data-v-9d35df06> Packages currently target <code data-v-9d35df06>netstandard2.0</code> and <code data-v-9d35df06>netstandard2.1</code> which means that they can be used with .NET Core 2.1+, .NET Framework 4.6.1+, and .NET 5.0+ </div></div><div class="vt-box" data-v-9d35df06><h2 data-v-9d35df06>Storage</h2><div data-v-9d35df06> Since the storage of events is abstracted any relevant data store may be used. The default mechanism is a Sql Server database. </div></div><div class="vt-box" data-v-9d35df06><h2 data-v-9d35df06>Open Source</h2><div data-v-9d35df06> These packages are free open source software licensed under the <a href="https://opensource.org/licenses/BSD-3-Clause" data-v-9d35df06>3-Clause BSD License</a>. Pull requests are welcome. </div></div></section>', 1);
const _sfc_main$1 = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1, [
          createVNode(unref(VTIconShuttle), { class: "logo" }),
          _hoisted_2,
          createBaseVNode("p", null, [
            createBaseVNode("a", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createVNode(unref(VTIconDiscord), { class: "discord-logo" }),
                _hoisted_7
              ])
            ])
          ])
        ]),
        _hoisted_8
      ], 64);
    };
  }
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9d35df06"]]);
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
