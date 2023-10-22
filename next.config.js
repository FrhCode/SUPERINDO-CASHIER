/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cashier.farhandev.cloud",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
