// route Handler: Get movie trailers using the movie's ID
export async function POST(req, res) {
    // extract data (Movie ID)
    const movieID = await req.json();
    // TMDB options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TRAILER_KEY}`
        }
    };

    // run
    try {
        // fetch movie trailer 
        const trailers = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options).then((data) => {
            return data.json()
        })
        // fetch movie credits 
        const credits = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits`, options).then((data) => {
            return data.json()
        })

        // return movie trailer and credits
        return Response.json({
            trailer: trailers,
            credits: credits
        });
    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }

}



