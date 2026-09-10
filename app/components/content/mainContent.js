'use client'
import { useContext } from "react";
// context object (app state)
import { AppContext } from "../context/context";
// components
import Search from "./search/search"
import Favs from "./favs/favs";
import MovieFront from "./movieFront/movieFront"
import Account from "./account/account"
import ShowCase from "@/app/components/showCase/showCase"
import Slide from "../Slide/slide"

export default function MainContent(props) {
    // context object (app state)
    const app = useContext(AppContext)
    // ************************************************** movies and series(arrays)
    // array of now playing movies
    const nowPlayingMovies = app.nowPlayingMovies
    // array of popular movies
    const popularMovies = app.popularMovies
    // array of top rated movies
    const topRatedMovies = app.topRatedMovies
    // array of upcoming movies 
    const upComingMovies = app.upComingMovies;
    // array of shows currently on tv
    const onTv = app.onTv;
    // array of popular tv show
    const comingSoonTv = app.comingSoonTv;
    //array of top rated tv shows
    const topRatedTvShows = app.topRatedTvShow;
    // ************************************************** dashboard navigation selection (booleans)
    const showHomeDashboard = app.showDashHome;
    const showMoviesDashboard = app.showMoviesdash;
    const showTvDashboard = app.showTvdash
    const showFavoritesDashboard = app.showFavoritesDashboard
    const showSearchDashboard = app.showSearchDashboard
    const showAccountDashboard = app.showUserAccountDashboard;
    const showContentDashboard = app.showContentDashboard
    
    // ************************************************** render
    switch (true) {
        case showHomeDashboard:
            // home 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase movies={popularMovies} tvShows={onTv} />
                        <Slide data={onTv} slideTitle={"Series On Tv"} />
                        <Slide data={nowPlayingMovies} slideTitle={"Movies In Theaters"}/>
                        <Slide data={comingSoonTv} slideTitle={"Series Coming Soon"} />
                        <Slide data={popularMovies} slideTitle={"Popular Movies"} />
                    </div>
                </section>
            );
        case showMoviesDashboard:
            // movies 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase movies={popularMovies} />
                        <Slide data={nowPlayingMovies} slideTitle={"In Theaters"} />
                        <Slide data={upComingMovies} slideTitle={"Coming Soon"} />
                        <Slide data={popularMovies} slideTitle={"Most Popular"} />
                        <Slide data={topRatedMovies} slideTitle={"Top Rated"} />
                    </div>
                </section>
            );
        case showTvDashboard:
            // tv shows 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase tvShows={comingSoonTv} />
                        <Slide data={onTv} slideTitle={"On Tv"} />
                        <Slide data={topRatedTvShows} slideTitle={"Top Rated"} />
                        <Slide data={comingSoonTv} slideTitle={"Coming Soon"} />
                    </div>
                </section>
            );
        case showFavoritesDashboard:
            // favorites
            return (
                <Favs />
            );
        case  showSearchDashboard:
            // search
            return (
                <Search />
            )
        case showAccountDashboard:
            // user account
            return (
                <Account />
            )
        case showContentDashboard:
            // movie or tv show front page
            return (
                <MovieFront />
            )

    }
}



