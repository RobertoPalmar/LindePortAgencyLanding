/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages no implementa el optimizador de `/_next/image`, así que las
  // fotos se sirven tal cual: el peso del archivo original es el que viaja.
  images: { unoptimized: true },
};

export default nextConfig;
