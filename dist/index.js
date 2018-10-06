"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class HtmlWebpackNConfigPlugin {
    constructor(config) {
        n_defensive_1.given(config, "config").ensureHasValue().ensureIsObject();
    }
    apply(compiler) {
        n_defensive_1.given(compiler, "compiler").ensureHasValue().ensureIsObject();
        compiler.hooks.compilation.tap("HtmlWebpackNConfigPlugin", (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync("HtmlWebpackNConfigPlugin", (data, cb) => {
                data.html = data.html.replace("<body>", `
                                <body>
                                <script>
                                    window.config = "${Buffer.from(JSON.stringify(this._config), "utf8").toString("hex")}";
                                </script>
                            `);
                cb(null, data);
            });
        });
    }
}
exports.HtmlWebpackNConfigPlugin = HtmlWebpackNConfigPlugin;
//# sourceMappingURL=index.js.map