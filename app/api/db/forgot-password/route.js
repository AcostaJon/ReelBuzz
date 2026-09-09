// route handler - forgot password 
export async function POST(req, res) {
    try {
        // extract and parse front end data (user email)
        const body = await req.json();
        const userEmail = body.email;
        // confirm user email is in database

        // if true  create reset-password url link and send to user email
        return Response.json({message: "reset-password sent to" + {userEmail}})

    } catch (error) {
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 })
    }
}