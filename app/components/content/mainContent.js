'use client'
// components
import NowPlaying from "../movies/nowPlaying/nowPlaying"
import Popular from "../movies/popular/popular"
import TopRated from "../movies/topRated/topRated"
import Search from "./search/search"
import UpComing from "../movies/upComing/upComing"
import Favs from "./favs/favs";
import MovieFront from "./movieFront/movieFront"
import Account from "./account/account"
import ShowCase from "@/app/components/showCase/showCase"

export default function MainContent(props) {
    // ************************************************** variables
    // array of now playing movies
    const nowPlayingMovies = props.playing[0]
    // array of popular movies
    const popularMovies = props.playing[1]
    // array of top rated movies
    const topRatedMovies = props.playing[2]
    // array of upcoming movies 
    const upComingMovies = props.playing[3]
    // array of shows currently on tv
    const onTv = props.playing[4]
    // array of popular tv show
    const popularTvShows = props.playing[5]
    //array of top rated tv shows
    const topRatedTvShows = props.playing[6]
    // ************************************************** render
    switch (true) {
        case props.navSelection[0]:
            // home 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase movies={popularMovies} tvShows={onTv}/>
                        <NowPlaying isTvShow={true} movies={onTv} />
                        <NowPlaying movies={nowPlayingMovies} />
                        <Popular isTvShow={true} movies={popularTvShows} />
                        <Popular movies={popularMovies} />
                    </div>
                </section>
            );
        case props.navSelection[1]:
            // movies 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase movies={popularMovies} />
                        <NowPlaying movies={nowPlayingMovies} />
                        <UpComing movies={upComingMovies} />
                        <Popular movies={popularMovies} />
                        <TopRated movies={topRatedMovies} />
                    </div>
                </section>
            );
        case props.navSelection[2]:
            // tv shows 
            return (
                <section>
                    {/* container */}
                    <div>
                        <ShowCase tvShows={popularTvShows}  />
                        <NowPlaying isTvShow={true} movies={onTv} />
                        <TopRated isTvShow={true} movies={topRatedTvShows} />
                        <Popular isTvShow={true} movies={popularTvShows} />
                    </div>
                </section>
            );
        case props.navSelection[3]:
            // favorites
            return (
                <Favs />
            );
        case props.navSelection[4]:
            // search
            return (
                <Search />
            )
        case props.navSelection[5]:
            // user account
            return (
                <Account />
            )
        case props.navSelection[6]:
            // movie or tv show front page
            return (
                <MovieFront />
            )

    }
}



