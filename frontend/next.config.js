/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Fix workspace root warning
  outputFileTracingRoot: __dirname,
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
  
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const isValid = typeof apiBase === 'string' && /^(https?:\/\/|\/)/.test(apiBase);
    if (!isValid) {
      // No valid API base URL set; skip rewrites to avoid invalid config
      return [];
    }
    const normalized = apiBase.replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${normalized}/api/:path*`,
      },
    ];
  },
  
  images: {
    domains: ['localhost', 'vercel.app', 'your-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Optimize for Vercel deployment (disable optimizeCss to avoid 'critters' dependency)
  experimental: {
    optimizeCss: false,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;