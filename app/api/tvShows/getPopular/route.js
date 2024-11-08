// get popular tv shows
export async function GET() {

    // options object
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmRhOTY1NGRlYmVhNDI2Y2UwMDg2MDQwYzBlNThmZiIsInN1YiI6IjY2NzE4YzQ4ZjNmODZjMGYwZDNmMGU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OqnjOW-CaBf_Rjq3q1Y55mJ-T-Tru9VlM2-rOyuJuTo'
        }
    };

    // run
    try {
        // get popular tv shows and return data to res variable 
        const res = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options).then((data) => {
            return data.json()
        })

        // return promise
        return Response.json(res)

    }
    // catch and throw any errors
    catch (error) {
        throw new Error('Failed to fetch data, ' + error)
    }
}