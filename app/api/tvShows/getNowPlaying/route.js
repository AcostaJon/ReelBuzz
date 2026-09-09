// route handler: get now playing tv shows
export async function GET() {
    //TMDB  options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`
        }
    };

    // run
    try {
        // fetch tv show currently on air
        const res = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US', options).then((data) => {
            return data.json();
        })

        // return tv show currently on air
        return Response.json(res)

    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }

}