/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.cashier.farhandev.cloud",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.cashier.farhandev.cloud",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
