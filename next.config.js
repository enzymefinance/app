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
};
