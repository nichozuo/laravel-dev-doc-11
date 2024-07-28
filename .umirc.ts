import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    "@umijs/plugins/dist/request",
    "@umijs/plugins/dist/initial-state",
    "@umijs/plugins/dist/model",
  ],
  request: {},
  initialState: {},
  model: {},
  routes: [{ path: "/index.html", component: "index" }],
  npmClient: "npm",
  base: "/docs/",
  publicPath: "/docs/",
  proxy: {
    "/api": {
      target: "http://0.0.0.0:8000/api",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
});
