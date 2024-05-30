/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG:true,
		remotePatterns: [
			{
				protocol:'https',
				hostname:'media.graphassets.com'
			},
			{
				protocol:'https',
				hostname:'m.media-amazon.com'
			},
			{
				protocol:'https',
				hostname:'hygraph.com'
			},
			{
				protocol:'https',
				hostname:'sa-east-1.graphassets.com'
			},
			{
				protocol:'https',
				hostname:'vercel.com'
			},
			{
				protocol:'https',
				hostname:'www.netlify.com'
			}
		]
	}
};

export default nextConfig;
