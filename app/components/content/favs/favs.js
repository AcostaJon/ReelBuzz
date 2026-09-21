'use client'
// components
import SavedMovieWidget from "../../savedMovieWidget/saved.MovieWidget";
// react
import { useContext } from 'react';
// context api
import { AppContext } from '@/app/components/context/context'
// css
import styles from "./favs.module.css"

export default function Favs() {

    // context object (app data)
    const app = useContext(AppContext)

    // variable set to zero
    let n = 0

    return (
        <section className={styles.heartSection}>
            {/* heading */}
            <div className={styles.headerContainer}>
                <h1>Favorites </h1>
            </div>
            {/* list */}
            <ul>
                {
                    app.favs.map((movie) =>
                        // list item "movie widget"
                        <li key={n++}>
                            <SavedMovieWidget backgroundImg={movie.movieBG} id={movie.id}
                                title={movie.title} name={movie.name}
                                releaseDate={movie.releaseDate} firstAir={movie.firstAir} adult={movie.adult}
                                description={movie.description} rating={movie.rating} voteCount={movie.voteCount} />
                            <p>{movie.title ? movie.title : movie.name}</p>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}