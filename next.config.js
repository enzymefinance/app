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
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      encoding: false,
      path: false,
      http: false,
      https: false,
      zlib: false,
      os: false,
      stream: false,
      crypto: false,
    };

    return config;
  },
};
