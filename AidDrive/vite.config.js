// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port:3000,
    
//   }
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { minifyHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    minifyHtml(), // Optional: adds minification for HTML files
  ],
  server: {
    port: 3000,
  },
  css: {
    modules: false, // Enable CSS modules if needed
    postcss: {}, // Add any PostCSS plugins or configurations here
  },
});
