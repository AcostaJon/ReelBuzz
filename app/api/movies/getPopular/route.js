// route handler: get popular movies
export async function GET() {
    //TMDB options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`
        }
    };

    // run
    try {
        // fetch Popular movies 
        const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', options).then((data) => {
            return data.json()
        })

        // return Popular movies
        return Response.json(res);
    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }
}


