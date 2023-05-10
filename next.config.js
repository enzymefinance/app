/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    swcPlugins: [
      [
        "@graphql-codegen/client-preset-swc-plugin",
        {
          artifactDirectory: "./src/lib/generated/gql",
          gqlTagName: "graphql",
        },
      ],
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;
    config.resolve.fallback.net = false;
    config.resolve.fallback.tls = false;
    config.resolve.fallback.path = false;
    config.resolve.fallback.os = false;
    config.resolve.fallback.zlib = false;
    config.resolve.fallback.stream = false;
    config.resolve.fallback.crypto = false;
    config.resolve.fallback.http = false;
    config.resolve.fallback.https = false;
    config.resolve.fallback.encoding = false;

    return config;
  },
};
