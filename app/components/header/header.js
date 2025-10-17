'use client'
// react 
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
// context api
import { AppContext } from '../context/context'
// css
import styles from './header.module.css'

export default function Header(props) {

    // context object
    const app = useContext(AppContext)

    // ******************************************************************* events
    // notification/bell icon handler
    const notificationBell = (e) => {
        app.notificationIcon(e)
    }
    // hamburger icon handler
    const hamburgerMenu = (e) => {
        app.hamburgerIcon(e)
    }

    // logout handler
    const logout = (e) => {
        app.logout(e)
    }

    return (
        // header
        <header id='header' className={styles.header} >
            {/* container */}
            <div className={styles.headerContainer}>
                {/* image, username */}
                <div className={styles.leftSide}>
                    <Image src={props.profilePicture} title="profile picture" width={"50"} height={"50"} alt='user image' priority="true" />
                    <div>
                        <h3>{props.userName}</h3>
                        <h1>{props.email}</h1>
                    </div>
                </div>
                {/* notifications, hamburger */}
                <div className={styles.rightSide}>
                    {/* notification bell icon */}
                    <svg id='notificationIcon' title="alerts" onClick={notificationBell} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>
                    {props.components[0]}
                    <button onClick={logout} type='button'>Logout</button>
                    {/* hamburger icon */}
                    <svg onClick={hamburgerMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    {props.components[1]}
                </div>
            </div>
        </header>
    )
}