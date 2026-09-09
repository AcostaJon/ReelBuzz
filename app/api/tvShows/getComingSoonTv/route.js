// route handler: Get a list of TV shows that air in the next 7 days
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
        // fetch popular tv shows 
        const res = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US', options).then((data) => {
            return data.json()
        })

        // return popular tv shows
        return Response.json(res)
    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }
}