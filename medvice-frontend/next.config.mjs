/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_URL: 'https://7fdf-45-134-140-24.ngrok-free.app'
    },
  };

export default nextConfig;


// // Import next-transpile-modules using ESM syntax
// import withTM from 'next-transpile-modules';

// // Define the modules to transpile
// const modulesToTranspile = ['react-markdown'];

// // Use withTM with the specified modules
// export default withTM(modulesToTranspile)({
//   // Your configuration here...
// });
