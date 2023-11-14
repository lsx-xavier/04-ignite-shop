/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      
    ]
  },

  env: {
    NEXT_BASE_URL: process.env.NEXT_URL,
    NEXT_PUBLIC_STRIPE_KEY: process.env.STRIPE_PUBLIC_KEY,
  }
}

module.exports = nextConfig
