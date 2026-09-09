// user dashboard header
'use client'
// react 
import Image from 'next/image'
import { useContext } from 'react'
// context api
import { AppContext } from '../context/context'
// css
import styles from './header.module.css'
import logo from "@/public/reelBuzzLogo.svg"

export default function Header() {

    // context object
    const app = useContext(AppContext)

    // profile picture
    const profilePic = app.profilePicture;

    // ******************************************************************* events
    // logout handler
    const logout = (e) => {
        app.logout(e)
    }

    // user Acoount
    const userAccount = (e) => {
        app.showMyAccount(e)
    }

    return (
        // header
        <header className='w-100 fixed-top'>
            <nav class="navbar navbar-dark bg-dark ">
                <div class="container-fluid px-3 ">
                    {/* nav brand */}
                    <div className='d-flex flex-grow-1 align-items-center'>
                        <Image src={profilePic} title="profile picture" width={"40"} height={"40"} alt='user image' priority="true" />
                        <div>
                            <h2 className='mb-0 ms-2'>{app.email.slice(0, app.email.indexOf("@"))}</h2>
                        </div>
                    </div>
                    {/* notification bell */}
                    <div class="dropdown me-4">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {/* notification bell */}
                            <svg id='notificationIcon' title="alerts" width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    {/* logout button */}
                    <button className='d-none d-lg-block btn btn-danger' onClick={logout} type='button'>Logout</button>
                    {/* toggle button for mobile */}
                    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* offcanvas menu */}
                    <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <Image src={logo} width={90} height={100} alt="reel buzz logo" />
                            <button type="button" class="btn-close bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <button className='p-3 mb-2 btn btn-warning border border-top-0' onClick={userAccount}>Account</button>
                                <button className='p-3 mb-2 btn btn-warning border border-top-0' onClick={logout} type='button'>Logout</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}