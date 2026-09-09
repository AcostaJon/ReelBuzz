// route handler: get top rated movies
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

        // fetch top rated movies 
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US', options).then((data) => {
            return data.json()
        })

        // return top rated movies
        return Response.json(res);

    } 
     // catch and throw any errors
    catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data, ' + error)
    }
}


