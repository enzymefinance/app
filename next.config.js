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
    config.resolve.fallback.encoding = false;

    return config;
  },
};
