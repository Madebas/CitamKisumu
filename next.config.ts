import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'd1csarkz8obe9u.cloudfront.net' },
      { protocol: 'https', hostname: 'cdn.taggbox.com' },
      { protocol: 'https', hostname: 'images.squarespace-cdn.com' },
      { protocol: 'https', hostname: 'blog.cph.org' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'lookaside.fbsbx.com' },
      { protocol: 'https', hostname: 'wallpapers.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'youtu.be' },
      { protocol: 'https', hostname: 'www.youtube.com' }
    ],
  },
};

export default nextConfig;
