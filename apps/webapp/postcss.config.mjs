/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
  transpilePackages: ["@rono/ui"],
};

export default config;
