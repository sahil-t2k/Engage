
/** @type {import('next').NextConfig} */

module.exports = {
  // jest.config.js

  setupFilesAfterEnv: ['./jest.setup.js'],

 env:{
      serverURL:"http://103:136:36:27",
      port:"7860"
    }
  ,

  webpack: (config) => {
    config.resolve.fallback = { crypto: 
    require.resolve("crypto-browserify")};
    
    return config;
  },
   // Will be available on both server and client
  publicRuntimeConfig:'12.1.4',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://103.136.36.27:7860/:path*' // Proxy to Backend
      }
    ]
  },
  i18n:{
    locales:['en', 'fr', 'ar'],
    defaultLocale:'en',
   
  },


  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
}
