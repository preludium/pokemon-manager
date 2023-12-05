/** @type {import('next').NextConfig} */
const nextConfig = {
    serverComponentsExternalPackages: [ "@prisma/client", "bcryptjs" ]
};

module.exports = nextConfig;
