/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns:[
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",  // Leave this empty since you're using the default HTTPS port
                pathname: "/dmifupmqk/image/upload/**",  // Path to the image folder in Cloudinary
            },
            // {
            //     protocol: http,  // For local development
            //     hostname: localhost,
            //     port: 1337,  // Strapi's default port
            //     pathname: "/uploads/**",  // Assuming your images are served from '/uploads/'
            // }
        ],
        domains: ["res.cloudinary.com"]
    }
};

export default nextConfig;
