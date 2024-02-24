const {
  createRoutesFromFolders,
} = require("@remix-run/v1-route-convention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  future: {
    v2_errorBoundary: true,
    v2_routeConvention: true,
  },
  serverDependenciesToBundle: [
    /^remix-utils.*/,
    /^@remix-run\/dev*/,
  ],
  serverModuleFormat: "cjs",
  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
  browserNodeBuiltinsPolyfill: {
    modules: ['crypto', 'buffer'],
    globals: {
      Buffer: true,
    },
  },
};
