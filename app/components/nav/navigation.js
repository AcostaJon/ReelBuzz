'use client'
// react
import { useState, useContext } from "react"
// context api
import { AppContext } from "../context/context";
// css
import styles from "./navigation.module.css"

export default function Navigation() {
    //**************************************************************** */ state
    const [homeColor, setHomeColor] = useState("#FFFFFF");
    const [movieColor, setMovieColor] = useState("#808080");
    const [tvShowColor, setTvShowColor] = useState("#808080");
    const [heartColor, setHeartColor] = useState("#808080");
    const [searchColor, setSearchColor] = useState("#808080");
    const [userColor, setUserColor] = useState("#808080");

    // context object
    const app = useContext(AppContext)

    //**************************************************************** */ events
    // home icon clicked. return event up to parent component
    const showHomeDash = (e) => {
        // updrill event to parent component
        app.homeDash(e)
        // apply active style
        setHomeColor("#FFFFFF")
        // gray out other icons active styles
        setMovieColor("#808080")
        setTvShowColor("#808080")
        setHeartColor("#808080")
        setSearchColor("#808080")
        setUserColor("#808080")
    }
    // movie icon clicked. return event up to parent component
    const showMovies = (e) => {
        // updrill event to parent component
        app.movies(e)
        // apply active style
        setMovieColor("#FFFFFF")
        // gray out other icons active styles
        setHomeColor("#808080")
        setTvShowColor("#808080")
        setHeartColor("#808080")
        setSearchColor("#808080")
        setUserColor("#808080")
    }
    // tv show icon clicked. return event up to parent component
    const showTvShows = (e) => {
        // updrill event to parent component
        app.tvShows(e)
        // apply active style
        setTvShowColor("#FFFFFF")
        // gray out other icons active styles
        setHomeColor("#808080")
        setMovieColor("#808080")
        setHeartColor("#808080")
        setSearchColor("#808080")
        setUserColor("#808080")
    }
    // heart icon clicked. return event up to parent component
    const showMyLikes = (e) => {
        // updrill event to parent component
        app.myLikes(e)
        // apply active style
        setHeartColor("#FFFFFF")
        // gray out other icons active styles
        setHomeColor("#808080")
        setSearchColor("#808080")
        setUserColor("#808080")
        setMovieColor("#808080")
        setTvShowColor("#808080")
    }
    // search icon clicked. return event up to parent component
    const showSearch = (e) => {
        // updrill event to parent component
        app.search(e)
        // apply active style
        setSearchColor("#FFFFFF")
        // gray out other icons active styles
        setHomeColor("#808080")
        setMovieColor("#808080")
        setTvShowColor("#808080")
        setUserColor("#808080")
        setHeartColor("#808080")
    }
    // user icon clicked. return event up to parent component
    const showUserAccount = (e) => {
        // updrill event to parent component
        app.userAccount(e)
        // apply active style
        setUserColor("#FFFFFF")
        // gray out other icons active styles
        setHomeColor("#808080")
        setSearchColor("#808080")
        setHeartColor("#808080")
        setMovieColor("#808080")
        setTvShowColor("#808080")
    }

    return (
        <nav className={styles.nav}>
            {/* container */}
            <div>
                {/* list */}
                <ul>
                    {/* home */}
                    <li onClick={showHomeDash}>
                        <svg style={{ fill: homeColor }} xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 
                    8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 
                    80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 
                    64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm224 64c6.7 0 13 2.8 17.6 7.7l104 
                    112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4l-208 0c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9
                     4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z" /></svg><p style={{ color: homeColor }}>
                            HOME</p></li>

                    {/* movies */}
                    <li onClick={showMovies}><svg style={{ fill: movieColor }} xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 
                    0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 
                    7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 
                    8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 
                    0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 
                    16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 
                    16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 
                    0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 
                    32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" /></svg><p style={{ color: movieColor }} >MOVIES</p></li>

                    {/* tv show */}
                    <li onClick={showTvShows}><svg style={{ fill: tvShowColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640
                     512"><path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3
                      0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
                        <p style={{ color: tvShowColor }} >TV</p></li>

                    {/* heart */}
                    <li onClick={showMyLikes}><svg id="heart_icon" style={{ fill: heartColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 
                    0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 
                    47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 
                    84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg><p
                            style={{ color: heartColor }} >FAVS</p></li>

                    {/* search */}
                    <li onClick={showSearch}><svg style={{ fill: searchColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 
                        25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 
                        0 288z" /></svg><p style={{ color: searchColor }} >SEARCH</p></li>

                    {/* user */}
                    <li className={styles.userIcon} id="userIcon" onClick={showUserAccount}  >
                        <svg style={{ fill: userColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                        <p style={{ color: userColor }}>ACCOUNT</p></li>
                </ul>
            </div>
        </nav>
    )
}