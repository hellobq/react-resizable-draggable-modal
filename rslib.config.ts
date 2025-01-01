import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig({
  source: {
    entry: {
      index: './lib'
    },
  },
  lib: [
    {
      bundle: true,
      format: 'esm',
      dts: {
        distPath: './build/types',
      },
    }
  ],
  output: {
    target: 'web',
    distPath: {
      root: 'build'
    },
    filename: {
      css: 'style.css',
      js: 'index.js'
    },
    overrideBrowserslist: [
      'chrome 49'
    ],
  },
  plugins: [pluginReact(), pluginSass()],
})
