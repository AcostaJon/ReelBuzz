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
    // variable with value of zero
    let n = 0
    // ************************************************** context data
    // context object (app state)
    const app = useContext(AppContext)
    // movies and shows
    const nowPlayingMovies = app.nowPlayingMovies;
    const popularMovies = app.popularMovies;
    const upComingMovies = app.upComingMovies;
    const topRatedMovies = app.topRatedMovies;
    const comingSoonTv = app.comingSoonTv;
    const onTv = app.onTv;
    const topRatedTvShow = app.topRatedTvShow;
    const allContent = [...nowPlayingMovies, ...popularMovies, ...upComingMovies, ...topRatedMovies, ...comingSoonTv, ...onTv, ...topRatedTvShow]
    //  filter out duplicates
    const arrFiltered = allContent.filter(
        (obj, index) =>
            allContent.findIndex((item) => item.id === obj.id) === index
    );

    // ************************************************** events 
    // onSubmit handler - search content 
    const search = (e) => {
        e.preventDefault()
    }

    // onChange - show and filter search results based on user input value 
    const onChange = (e) => {

        // update "userInput" state variable - user input
        setUserInput(e.target.value.toLocaleLowerCase())

        //*********  filter app state arrays with user input ************/
        let filteredNowMovies = nowPlayingMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredPopMovies = popularMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredUpComingMovies = upComingMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredTopRatedMovies = topRatedMovies.filter(function (movie) {
            return movie.title.toLocaleLowerCase().includes(userInput)
        })
        let filteredComingSoonTv = comingSoonTv.filter(function (movie) {
            return movie.name.toLocaleLowerCase().includes(userInput)
        })
        let filteredOnTv = onTv.filter(function (movie) {
            return movie.name.toLocaleLowerCase().includes(userInput)
        })
        let filteredTopRatedTv = topRatedTvShow.filter(function (movie) {
            return movie.name.toLocaleLowerCase().includes(userInput)
        })

        // merge all arrays together - this could be your database search
        let allContent = [...filteredNowMovies, ...filteredPopMovies, ...filteredUpComingMovies, ...filteredTopRatedMovies, ...filteredComingSoonTv, ...filteredOnTv, ...filteredTopRatedTv];

        //  filter out duplicates
        const filteredArray = allContent.filter(
            (obj, index) =>
                allContent.findIndex((item) => item.id === obj.id) === index
        );

        // update "showContent" state variable
        setShowFiltered(filteredArray);
    }

    if (userInput) {
        return (
            <section className={styles.searchSection} >
                {/* search input */}
                <form onSubmit={search} onChange={onChange} className={styles.form} >
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
                            arrFiltered.map((movie) =>
                                <li key={n++}>
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