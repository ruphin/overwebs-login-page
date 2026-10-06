import { defineConfig } from 'vite';
import pkg from './package.json' with { type: 'json' };

const dependencies = Object.keys(pkg.dependencies);
const isDependency = (id) => dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  build: {
    // The published entry point (package.json "main") lives in the repository root
    outDir: '.',
    emptyOutDir: false,
    sourcemap: true,
    minify: true,
    lib: {
      entry: 'src/overwebs-login-page.js',
      formats: ['es'],
      fileName: () => 'overwebs-login-page.js',
    },
    rollupOptions: {
      external: isDependency,
      output: {
        // Keep the published module loadable without a bundler: dependencies are
        // resolved as sibling packages inside node_modules, as before.
        paths: (id) => (isDependency(id) ? `../${id}` : id),
      },
    },
  },
});
