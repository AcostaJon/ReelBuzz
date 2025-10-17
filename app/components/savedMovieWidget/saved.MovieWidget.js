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
    const handleRemove = (e) => {
        app.removeSavedWidget(e, props.title, props.name)
    }

    return (
        <div className={styles.SavedMovieDiv} style={{ backgroundImage: bg }}>
            {/* saved movie box */}
            <div onClick={handleRemove}>
                <p>x</p>
            </div>
        </div>
    )
}

