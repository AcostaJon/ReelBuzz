'use client'
// react
import { useContext } from "react";
// context api
import { AppContext } from "../../context/context"
// styles
import styles from "./showcaseWidget.module.css"

export default function ShowCaseWidget(props) {

    // context object (app data)
    const app = useContext(AppContext)

    // ************************************************ events
    // handle onClick - "more info" button
    function moreInfo() {
        app.openMovie(props.backgroundImg, props.title, props.name, props.releaseDate, props.firstAir, props.rating, props.overview, props.adult, props.id)
    }

    // format release date - mm-dd-yyyy
    function formatDate(date) {
        //    const date = app.movieFrontData.releaseDate
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
        <div className={styles.showCaseWidget} style={{ backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.0), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${props.backgroundImg})` }}>
            <div className={styles.ContentInfoBox} >
                {/* logo */}
                <h3>Reel Buzz</h3>
                {/* release date and rated */}
                <div className={styles.DateandRating}>
                    <p>{props.releaseDate ? formatDate(props.releaseDate) : formatDate(props.firstAir)}</p>
                    <span>{props.adult ? "18+" : "E"}</span>
                    <p>{props.title ? "Movie" : "Tv Show"}</p>
                </div>
                {/* title or name */}
                <h1>{props.title ? props.title : props.name}</h1>
                {/* overview */}
                <p className={styles.overview}>{props.overview ? props.overview.slice(0, 100) + "..." : ""} </p>
                {/* more info button */}
                <button onClick={moreInfo} > More info </button>
            </div>
        </div>
    )

}