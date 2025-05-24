import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*
    standalone mode:
      Smaller Deployment Size: Creates a minimal production build that includes only the necessary files to run your application
  */
  output: 'standalone',

};

export default nextConfig;
