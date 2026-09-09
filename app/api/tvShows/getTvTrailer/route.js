//route handler: get tv show trailer using the show ID
export async function POST(id) {
    // extract tv show ID 
    const tvId = await id.json();

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
        // fetch tv show trailer
        const trailers = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`, options).then((data) => {
            return data.json()
        })
        // fetch series credits 
        const credits = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits`, options).then((data) => {
            return data.json()
        })

        // return tv trailer and credits
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


