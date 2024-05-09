/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CURRENT_NETWORK: process.env.CURRENT_NETWORK,
    RPC_DEV: process.env.RPC_DEV,
    RPC_STG: process.env.RPC_STG,
    RPC_PROD: process.env.RPC_PROD,
  },
  transpilePackages: [
    "antd",
    "@ant-design/plots",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-list",
    "@ant-design/pro-descriptions",
    "@ant-design/pro-form",
    "@ant-design/pro-skeleton",
    "@ant-design/pro-field",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "@ant-design/pro-card",
    "@ant-design/pro-table",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip",
      "rc-notification"
  ],
  reactStrictMode: true,
};

export default nextConfig;
