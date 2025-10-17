'use client'
// components
import MovieWidget from "@/app/components/movieWidget/movieWidget"
// css
import styles from "./popular.module.css"

export default function Popular(props) {
    // *********************************************************** variables
    // array of movies
    const movies = props.movies;
    // boolean, is true when tv shows are passed into props
    const isTvShow = props.isTvShow
    // variable value at zero, key for list items
    let n = 0;
   
        return (
            <div className={styles.popular}>
                {/* title box */}
                <div className={styles.title}>
                    <h2>{isTvShow ? "Popular TV Shows" : "Popular Movies"}</h2>
                </div>
                {/* list */}
                <ul>
                    {
                        movies.slice(0, 15).map((movie) => (
                            // list items
                            <li key={n++}>
                                <MovieWidget backgroundImg={movie.poster_path} id={movie.id} title={movie.title} name={movie.name}
                                    releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                    description={movie.overview} rating={movie.vote_average} />
                                <p>{movie.title ? movie.title : movie.name}</p>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        )

}