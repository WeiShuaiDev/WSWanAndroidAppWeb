import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import base from "./src/utils/env.ts";

// 在模块顶层中使用await，一开始是不支持的，后面才支持了，旧ES6标准，await的是需要放置在async 函数中才能使用，现在新标准允许了，
// 但是也需要某些特定的最新的浏览器（比如chrome87就不支持）才能运行，而vite默认并不会在打包的时候进行转换，
import topLevelAwait from "vite-plugin-top-level-await";

let baseUrl = "";
if (base == "test") {
  baseUrl = "";
}

export default ({ mode }) =>
  defineConfig({
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
    // 不过，对所有的依赖都进行转译可能会降低构建速度。如果对构建性能有所顾虑，你可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
    transpileDependencies: ["pdfjs-dist"],
    plugins: [
      vue(),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: i => `__tla_${i}`
      })
    ],
    base: loadEnv(mode, process.cwd()).VITE_BASE_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      cors: true,
      proxy: {
        "^/api/.*": {
          target: baseUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    css: {
      loaderOptions: {
        css: {
          // options here will be passed to css-loader
        },
        postcss: {
          // options here will be passed to postcss-loader
          plugins: [
            require("postcss-px2rem")({
              remUnit: 75 //1rem=75px，这里是设计稿的尺寸是750px
            })
          ]
        }
      }
    }
  });
