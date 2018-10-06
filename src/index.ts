import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export class HtmlWebpackNConfigPlugin
{
    private readonly _config: object;


    public constructor(config: object)
    {
        given(config, "config").ensureHasValue().ensureIsObject();
    }


    public apply(compiler: object | any)
    {
        given(compiler, "compiler").ensureHasValue().ensureIsObject();
        
        compiler.hooks.compilation.tap("HtmlWebpackNConfigPlugin", (compilation: any) =>
        {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                "HtmlWebpackNConfigPlugin",
                (data: any, cb: any) =>
                {
                    data.html = data.html.replace("<body>",
                        `
                                <body>
                                <script>
                                    window.config = "${Buffer.from(JSON.stringify(this._config), "utf8").toString("hex")}";
                                </script>
                            `);

                    cb(null, data);
                }
            );
        });
    }
}