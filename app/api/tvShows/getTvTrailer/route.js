// Post, get tv show trailer
export async function POST(id) {
    // extract data passed to post function
    const tvId = await id.json();

    // options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmRhOTY1NGRlYmVhNDI2Y2UwMDg2MDQwYzBlNThmZiIsIm5iZiI6MTcyMzA1MDYxNy43OTc5NjcsInN1YiI6IjY2NzE4YzQ4ZjNmODZjMGYwZDNmMGU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oJyKUCjEShOivIbrQDWlbmpJ3keg5QSD5LbyJ4xlQkA'
        }
    };
    // run
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`, options).then((data) => {
            return data.json()
        })
        //   return response
        return Response.json(res);

    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }

}


