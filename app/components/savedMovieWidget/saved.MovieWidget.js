'use client'
// react
import { useContext } from 'react';
// context api
import { AppContext } from '@/app/components/context/context'
// css
import styles from "./savedMovieWidget.module.css"

export default function SavedMovieWidget(props) {
    // context object (app data)
    const app = useContext(AppContext)
    // background image
    const bg = props.backgroundImg;
    // ****************************************************************** events
    // handle close
    const handleRemove = (e) => {
        app.removeSavedWidget(e, props.title, props.name, props.id)
    }

    // // handle open
    const handleOpenMovie = () => {
        app.openMovie(props.backgroundImg, props.title, props.name, props.releaseDate, props.firstAir, props.rating, props.description, props.adult, props.id, props.voteCount)
    }
    
    return (
        <div className={styles.SavedMovieDiv} style={{ backgroundImage: bg }} onClick={handleOpenMovie}>
            {/* saved movie box */}
            <div onClick={handleRemove}>
                <p>x</p>
            </div>
        </div>
    )
}

