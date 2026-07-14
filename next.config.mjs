/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the app can be deployed straight to Firebase Hosting
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
