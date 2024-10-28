import type { NextConfig } from "next";

/* This TypeScript code snippet is defining a Next.js configuration object named
`nextConfig`. Within this configuration object, there is a property `images`
which contains an array of `remotePatterns`. Each object within the
`remotePatterns` array specifies a protocol (`https`) and a hostname for remote
images that can be used within the Next.js application. In this case, the
allowed remote image hosts are `flagcdn.com`, `upload.wikimedia.org`, and
`restcountries.com`. */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "restcountries.com" },
      { protocol: "https", hostname: "maps.googleapis.com" },
    ],
  },
};

export default nextConfig;
