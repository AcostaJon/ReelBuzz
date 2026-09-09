// route handler: get top rated tv shows
export async function GET() {
    // TMDB options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`
        }
    };

    // run
    try {
        // fetch top rated tv shows and return data to res variable
        const res = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US', options).then((data) => {
            return data.json();
        })

        // return top rated tv shows
        return Response.json(res)
    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }

}