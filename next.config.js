/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [	
				"localhost",
			     "digitalpanda.vercel.app",
			     "vercel.app"
			
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/api/:path*',
			},
			{
				source: '/sell/:path*',
				destination: '/api/sell/:path*',
			}
		]
	}
};

module.exports = nextConfig;