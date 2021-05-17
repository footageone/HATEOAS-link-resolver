const sharedPresets = ['@babel/typescript'];
const shared = {
  ignore: ['src/**/*.spec.ts'],
  plugins: ["@babel/plugin-proposal-optional-chaining", "babel-plugin-add-import-extension"],
  presets: sharedPresets
}

export default {
  env: {
    esmUnbundled: shared,
    esmBundled: {
      ...shared,
      presets: [['@babel/env', {
        targets: "> 1%, not dead"
      }], ...sharedPresets],
    },
    cjs: {
      ...shared,
      presets: [['@babel/env', {
        modules: 'commonjs'
      }], ...sharedPresets],
    },
    test: {
      presets: ['@babel/env', ...sharedPresets]
    },
  }
}
