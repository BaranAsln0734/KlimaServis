import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/servis-bolgeleri/:ilce',
        destination: '/:ilce-Klima-Servisi',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://siteadin.com',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://siteadin.com https://*.vercel.app",
          },
        ],
      },
    ]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rsbojkoctsexvovlpisc.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "prosoftelektrik.com.tr",
      },
      {
        protocol: "https",
        hostname: "www.akanenerji.com",
      },
      {
        protocol: "https",
        hostname: "akanenerji.com",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
