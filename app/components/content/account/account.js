'use client'
// react
import Image from "next/image"
import { useContext } from "react"
// context api
import { AppContext } from "../../context/context"
// css
import styles from "./account.module.css"

export default function Account() {

    // context object (app data)
    const app = useContext(AppContext)

    return (
        <section className={styles.userSection}>
            {/* form */}
            <form onSubmit={app.updateUserCred} >
                {/* name and email container */}
                <div className={styles.nameEmailContainer}>
                </div>
                {/* image container*/}
                <div className={styles.imageContainer}>
                    {/* image */}
                    <label>Profile Picture</label>
                    <div>
                        <Image src={app.preview} width={"35"} height={"35"} alt="preview image" />
                        <input type="file" id="file" name="image" onChange={app.onChangeUserImage} />
                    </div>
                    <input className={styles.submitButton} type="submit" value="Update" />
                </div>
                {/* payment container */}
                <div className={styles.paymentContainer}>
                    {/* payment method */}
                    <div>
                        <label>Subscription</label>
                        <input type="button" value="Current Subscription: Free" />
                    </div>
                </div>
            </form>
        </section>
    )
}