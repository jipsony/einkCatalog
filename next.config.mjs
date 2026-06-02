/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
