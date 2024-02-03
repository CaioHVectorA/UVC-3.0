/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGODB_URI
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
