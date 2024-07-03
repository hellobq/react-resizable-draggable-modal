import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

const globals = {
  react: 'React',
  'react-transition-group': 'ReactTransitionGroup',
  'react-dom': 'ReactDOM',
}

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return mode === 'production'
      ? {
          publicDir: false,
          build: {
            minify: false,
            outDir: 'build',
            lib: {
              entry: path.resolve(__dirname, 'lib'),
              name: 'react-resizable-draggable-modal',
              fileName: (format) => `${format}.js`
            },
            rollupOptions: {
              external: Object.keys(globals),
              output: {
                globals
              }
            },
          }
        }
      : {
          base: mode === 'pages' ? '/react-resizable-draggable-modal/' : '/',
          build: {
            outDir: 'dist'
          }
        }
  } else {
    return {
      plugins: [react()]
    }
  }
})
