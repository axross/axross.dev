module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, ".ts", ".tsx"],
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                transpileOnly: true,
                compilerOptions: {
                  ...require("../tsconfig.json").compilerOptions,
                  jsx: "react",
                },
              },
            },
          ]
        }
      ],
    },
  }),
};
