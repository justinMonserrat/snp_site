// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
    },
  };
  export default nextConfig;   // <-- ESM export
  