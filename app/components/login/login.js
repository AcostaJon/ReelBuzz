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
            <h4>create free account &darr;</h4>
            {/* form */}
            <form onSubmit={logginUser}>
                <input id="email" type="email" placeholder="Email" required />
                <button>SIGN IN</button>
            </form>
        </div>

    )

}


