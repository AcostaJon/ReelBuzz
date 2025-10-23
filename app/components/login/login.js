'use client'
// react
import { useContext, useState } from "react"
// context api
import { AppContext } from "../context/context";
// css
import styles from "./login.module.css"

export default function Login() {

    // context object (app data)
    const app = useContext(AppContext);

    // ******************************************************** events
    // Sign In form submit
    const logginUser = (e) => {
        app.logginUser(e)
    }

    return (
        <div className={styles.loginContainer}>
            {/* heading */}
            <h1>Watch the Latest Trailers Instantly</h1>
            <p>Explore the newest TV shows and movie trailers from around the world — all in one cinematic hub.</p>
            <h2>create account by signing in &darr;</h2>
            {/* form */}
            <form onSubmit={logginUser}>
                <input id="email" type="email" placeholder="email" required />
                <button>ENTER</button>
            </form>
        </div>

    )

}


