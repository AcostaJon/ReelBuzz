'use client'
// react
import ReactPlayer from 'react-player/youtube'
import { useContext, useEffect, useState } from "react"
// context api
import { AppContext } from "../../context/context"
// css
import styles from "./movieFront.module.css"

export default function MovieFront() {
    //************************************************************************* * state
    const [trailer, setTrailer] = useState({});
    const [credits, setCredits] = useState();
    // variable with value of zero
    let n = 0
    // context object (app data)
    const app = useContext(AppContext);
    //************************************************************************* * use effect
    useEffect(() => {
        // get movie trailer if movie (title) is true - update trailer state
        if (app.movieFrontData.title) {
            getTrailer(app.movieFrontData.id, 'api/movies/getMovieTrailer',)
                .then((promise) => {
                    // all trailers
                    const trailers = promise.trailer.results;
                    // cast members
                    const cast = promise.credits.cast;
                    // return "official trailer" from array of trailers
                    const officialTrailer = trailers.filter(video => video.name.includes("Official"))
                    setTrailer(officialTrailer[0]);
                    setCredits(cast);
                })
        }

        // get series trailer if series (name) is true - update trailer state
        if (app.movieFrontData.name) {
            getTrailer(app.movieFrontData.id, 'api/tvShows/getTvTrailer')
                .then((promise) => {
                    // all trailers
                    const arr = promise.trailer.results;
                    // return "official trailer" from array of trailers
                    const officialTrailer = arr.filter(video => video.name.includes("Official"))
                    // cast members
                    const cast = promise.credits.cast;
                    setTrailer(officialTrailer[0]);
                    setCredits(cast);
                })
        }
    }, [])
    //************************************************************************* * fetch requests
    // get trailer
    const getTrailer = async (id, url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        })

        const promise = await res.json()
        return promise;
    }
    //************************************************************************* * handlers
    // format release date - mm-dd-yyyy
    function formatDate(date) {
        // const date = app.movieFrontData.releaseDate
        let finalFormat;
        let year;
        let month;
        let day;

        month = date.slice(5, 7);
        year = date.slice(0, 4);
        day = date.slice(8, 10)

        finalFormat = month + "-" + day + "-" + year
        return year;
    }

    return (
        <section className={styles.MovieFrontSection}>
            {/* trailer */}
            <div>
                {/* trailer and background image */}
                {/* ternary operation - if app context containes video(trailer) return video(trailer), if not return image */}
                {(trailer) ? <ReactPlayer
                    width="100%"
                    height="60vh"
                    url={`https://www.youtube.com/watch?v=${trailer.key}`}
                    controls />
                    :
                    <div className={styles.mediaImage} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${app.movieFrontData.backgroundImg})` }}>
                    </div>
                }
            </div>
            {/* content info */}
            <div className='px-3 py-4'>
                {/* header */}
                <div className='d-flex align-items-center'>
                    {/* title/date */}
                    <div className='col-8 d-flex align-items-center '>
                        {/* app.title or name */}
                        <h3 className='mb-0 fw-bold'>{app.movieFrontData.title ? app.movieFrontData.title : app.movieFrontData.name}</h3>
                        {/* app.release_date */}
                        <p className='text-white-50 ms-1 mb-0'>{app.movieFrontData.releaseDate ? <sub>{formatDate(app.movieFrontData.releaseDate)}</sub> : <sub>{formatDate(app.movieFrontData.firstAir)}</sub>}</p>
                    </div>
                    {/* rating */}
                    <div className='col-4'>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar w-75"></div>
                        </div>
                        <p className='text-white-50 text-center mb-0'>From {app.movieFrontData.voteCount} users</p>
                    </div>
                </div>
                {/* description */}
                <div>
                    <p className='my-4 text-white-50'>{app.movieFrontData.description ? app.movieFrontData.description : "Overview is not available"}</p>
                </div>
                {/* cast */}
                <div className="container text-center p-lg-3">
                    <div className="row g-2 g-lg-4 justify-content-between">
                        <h1 className='fw-bold'>Cast</h1>
                        {
                            credits?.map((actor) =>
                                <div key={n++} className="col-5 col-lg-3 me-lg-1 d-flex align-items-center border rounded-5 border-start-0 border-bottom-0 px-0 bg-black ">
                                    <div>
                                        <img className='img-fluid rounded-circle border border-primary' src={"https://image.tmdb.org/t/p/w500/" + actor.profile_path} width={50} />
                                    </div>
                                    <div className='ms-1'>
                                        <p className={styles.actorName}>{actor.original_name}</p>
                                        <p className={styles.actorCharName}>As {actor.character}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}