'use client'
// react
import React, { useEffect, useState } from "react";
// context api
import { AppContext } from "./components/context/context";
// components
import ListOfNotifications from "./components/header/notificationList/notificationList";
import OffCanvasMenu from "./components/header/offCanvasMenu/offCanvasMenu";
import Login from "./components/login/login";
import Dash from "./components/dash/dash.js";
// css
import styles from "./page.module.css";
import Image from "next/image";

export default function App() {
  //***************************************************************** */ state
  // now playing movies - array
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // popular movies - array
  const [popularMovies, setPopularMovies] = useState([]);
  // top rated movies - array
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // upcoming movies - array
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  // tv shows currently on TV - array
  const [onTv, setOnTv] = useState([])
  // popular tv shows - array
  const [popularTvShow, setPopularTvShow] = useState([])
  // top rated tv shows - array
  const [topRatedTvShow, setTopRatedTvShow] = useState([]);
  // Favorite movies and shows - array
  const [favs, setFavs] = useState([]);
  // home icon in navigation - boolean
  const [homeClicked, setHomeClicked] = useState(true);
  // movie icon in navigation - boolean
  const [movieClicked, setMovieClicked] = useState(false);
  // tv icon in navigation - boolean
  const [tvShowClicked, setTvShowClicked] = useState(false);
  // heart icon in navigation - boolean
  const [heartClicked, setHeartClicked] = useState(false);
  // search icon in navigation - boolean
  const [searchClicked, setSearchClicked] = useState(false);
  // user icon in navigation - boolean
  const [userClicked, setUserClicked] = useState(false);
  // open Movie
  const [openMovieClicked, setOpenMovieClicked] = useState(false);
  // is the user logged in?
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  // notification list - component
  const [showNotificationList, setNotificationList] = useState(null);
  // Off canvas menu - component
  const [offCanvasMenu, setOffCanvasMenu] = useState(null);
  // username - string
  const [username, setUsername] = useState("Guest");
  // email - string
  const [email, setEmail] = useState("");
  // user profile picture
  const [profilePicture, setProfilePicture] = useState("reelBuzzLogo.svg")
  // preview profile pic - string
  const [preview, setPreview] = useState("user-regular.svg");
  // database of  users
  const [mongodata, setMongoData] = useState("worx")
  // movie front data - object
  const [movieFrontData, setMovieFrontData] = useState({});

  //************************************************************************* */ use effect
  useEffect(() => {
    // ********************  update movie state 
    // now playing movies
    getFetchRequest('api/movies/getNowPlaying')
      .then((data) => {
        setNowPlayingMovies(data.results)
      })
    // popular movies
    getFetchRequest('api/movies/getPopular')
      .then((data) => {
        setPopularMovies(data.results)
      })
    // top rated movies
    getFetchRequest('api/movies/getTopRated')
      .then((promise) => {
        setTopRatedMovies(promise.results)
      })
    // upcoming movies
    getFetchRequest('api/movies/getUpcoming')
      .then((promise) => {
        setUpcomingMovies(promise.results)
      })
    // *******************  update tv show state 
    // update state - "onTv" variable has value of now playing tv show api call
    getFetchRequest('api/tvShows/getNowPlaying')
      .then((promise) => {
        setOnTv(promise.results)
      })
    // update state - "popular" variable has value of popular tv shows api call
    getFetchRequest('api/tvShows/getPopular')
      .then((promise) => {
        setPopularTvShow(promise.results)
      })
    // update state - "topRated" variable has value of top rated tv show api call
    getFetchRequest('api/tvShows/getTopRated')
      .then((promise) => {
        setTopRatedTvShow(promise.results)
      })
    // get all users, update mongodata state
    getFetchRequest('api/db/getUsers')
      .then((data) => {
        setMongoData(data)
      })
  }, [])
  //************************************************************************* * fetch requests
  // post new user to mongo database
  const postUser = async (obj) => {
    // fetch post request
      const response = await fetch('api/db/postUsers', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });

     await response.json();

  };
  // post user feedback to mongo database
  const postUserFeedback = async (feedback) => {
    // fetch post request
    const response = await fetch('api/db/postUserFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback)
    });

   await response.json();
  };
  // get fetch request
  const getFetchRequest = async (url) => {
    const res = await fetch(url,{ cache: 'no-store' })
    const promise = res.json()
    return promise
  }
  //************************************************************************* */ event handlers
  //*********************************************** */ login/logout
  // Login User - handleOnSubmit 
  const logginUser = async (e) => {
    // stop page refresh
    e.preventDefault();

    // get user email input value
    const email = e.target[0].value

    // if user exists log them in, else create and post user then log in
    if (mongodata.some(obj => obj.email === email)) {

      // log user in
      setEmail(email)
      setIsUserLoggedIn(true)
      homeDash()

    } else {

      // if user does not exist
      // create user object
      const user = {
        email: email
      }

      // post user object into database
      await postUser(user)

      // log user in
      setEmail(email)
      setIsUserLoggedIn(true)
      homeDash()
    }

  }
  // offcanvas menu logout - click
  const logout = async () => {

    // if user email exists then do not prompt for feedback and logout
    if (mongodata.some(obj => obj.email === email)) {

      setIsUserLoggedIn(false)
      setEmail("")
      setFavs([])

    } else {
      // if user email does not exist then get user feedback, post and logout

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
  //*********************************************** */ header
  // notification bell icon - click
  const notificationIcon = (e) => {
    // update state variable "showList" with component <ListOfNotificaitons />
    setNotificationList(<ListOfNotifications />)
    // add/remove list when icon is clicked
    if (showNotificationList !== null) {
      setNotificationList(null)
    }
  }
  // hamburger icon - click
  const hamburgerIcon = (e) => {
    setOffCanvasMenu(<OffCanvasMenu showMyAccount={showMyAccount} logout={logout} />)
  }
  //  offcanvas menu close - click
  const closeMenu = () => {
    setOffCanvasMenu(null)
  }
  // offcanvas menu account - click
  const showMyAccount = (e) => {
    userAccount();
    setOffCanvasMenu(null)
  }

  //*********************************************** */ navigation
  // home navigation onClicked  
  const homeDash = (e) => {
    // update state - "homeClicked" variable to true to signal main content component 
    setHomeClicked(true)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "tvSHowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "searchClicked" variable to false to signal main content component 
    setSearchClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // movie navigation onClicked 
  const movies = (e) => {
    // update state - "movieClicked" variable to true to signal main content component 
    setMovieClicked(true)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "tvSHowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // update state - "searchClicked" variable to false to signal main content component 
    setSearchClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // tvShow navigation onClicked  
  const tvShows = (e) => {
    // update state - "nowPlaying" variable value is tv shows on tv
    setOnTv(onTv)
    // update state - "popular" variable value is popular tv shows
    setPopularTvShow(popularTvShow)
    // update state - "topRated" variable value is top rated tv shows
    setTopRatedTvShow(topRatedTvShow)
    // update state - "tvSHowClicked" variable to true to signal main content component 
    setTvShowClicked(true)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "searchClicked" variable to false to signal main content component 
    setSearchClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // heart navigation onClicked 
  const myLikes = (e) => {
    // update state - "heartClicked" variable to true to signal main content component 
    setHeartClicked(true)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "tvShowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // update state - "searchClicked" variable to false to signal main content component 
    setSearchClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // search navigation onClicked  
  const search = (e) => {
    // update state - "searchClicked" variable to true to signal main content component
    setSearchClicked(true)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "tvSHowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  // user navigation onClicked  
  const userAccount = (e) => {
    // update state - "userClicked" variable to true to signal main content component 
    setUserClicked(true)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "tvShowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "searchClicked" variable to true to signal main content component
    setSearchClicked(false)
    // scroll to top of page
    window.scrollTo(0, 0);
  }
  //********************************************** */ main content
  // user account - handleOnSubmit 
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
  const saveFavorites = (e, title, name) => {
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
    setFavs([...favs, { movieBG, title, name }])

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
  // remove saved movie widget
  const removeSavedWidget = (e, title, name) => {
    const remove = e.target.parentElement.parentElement;
    const removeBG = remove.style.backgroundImage.substr(remove.style.backgroundImage.indexOf('url'), 250)
    // remove deleted widget from favs
    setFavs((movies) => {
      return movies.filter((movie) => removeBG != movie.movieBG)
    })
    // if title is returned alert user
    if (title != undefined) {
      alert(title + " | Removed ")
    } else {
      alert(name + " | Removed ")
    }
  }
  // open movie
  const openMovie = (backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id) => {
    // update state - "openMovieClicked" variable to true to signal main content component 
    setOpenMovieClicked(true)
    // update state - "userClicked" variable to false to signal main content component 
    setUserClicked(false)
    // update state - "homeClicked" variable to false to signal main content component 
    setHomeClicked(false)
    // update state - "movieClicked" variable to false to signal main content component 
    setMovieClicked(false)
    // update state - "tvShowClicked" variable to false to signal main content component 
    setTvShowClicked(false)
    // update state - "heartClicked" variable to false to signal main content component 
    setHeartClicked(false)
    // update state - "searchClicked" variable to true to signal main content component
    setSearchClicked(false)
    // set movie front data
    setMovieFrontData({ backgroundImg, title, name, releaseDate, firstAir, rating, description, adult, id })
    // scroll to top of page
    window.scrollTo(0, 0);
  }

  if (!isUserLoggedIn) {
    // if user is not logged in return
    return (
      <main className={styles.loggedOutMain} style={{ backgroundImage: `-webkit-linear-gradient(rgba(0, 0, 0, 0.9), rgba(10, 10, 10, 0.3)), url("/homepageBG.jpg")`, backgroundSize: "cover" }}>
        <AppContext.Provider value={{ logginUser }}>
          <nav>
            <div>
              <Image src={"reelBuzzLogo.svg"} width={90} height={100} alt="reel buzz logo" />
            </div>
          </nav>
          <Login />
        </AppContext.Provider>
      </main >
    )

  } else {
    // if user is logged in return
    return (

      <main className={styles.loggedInMain} style={{ backgroundImage: `-webkit-linear-gradient(rgba(10, 10, 10, 0.9), rgba(5, 5, 5, 0.9)), url("/homepageBG.jpg")`, backgroundSize: "cover" }}>
        <AppContext.Provider value={{
          saveFavorites, removeSavedWidget, openMovie, updateUserCred, onChangeUserImage,
          notificationIcon, hamburgerIcon, homeDash, movies, tvShows, myLikes, userAccount, closeMenu,
          search, logout, favs, movieFrontData, preview, nowPlayingMovies, popularMovies, popularTvShow, onTv,
        }}>
          <Dash
            header={{ username, email, profilePicture, showNotificationList, offCanvasMenu }}
            content={{ homeClicked, movieClicked, tvShowClicked, heartClicked, searchClicked, userClicked, openMovieClicked, nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, onTv, popularTvShow, topRatedTvShow }}
          />
        </AppContext.Provider>
      </main >
    )

  }

}
