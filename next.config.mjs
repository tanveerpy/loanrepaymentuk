import createMDX from "@next/mdx";
const withMDX = createMDX({
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
