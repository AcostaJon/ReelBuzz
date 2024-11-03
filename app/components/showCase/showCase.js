'use client'
// components
import ShowCaseWidget from "./showcaseWidget.js/showcaseWidget";
// css
import styles from "./showCase.module.css"

export default function ShowCase(props) {

    // empty array of movies or tv shows
    let showCase = [];

    // ************************************************** condition
    // if props has movie list
    if (props.movies) {
        // return array that has first 5 movies
        showCase = props.movies.slice(0, 5);
    }
    // if props has tv show list
    if (props.tvShows) {
        // return array that has first 5 movies
        showCase = props.tvShows.slice(1, 6);
    }
    // if props has tv shows and movies
    if (props.movies && props.tvShows) {
        // return array that has movies and tv shows
        const moviesTvshows = props.movies.slice(3, 5).concat(props.tvShows.slice(4, 5)).concat(props.movies.slice(0, 1)).concat(props.tvShows.slice(5, 6))
        showCase = moviesTvshows;
    }

    return (
        <div className={styles.showcaseContainer}>
            {/* list */}
            <ul className={styles.showcaseUl}>
                {showCase.map((show) =>
                    // list item
                    <li key={show.id}>
                        {/* widget */}
                        <ShowCaseWidget backgroundImg={show.poster_path} id={show.id}
                            title={show.title} name={show.name}
                            releaseDate={show.release_date} firstAir={show.first_air_date} adult={show.adult}
                            overview={show.overview} rating={show.vote_average} />

                    </li>
                )}

            </ul>

        </div>
    )
}