'use client'
// components
import Header from "../header/header"
import MainContent from "../content/mainContent"
import Navigation from "../nav/navigation"

export default function Dash(props) {
    return (
        <>
            {/* dashboard consists of 3 parent level components, passed in props (data) */}
            <Header userName={props.header.username} email={props.header.email} profilePicture={props.header.profilePicture} components={[props.header.showNotificationList, props.header.offCanvasMenu]} />
            <MainContent navSelection={[props.content.homeClicked, props.content.movieClicked, props.content.tvShowClicked, props.content.heartClicked, props.content.searchClicked, props.content.userClicked, props.content.openMovieClicked]}
                playing={[props.content.nowPlayingMovies, props.content.popularMovies, props.content.topRatedMovies, props.content.upcomingMovies, props.content.onTv, props.content.popularTvShow, props.content.topRatedTvShow]} />
            <Navigation />
        </>
    )
}