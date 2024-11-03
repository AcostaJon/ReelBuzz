'use client'
// components
import MovieWidget from "@/app/components/movieWidget/movieWidget"
// css
import styles from "./nowplaying.module.css"

export default function NowPlaying(props) {
    // *************************************************************  variables
    // array of movies
    const movies = props.movies;
    // boolean, is true when tv shows are passed into props
    const isTvShow = props.isTvShow
    // variable value at zero, key for list items
    let n = 0;
   
        return (
            <div className={styles.nowPlaying}>
                {/* title */}
                <div className={styles.title}>
                    {/* if boolean is true display "Currently Airing TV Shows", if false display "Movies In Theaters" */}
                    <h2>{isTvShow ? "Currently Airing TV Shows" : "Movies In Theaters"}</h2>
                </div>
                {/* list */}
                <ul>
                    {
                        movies.slice(0, 13).map((movie) => (
                            // list item
                            <li key={n++}>
                                <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                    title={movie.title} name={movie.name}
                                    releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                    description={movie.overview} rating={movie.vote_average}/>
                                <p>{movie.title ? movie.title : movie.name}</p>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        )
    
}