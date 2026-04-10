import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ edge: false }),
    alias: { $lib: 'src/lib' }
  }
};

export default config;
