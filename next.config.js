/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGODB_URI,
        ACESS_CODE: process.env.ACESS_CODE,
        SECRET_KEY: process.env.SECRET_KEY 
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
