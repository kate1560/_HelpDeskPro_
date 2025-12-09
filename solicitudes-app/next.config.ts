import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitir acceder al dev server también desde la IP de la red local
  allowedDevOrigins: ["10.1.70.35"],
};

export default nextConfig;
