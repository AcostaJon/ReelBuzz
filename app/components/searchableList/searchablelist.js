'use client'
// react
import { useContext, useState } from "react"
// context api
import { AppContext } from "../context/context";
import styles from "./styles.module.css"

// like Button Component
function LikeButton() {
    return (
        <button type="button" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
        </button>
    )
}

// video Component
function Video(data) {
    return (
        <div className="d-flex align-items-center">
            <img src={"https://image.tmdb.org/t/p/original/" + data.image} height={150} alt="..." />
            <div className="mx-2">
                {data.title ? <h3 className={styles.videoH3}>{data.title}</h3> : <h3 className={styles.videoH3}>{data.name}</h3>}
                {data.title ? <h3 className={styles.videoH3}>Movie</h3> : <h3 className={styles.videoH3}>Tv</h3>}
                <p className={styles.videoP}>{data.overview.slice(0, 100) + "..."}</p>
            </div>
            <LikeButton />
        </div>
    )
}

// Searchable List Component
export default function SearchableList({ videos }) {
    // ************************************************** state
    const [userInput, setUserInput] = useState('');
    const [showContent, setShowContent] = useState([]);
    // variable with value of zero
    let n = 0
    // ************************************************** context data
    // context object (app state)
    const app = useContext(AppContext)
    const nowPlayingMovies = app.nowPlayingMovies;
    const popularMovies = app.popularMovies;
    const upComingMovies = app.upComingMovies;
    const topRatedMovies = app.topRatedMovies;
    const comingSoonTv = app.comingSoonTv;
    const onTv = app.onTv;
    const topRatedTvShow = app.topRatedTvShow;
    // ************************************************** events 
    // onSubmit handler
    const search = (e) => {
        e.preventDefault()
        // get user input
        let userInput = e.target[0].value
        // store in state
        setUserInput(userInput.toLocaleLowerCase())
    }

    // onChange handler
    function inputChange(e) {
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
        let allArray = [...filteredNowMovies, ...filteredPopMovies, ...filteredUpComingMovies, ...filteredTopRatedMovies, ...filteredComingSoonTv, ...filteredOnTv, ...filteredTopRatedTv];

        //  filter out duplicates
        const allMoviesShows = allArray.filter(
            (obj, index) =>
                allArray.findIndex((item) => item.id === obj.id) === index
        );

        // update "showContent" state variable
        setShowContent(allMoviesShows);
    }

    if (userInput) {
        return (
            <>
                {/*search form*/}
                <ul className="mb-lg-0 justify-content-end">
                    <form className="d-flex" role="search" onSubmit={search} onChange={inputChange}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </ul>
                {/*list */}
                <section>
                    {/* show all movies and shows */}
                    <div>
                        <ul className="ps-0 list-group">
                            {
                                showContent.map((obj) =>
                                    <li key={n++} className="list-group-item mb-3 rounded" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <Video title={obj.title} name={obj.name} overview={obj.overview} image={obj.poster_path} />
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                {/*search form*/}
                <ul className="mb-lg-0 justify-content-end">
                    <form className="d-flex" role="search" onSubmit={search} onChange={inputChange}>
                        <input className="form-control me-2" type="search" placeholder="Movie or Series Title" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </ul>
                {/*list */}
                <section>
                    {/* show all movies and shows */}
                    <div>
                        <img src="offCanvasSearchimg.png"  className="img-fluid mt-4" />
                    </div>
                </section>
            </>
        );
    }
}