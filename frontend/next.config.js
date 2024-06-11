/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
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
