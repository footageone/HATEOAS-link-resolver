const sharedPresets = ['@babel/preset-typescript'];

const plugins = ['@babel/plugin-proposal-optional-chaining'];

const shared = {
  ignore: ['src/**/*.spec.ts'],
  presets: sharedPresets,
};

module.exports = {
  env: {
    esmUnbundled: shared,
    esmBundled: {
      ...shared,
      plugins: [...plugins, 'babel-plugin-add-import-extension'],
      presets: [
        ...sharedPresets,
        [
          '@babel/env',
          {
            targets: '> 1%, not dead',
          },
        ],
      ],
    },
    cjs: {
      ...shared,
      plugins: [
        ...plugins,
        ['babel-plugin-add-import-extension', { extension: 'cjs' }],
      ],
      presets: [
        ...sharedPresets,
        [
          '@babel/env',
          {
            modules: 'commonjs',
          },
        ],
      ],
    },
    test: {
      presets: [...sharedPresets, '@babel/env'],
    },
  },
};
