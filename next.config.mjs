/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/movies/getMovieTrailer",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ]
            },
            {
                // matching all API routes
                source: "/api/tvShows/getTvTrailer",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ]
            },
        ]
    }
    // basePath: "/Reel-Buzz",
    // images: { unoptimized: true },
    // output: 'export',
};

export default nextConfig;