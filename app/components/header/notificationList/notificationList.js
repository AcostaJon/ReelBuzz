'use client'
// react
import Image from "next/image";
// images
import Bell from "@/public/bell-regular.svg"
// css
import styles from "./notificationList.module.css"

export default function ListOfNotifications() {
  //************************************************** */ events
  return (
    <div className={styles.ListOfNotifications} >

      {/* header */}
      <div className={styles.header}>
        <p>Notifications</p>
      </div>

      {/* body */}
      <div className={styles.body}>
        <Image src={Bell} alt="notification icon of a bell"/>
        <h4>Your notifications live Here</h4>
      </div>

    </div>
  )
}