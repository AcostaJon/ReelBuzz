'use client'
// react
import { useState, useContext } from "react"
// css
import styles from "./search.module.css"
// components
import MovieWidget from "../../movieWidget/movieWidget";
// context api
import { AppContext } from "../../context/context";

export default function Search() {
    // ************************************************** state
    const [userInput, setUserInput] = useState('');
    const [showFiltered, setShowFiltered] = useState();
    // ************************************************** context data
    // context object (app data)
    const app = useContext(AppContext);
    const nowPlayingMovies = app.nowPlayingMovies
    const popularMovies = app.popularMovies
    const popularTvShows = app.popularTvShow
    const tvShowsOnTv = app.onTv
    // variable with value of zero
    let n = 0
    // ************************************************** events 
    // onSubmit handler - search content 
    const search = (e) => {
        e.preventDefault()
    }

    // onChange - show and filter search results based on user input value 
    const onChange = (e) => {

        // update "userInput" state variable - user input
        setUserInput(e.target.value)

        //*********  filter arrays ************/
        let filteredNowMovies = nowPlayingMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredPopMovies = popularMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredPopTv = popularTvShows.filter(function (movie) {
            return movie.name.toLocaleLowerCase().includes(userInput)
        })
        let filteredOnTv = tvShowsOnTv.filter(function (movie) {
            return movie.name.toLocaleLowerCase().includes(userInput)
        })
        // merge all arrays together - this could be your database search
        let allArray = [...filteredNowMovies, ...filteredOnTv, ...filteredPopTv, ...filteredPopMovies];

        // filter out duplicates
        const allMoviesShows = allArray.filter(
            (obj, index) =>
                allArray.findIndex((item) => item.id === obj.id) === index
        );

        // update "showFiltered" state variable - value is filtered array(s)
        setShowFiltered(allMoviesShows)
    }

    if (showFiltered) {
        return (
            <section className={styles.searchSection} >
                {/* search input */}
                <form onSubmit={search} onChange={onChange} className={styles.inputContainer} >
                    <input type="text" placeholder="Live Search " />
                </form>
                {/* show all movies and shows */}
                <div>
                    <ul>
                        {
                            showFiltered.map((movie) =>
                                <li key={n++} >
                                    <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                        title={movie.title} name={movie.name}
                                        releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                        description={movie.overview} rating={movie.vote_average} likes={movie.vote_count} />
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </section>
        )

    } else {
        return (
            <section className={styles.searchSection} >
                {/* search input */}
                <form onSubmit={search} onChange={onChange} className={styles.inputContainer} >
                    <input type="text" placeholder="Search for any movie or show" />
                </form>
                {/* show all movies and shows */}
                <div>
                    <ul>
                        {
                            nowPlayingMovies.map((movie) =>
                                <li key={n++}>
                                    <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                        title={movie.title} name={movie.name}
                                        releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                        description={movie.overview} rating={movie.vote_average} likes={movie.vote_count} />
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </li>
                            )
                        }
                        {
                            popularMovies.map((movie) =>
                                <li key={n++} >
                                    <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                        title={movie.title} name={movie.name}
                                        releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                        description={movie.overview} rating={movie.vote_average} likes={movie.vote_count} />
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </li>
                            )
                        }
                        {
                            popularTvShows.map((movie) =>
                                <li key={n++} >
                                    <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                        title={movie.title} name={movie.name}
                                        releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                        description={movie.overview} rating={movie.vote_average} likes={movie.vote_count} />
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </li>
                            )
                        }
                        {
                            tvShowsOnTv.map((movie) =>
                                <li key={n++} >
                                    <MovieWidget backgroundImg={movie.poster_path} id={movie.id}
                                        title={movie.title} name={movie.name}
                                        releaseDate={movie.release_date} firstAir={movie.first_air_date} adult={movie.adult}
                                        description={movie.overview} rating={movie.vote_average} likes={movie.vote_count} />
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </section>
        )
    }


}