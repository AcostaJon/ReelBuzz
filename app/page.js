'use client'
// react
import React, { useEffect, useState, useRef } from "react";
// context api
import { AppContext } from "./components/context/context";
// components
import Login from "./components/login/login";
import Dash from "./components/dash/dash.js";
import SearchableList from "./components/searchableList/searchablelist.js"
// css
import styles from "./page.module.css";
import Image from "next/image";
import ComingSoonSlideShow from "./components/comingSoonSlideShow/comingSoon";
import SlideShow from "./components/slideShow/slideShow";

export default function App() {
  //***************************************************************** */ state
  // ************************************************ Movies
  // now playing movies - array
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // popular movies - array
  const [popularMovies, setPopularMovies] = useState([]);
  // top rated movies - array
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // upcoming movies - array
  const [upComingMovies, setUpcomingMovies] = useState([]);
  // ************************************************ Tv shows
  // tv shows currently on TV - array
  const [onTv, setOnTv] = useState([])
  // popular tv shows - array
  const [comingSoonTv, setComingSoonTv] = useState([])
  // top rated tv shows - array
  const [topRatedTvShow, setTopRatedTvShow] = useState([]);
  // popular tv shows - array
  const [popularTvShow, setPopularTvShow] = useState([]);
  // ************************************************ Favs
  // Favorite movies and shows - array
  const [favs, setFavs] = useState([]);
  // ************************************************ dashboard navigation 
  // home icon in navigation - boolean
  const [showDashHome, setshowDashHome] = useState(true);
  // movie icon in navigation - boolean
  const [showMoviesdash, setshowMoviesdash] = useState(false);
  // tv icon in navigation - boolean
  const [showTvdash, setshowTvdash] = useState(false);
  // heart icon in navigation - boolean
  const [showFavoritesDashboard, setshowFavoritesDashboard] = useState(false);
  // search icon in navigation - boolean
  const [showSearchDashboard, setshowSearchDashboard] = useState(false);
  // user icon in navigation - boolean
  const [showUserAccountDashboard, setshowUserAccountDashboard] = useState(false);
  // open Movie
  const [showContentDashboard, setshowContentDashboard] = useState(false);
  // is the user logged in?
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  // email - string
  const [email, setEmail] = useState("");
  // user profile picture
  const [profilePicture, setProfilePicture] = useState("user-regular.svg")
  // preview profile pic - string
  const [preview, setPreview] = useState("user-regular.svg");
  // database of  users
  const [mongodata, setMongoData] = useState("worx")
  // movie front data - object
  const [movieFrontData, setMovieFrontData] = useState({});
  // active nav item
  const [activeMenuItem, setActiveMenuItem] = useState(false);
  // 1. Initialize the ref container for menu links
  const linkRefTvShow = useRef(null);
  const linkRefMovies = useRef(null);
  //************************************************************************* */ use effect
  useEffect(() => {
    // ********************  update movie state 
    // now playing movies
    getFetchRequest('api/movies/getNowPlaying')
      .then((data) => {
        setNowPlayingMovies(data.results)
      });
    // popular movies
    getFetchRequest('api/movies/getPopular')
      .then((data) => {
        setPopularMovies(data.results)
      });
    // top rated movies
    getFetchRequest('api/movies/getTopRated')
      .then((promise) => {
        setTopRatedMovies(promise.results)
      });
    // upcoming movies
    getFetchRequest('api/movies/getUpcoming')
      .then((promise) => {
        setUpcomingMovies(promise.results)
      });
    // *******************  update tv show state 
    // update state - "onTv" variable has value of now playing tv show api call
    getFetchRequest('api/tvShows/getNowPlaying')
      .then((promise) => {
        setOnTv(promise.results)
      });
    // update state - "popular" variable has value of popular tv shows api call
    getFetchRequest('api/tvShows/getComingSoonTv')
      .then((promise) => {
        setComingSoonTv(promise.results)
      });
    // update state - "topRated" variable has value of top rated tv show api call
    getFetchRequest('api/tvShows/getTopRated')
      .then((promise) => {
        setTopRatedTvShow(promise.results)
      });
    // updat state - "mongoData" variable has all users from database
    getFetchRequest('api/db/getUsers')
      .then((promise) => {
        setMongoData(promise)
      });
    linkRefTvShow.current.style.textDecoration = "underline"
    linkRefMovies.current.style.color = "gray"
    linkRefTvShow.current.style.color = "white"
  }, [])
  //************************************************************************* * fetch requests
  // log user in request
  const postLogin = async (obj) => {
    // fetch Post request
    const response = await fetch('api/db/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });

    return response.json();

  };
  // create new user request
  const newUser = async (obj) => {
    // fetch Post request
    const response = await fetch('api/db/newUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });

    return response.json();

  };
  // user feedback request
  const postUserFeedback = async (feedback) => {
    // fetch post request
    const response = await fetch('api/db/postUserFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback)
    });

    return response.json();
  };
  // fetch request
  const getFetchRequest = async (url) => {
    const res = await fetch(url, { next: { tags: ['a'] } });
    const promise = res.json()
    return promise
  }
  //************************************************************************* */ event handlers
  //*********************************************** */ Logged out

  // Menu Links 
  // Movies
  const activeMenuItemMovies = (e) => {
    // stop page load
    e.preventDefault()
    // remove underline from "tv show" link
    linkRefTvShow.current.style.textDecoration = "none"
    // change tvshow link color to gray
    linkRefTvShow.current.style.color = "gray"
    // add underline to "movies" link
    linkRefMovies.current.style.textDecoration = "underline"
    // change movie link color to white
    linkRefMovies.current.style.color = "white"
    // update state
    setActiveMenuItem(true);
  }
  // Tv Shows
  const activeMenuItemTvShows = (e) => {
    // stop page load
    e.preventDefault()
    // remove underline to "Movies" link
    linkRefMovies.current.style.textDecoration = "none"
    // change movies link color to gray
    linkRefMovies.current.style.color = "gray"
    // add underline to "tv show" link
    linkRefTvShow.current.style.textDecoration = "underline"
    // change tvshow link color to white
    linkRefTvShow.current.style.color = "white"
    // update state
    setActiveMenuItem(false)
  }

  //******************************************** */ login/logout/new user
  // Login User - handleOnSubmit 
  const logginUser = async (e) => {
    // stop page refresh
    e.preventDefault();
    const modalBackDrop = document.querySelector('.modal-backdrop')
    // get the user email and password
    const emailInput = e.target[0];
    const email = emailInput.value
    const passwordInput = e.target[1]
    const password = passwordInput.value

    // validate user email and password
    const user = await postLogin({ email, password })

    // if status 200, log user in 
    if (user.status == 200) {
      // log user in
      setEmail(email)
      setIsUserLoggedIn(true)
      modalBackDrop.classList.add("d-none");
      //   homeDash()
    } else {
      alert("Invalid email or password");
    }

    // reset inputs
    emailInput.value = "";
    passwordInput.value = "";

  }
  // Logout User offcanvas menu 
  const logout = async () => {

    // if user email exists then do not prompt for feedback and logout
    if (mongodata.some(obj => obj.email === email)) {
      setIsUserLoggedIn(false);
      setEmail("");
      setFavs([]);
      window.location.reload();
    } else {
      // if user email does not exist then get user feedback, store in DB and logout

      // user feedback
      const userFeedback = prompt("Before you go, leave a review")
      
      // user review
      const review = {
        email: email,
        review: userFeedback
      }
      // post user review
      await postUserFeedback(review);
      // logout
      setIsUserLoggedIn(false);
      setEmail("");
      setFavs([]);
      window.location.reload();
    }

  }
  // create new user
  const signUp = async (e) => {
    // stop page refresh
    e.preventDefault();
    // get user email, password, first and last name
    const firstNameInput = e.target[0]
    const firstName = firstNameInput.value
    // last name
    const lastNameInput = e.target[1]
    const lastName = lastNameInput.value
    // email
    const emailInput = e.target[2]
    const email = emailInput.value
    // password
    const passwordInput = e.target[3]
    const password = passwordInput.value


    // validate new user
    const newUser1 = await newUser({ email, password, firstName, lastName });

    // if status 200, log user in 
    if (newUser1.status == 201) {
      // log user in
      setEmail(email)
      setIsUserLoggedIn(true)
      homeDash()
    } else {
      alert(newUser1.status + ", " + newUser1.message)
    }

    // reset inputs
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

  }
  //******************************************* */ User Dashboard Header
  // offcanvas menu account - click
  const showMyAccount = (e) => {
    userAccount();
  }

  //*************************************** */ User Dashboard navigation
  // home navigation onClick
  const homeDash = (e) => {
    // update state - "showDashHome" variable to true to signal main content component 
    setshowDashHome(true)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showSearchDashboard" variable to false to signal main content component 
    setshowSearchDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // movie navigation onClick 
  const movies = (e) => {
    // update state - "showMoviesdash" variable to true to signal main content component 
    setshowMoviesdash(true)
    // update state - "showDashHome" variable to false to signal main content component 
    setshowDashHome(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // update state - "showSearchDashboard" variable to false to signal main content component 
    setshowSearchDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // tvShow navigation onClick 
  const tvShows = (e) => {
    // update state - "nowPlaying" variable value is tv shows on tv
    setOnTv(onTv)
    // update state - "popular" variable value is popular tv shows
    setPopularTvShow(popularTvShow)
    // update state - "topRated" variable value is top rated tv shows
    setTopRatedTvShow(topRatedTvShow)
    // update state - "showTvdash" variable to true to signal main content component 
    setshowTvdash(true)
    // update state - "showDashHome" variable to false to signal main content component 
    setshowDashHome(false)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showSearchDashboard" variable to false to signal main content component 
    setshowSearchDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // heart navigation onClick
  const myLikes = (e) => {
    // update state - "showFavoritesDashboard" variable to true to signal main content component 
    setshowFavoritesDashboard(true)
    // update state - "showDashHome" variable to false to signal main content component 
    setshowDashHome(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // update state - "showSearchDashboard" variable to false to signal main content component 
    setshowSearchDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // search navigation onClick 
  const search = (e) => {
    // update state - "showSearchDashboard" variable to true to signal main content component
    setshowSearchDashboard(true)
    // update state - "showDashHome" variable to false to signal main content component 
    setshowDashHome(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // user navigation onClick
  const userAccount = () => {
    // update state - "showUserAccountDashboard" variable to true to signal main content component 
    setshowUserAccountDashboard(true)
    // update state - "showDashHome" variable to false to signal main content component 
    setshowDashHome(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showSearchDashboard" variable to true to signal main content component
    setshowSearchDashboard(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  //*************************************** */ User Dashboard main content
  // user account - handle OnSubmit 
  const updateUserCred = (e) => {
    e.preventDefault()

    // update state
    setProfilePicture(preview)

    // alert user, credentials updated
    alert("user credentials updated")

    // set default input values
    setPreview("/user-regular.svg")

  }
  // user account - onChange choose profile picture
  const onChangeUserImage = (e) => {
    // select file
    const file = e.target.files[0]

    // file api object reader
    const reader = new FileReader();

    // load file url to preview state variable
    reader.onload = (e) => {
      setPreview(reader.result)
    };

    // read file as url using reader
    reader.readAsDataURL(file);
  }
  // save movies to FAVS
  const saveFavorites = (e, backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id, voteCount) => {
    // stop page from loading
    e.stopPropagation();
    // heart icon from navigation
    const heartIcon = document.getElementById("heart_icon");
    // movie widget 
    const movie = e.target.parentElement.parentElement;

    // if heart icon has a class of grow-shrink, then remove it
    if (heartIcon.getAttribute("class") === "bounce") {
      heartIcon.classList.remove("bounce");
    }

    // movie widget background image
    const movieBG = movie.style.backgroundImage.substr(movie.style.backgroundImage.indexOf('url'), 250)

    // update state - favs array with movie object
    setFavs([...favs, {movieBG,  backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id, voteCount}])

    // if title is returned from user click then alert user
    if (title != undefined) {
      alert(title + " | Saved to Favorites")
    } else {
      alert(name + " | Saved to Favorites")
    }

    // style icon and 
    heartIcon.style.fill = "red"
    // add "grow-shrink" affect to heart icon
    heartIcon.classList.add("bounce");
  }
  // remove saved content
  const removeSavedWidget = (e, title, name, id) => {
    // stop page load
    e.stopPropagation();
    // selected movie/show
    const targetContent = id;
    // remove deleted widget from favs
    setFavs((movies) => {
      return movies.filter((movie) => targetContent != movie.id)
    })
    // alert user "title/name" was removed
    if (title != undefined) {
      alert(title + " | Removed ")
    } else {
      alert(name + " | Removed ")
    }
  }
  // open movie
  const openMovie = (backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id, voteCount) => {
    // update state - "showContentDashboard" variable to true to signal main content component 
    setshowContentDashboard(true)
    // update state - "showUserAccountDashboard" variable to false to signal main content component 
    setshowUserAccountDashboard(false)
    // update state - "showDashHome" boolean to false to signal main content component 
    setshowDashHome(false)
    // update state - "showMoviesdash" variable to false to signal main content component 
    setshowMoviesdash(false)
    // update state - "showTvdash" variable to false to signal main content component 
    setshowTvdash(false)
    // update state - "showFavoritesDashboard" variable to false to signal main content component 
    setshowFavoritesDashboard(false)
    // update state - "showSearchDashboard" variable to true to signal main content component
    setshowSearchDashboard(false)
    // set movie front data
    setMovieFrontData({ backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id, voteCount })
    // scroll to top of page
    window.scrollTo(0, 0);
  }

  // if user is not logged in
  if (!isUserLoggedIn) {
    return (
      <main className={styles.loggedOutMain}>
        <AppContext.Provider value={{ logginUser, signUp, nowPlayingMovies, popularMovies, upComingMovies, topRatedMovies, comingSoonTv, onTv, topRatedTvShow }}>
          {/* header */}
          <header>
            <nav className="navbar py-3 px-3 px-lg-5 bg-black" >
              <div className="d-flex justify-content-between w-100">
                {/* logo */}
                <a className="navbar-brand" href="/"><img src={"logoUpdate.svg"} width={150} alt="reel buzz logo" /></a>
                  {/* nav links (movies and series) display on large devices, hide on mobile */}
                <ul className="navbar-nav d-none d-lg-flex flex-row justify-content-evenly w-100">
                  <li className="nav-item me-lg-0">
                    <a className="nav-link text-white" id="movieMenuItem" href="" ref={linkRefMovies} aria-current="page" onClick={activeMenuItemMovies}>Movies</a>
                  </li>
                  <li className="nav-item mx-4">
                    <a className="nav-link text-white" id="tvShowMenuItem" href="" ref={linkRefTvShow} onClick={activeMenuItemTvShows}>Tv Shows</a>
                  </li>
                  <li className="d-none d-lg-flex">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">SignUp | Login</button>
                  </li>
                </ul>
                {/* search button */}
                <button type="button" className="btn btn-warning" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" >     <span className="navbar-toggler-icon"></span></button>
              </div>
              {/* nav links (movies and series) display on mobile, hide on large devices */}
              <ul className="navbar-nav d-lg-none flex-row col-lg-4 justify-content-evenly w-100">
                <li className="nav-item me-lg-0">
                  <a className="nav-link text-white" id="movieMenuItem" href="" ref={linkRefMovies} aria-current="page" onClick={activeMenuItemMovies}>Movies</a>
                </li>
                <li className="nav-item mx-4">
                  <a className="nav-link text-white" id="tvShowMenuItem" href="" ref={linkRefTvShow} onClick={activeMenuItemTvShows}>Tv Shows</a>
                </li>
                <li className="d-none d-lg-flex">
                  <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">SignUp/Login</button>
                </li>
              </ul>
              {/* offcanvas */}
              <div className="offcanvas offcanvas-start bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                {/* offcanvas header */}
                <div className="offcanvas-header">
                  <button type="button" className="btn-close bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  {/* offcanvas body - buttons (sign up/login) */}
                  <button type="button" className="btn btn-success d-lg-none d-block col-6 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">SignUp | Login</button>
                  <SearchableList />
                </div>
              </div>
            </nav>
          </header>
          {/******************** Jumbotron ********************/}
          <div className="d-lg-flex flex-row-reverse justify-content-evenly ps-4 pe-4  bg-black">
            {/* slide */}
            <div className="col-lg-4 my-lg-4">
              {activeMenuItem ? <SlideShow content={nowPlayingMovies} id={"carousel8"} /> : <SlideShow content={onTv} id={"carousel12"} />}
            </div>
            {/* content */}
            <div className="col-lg-6 d-flex pt-4 pb-5 py-lg-0">
              <div className="w-75 m-auto text-center">
                <h1 className={styles.jumbotronTitle}>Every Preview, One Stage</h1>
                <p className={styles.jumbotronSubHeading}>One Hub for Official Trailers</p>
                <button type="button" className="btn btn-warning px-5 w-75" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Login</button>
              </div>
            </div>
          </div>
          {/****************** * Coming Soon *******************/}
          {activeMenuItem ? <ComingSoonSlideShow content={upComingMovies} id={"carousel8"} /> : <ComingSoonSlideShow content={comingSoonTv} id={"carousel12"} />}
          {/******************** Sign Up ********************/}
          <div className="d-lg-flex px-4 bg-black py-5 justify-content-evenly">
            {/* slide */}
            <div className="col-lg-4">
              {activeMenuItem ? <SlideShow content={topRatedMovies} id={"carousel6"} /> : <SlideShow content={topRatedTvShow} id={"carousel10"} />}
            </div>
            {/* content */}
            <div className="col-lg-6 d-flex ">
              <div className="w-75 m-auto text-center">
                <Image className={styles.signUpLogoImg} src={"logoUpdate.svg"} width={275} height={50} alt="reel buzz logo" />
                <ul className="list-group list-group-flush py-3">
                  <li className="list-group-item bg-dark text-white">Watch official trailers</li>
                  <li className="list-group-item bg-dark text-white">Save your favorites</li>
                  <li className="list-group-item bg-dark text-white">Insightful credits and roles</li>
                  <li className="list-group-item bg-dark text-white">Personalize your user dashboard</li>
                </ul>
                <button type="button" className="btn btn-warning px-5 w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sign Up</button>
              </div>
            </div>
          </div>
          {/******************** Footer ********************/}
          <footer className="p-3 bg-dark text-white">
            <div>
              <p className={`m-0 text-center ${styles.footerP}`}>&copy; 2026 Reel Buzz. All rights reserved </p>
            </div>
          </footer>
          {/******************** Modal ********************/}
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <p className="text-white m-0 fw-semibold" >The Ultimate HUB: Movie and Tv Show Trailers.</p>
                  <button id="modalCloseButton" type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </AppContext.Provider>
      </main >
    )
  } else {
    // if user is logged in 
    return (
      <main className={styles.loggedInMain} style={{ backgroundImage: `-webkit-linear-gradient(rgba(10, 10, 10, 0.9), rgba(5, 5, 5, 0.9)), url("/homepageBG.jpg")`, backgroundSize: "cover" }}>
        <AppContext.Provider value={{
          saveFavorites, removeSavedWidget, openMovie, updateUserCred, onChangeUserImage,
          homeDash, movies, tvShows, myLikes, userAccount, showMyAccount,
          search, logout, favs, movieFrontData, preview, nowPlayingMovies, popularMovies, popularTvShow, comingSoonTv, onTv, topRatedTvShow, upComingMovies, topRatedMovies, email,
          showDashHome, showMoviesdash, showTvdash, showFavoritesDashboard, showSearchDashboard, showUserAccountDashboard, showContentDashboard, profilePicture

        }}>
          {/* user dashboard */}
          <Dash />
        </AppContext.Provider>
      </main >
    )

  }

}


