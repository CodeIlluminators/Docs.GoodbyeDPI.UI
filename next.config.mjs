const isProd = process.env.NODE_ENV === 'production';

/** @type {import("next").NextConfig} */
const nextConfig = {
	skipTrailingSlashRedirect: true,
	reactStrictMode: true,
	trailingSlash: true,
	swcMinify: true,
	// Note: This feature is required to use the Next.js Image component in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	trailingSlash: true,
	// Configure assetPrefix or else the server won't properly resolve your assets.
	assetPrefix: isProd ? undefined : `http://localhost:3000`,
	webpack: (config, { isServer }) => {
    config.devtool = isServer ? 'source-map' : 'inline-source-map';
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		);
		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			},
		);
		fileLoaderRule.exclude = /\.svg$/i;
		return config;
	},
};

export default nextConfig;
