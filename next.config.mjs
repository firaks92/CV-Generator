const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/CV-Generator' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
