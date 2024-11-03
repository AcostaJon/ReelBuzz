'use client'
// react
import { AppContext } from "../../context/context";
import { useContext } from "react";
import Image from "next/image";
// css
import styles from "./offCanvasMenu.module.css";
// images
import logo from "@/public/reelBuzzLogo.svg"


export default function OffCanvasMenu(props) {

  // context object (app data)
  const app = useContext(AppContext);

  // *********************************************************** events
  // close button - close menu
  const closeMenu = (e) => {
    app.closeMenu(e)
  }

  // account selection - show account in main content
  const handleAccount = (e) => {
    props.showMyAccount(e)
  }

  // logout handler
  const logout = (e) => {
    props.logout()
  }

  return (
    <div className={styles.OffCanvasMenu} id="offCanvasMenu" >
      {/* container */}
      <div className={styles.Container}>
        {/* logo */}
        <Image src={logo} width={90} height={100} alt="reel buzz logo" />
        {/* close button */}
        <span onClick={closeMenu} className={styles.closeButton}>x</span>
      </div>
      {/* menu items */}
      <ul>
        <li onClick={handleAccount}>Account</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  )
}