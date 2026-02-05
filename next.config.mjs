import createMDX from "@next/mdx";
const withMDX = createMDX({
});

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    basePath: isProd ? "/loanrepaymentuk" : "",
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    output: "export",
    images: {
        unoptimized: true,
    },
    experimental: {
        mdxRs: false,
    },
};

export default withMDX(nextConfig);
