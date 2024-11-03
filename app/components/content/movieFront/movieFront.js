'use client'
// react
import ReactPlayer from 'react-player/youtube'
import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
// context api
import { AppContext } from "../../context/context"
// css
import styles from "./movieFront.module.css"
// images
import logo from "@/public/reelBuzzLogo.svg"

export default function MovieFront() {
    //************************************************************************* * state
    const [trailer, setTrailer] = useState({});

    // context object (app data)
    const app = useContext(AppContext);
    //************************************************************************* * use effect
    useEffect(() => {
        // get moview trailer if movie title is true - update trailer state
        if (app.movieFrontData.title) {
            getTrailer(app.movieFrontData.id,'api/movies/getMovieTrailer')
                .then((promise) => {
                    setTrailer(promise.results[0]);
                })
        }

        // get tv show trailer if tv show name is true - update trailer state
        if (app.movieFrontData.name) {
            getTrailer(app.movieFrontData.id,'api/tvShows/getTvTrailer')
                .then((promise) => {
                    setTrailer(promise.results[0]);
                })
        }
    }, [])
    //************************************************************************* * fetch requests
    // get trailer
    const getTrailer = async (id, url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })

        const promise = await res.json()
        return promise;
    }
    //************************************************************************* * functions
    // convert rating to percentage
    function finalRating(num) {
        const rating = num
        const n = (rating + 0.05) * 10;
        const finalRating = n.toString().slice(0, 2);

        return finalRating
    }

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
        return finalFormat
    }

    return (
        <section className={styles.MovieFrontSection}>

            {/* media container */}
            <div className={styles.mediaContainer}>
                {/* trailer and background image */}
                {/* ternary operation - if app context containes video(trailer) return video(trailer), if not return image */}
                {trailer ? <ReactPlayer
                    width='100%'
                    height='360px'
                    url={`https://www.youtube.com/watch?v=${trailer.key}`}
                    controls />
                    :
                    <div className={styles.mediaImage} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${app.movieFrontData.backgroundImg})` }}>
                    </div>
                }

            </div>

            {/* description and details container */}
            <div className={styles.detailsContainer}>
                {/* title continer */}
                <div className={styles.detailsTitleContainer}>
                    <Image src={logo} width={90} height={100} alt="reel buzz logo" />
                    <h1>{app.movieFrontData.title ? app.movieFrontData.title : app.movieFrontData.name}</h1>
                    <div className={styles.DateContainer}>
                        <p>{app.movieFrontData.releaseDate ? formatDate(app.movieFrontData.releaseDate) : formatDate(app.movieFrontData.firstAir)}</p>
                        <span>{app.movieFrontData.adult ? "18+" : "E"}</span>
                    </div>
                    <h3 className={styles.hideOnMobileLabel}>Fan Rating <span className={styles.ratingPercentage}>{`${finalRating(app.movieFrontData.rating)}%`}</span> </h3>
                    <h3 className={styles.hideOnMobileLabel}>Overview</h3>
                    <p className={styles.hideOnMobileDescription}>{app.movieFrontData.description ? app.movieFrontData.description : "Overview is not available"}</p>
                </div>

                {/* media in deatils container */}
                <div className={styles.detailsMediaContainer} >
                    {/* trailer and background */}
                    {/* ternary operation - if app context containes video(trailer) return video(trailer), if not return image */}
                    {trailer ? <ReactPlayer
                        width='100%'
                        height='500px'
                        url={`https://www.youtube.com/watch?v=${trailer.key}`}
                        className={styles.detailsPlayer}
                        controls />
                        :
                        <div className={styles.detailsImage} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${app.movieFrontData.backgroundImg})` }}>
                        </div>
                    }
                    {/*  rating and overview  */}
                    <div className={styles.detailsInfo}>
                        <h3 className={styles.ratingLabel}>Fan Rating <span className={styles.ratingPercentage}>{`${finalRating(app.movieFrontData.rating)}%`}</span> </h3>
                        <h3 className={styles.overviewLabel}>Overview</h3>
                        <p className={styles.overviewDescription}>{app.movieFrontData.description ? app.movieFrontData.description : "Overview is not available"}</p>
                    </div>

                </div>

            </div>

        </section>
    )
}