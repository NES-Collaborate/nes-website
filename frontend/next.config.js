/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/api/server/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
      {
        source: "/auth",
        destination: "/auth/login"
      }
    ]
  },
  images: {
    remotePatterns: [{ "protocol": "https", "hostname": "*", "port": "" }],
  }
}

module.exports = nextConfig
