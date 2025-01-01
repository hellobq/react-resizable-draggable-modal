import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig(({ envMode }) => {
  const userConfig = {
    plugins: [pluginReact(), pluginSass()],
  }
  if (envMode === 'pages') {
    return {
      ...userConfig,
      output: {
        assetPrefix: '/react-resizable-draggable-modal/',
      }
    }
  }
  return userConfig
})
