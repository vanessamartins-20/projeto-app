
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Permite carregar arquivos WebAssembly usados pelo SQLite
if (!config.resolver.assetExts.includes("wasm")) {
  config.resolver.assetExts.push("wasm");
}

// Configura os cabeçalhos necessários para SharedArrayBuffer
const enhanceMiddleware = config.server.enhanceMiddleware;

config.server.enhanceMiddleware = (middleware, metroServer) => {
  const enhanced = enhanceMiddleware
    ? enhanceMiddleware(middleware, metroServer)
    : middleware;

  return (req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    return enhanced(req, res, next);
  };
};

module.exports = config;
