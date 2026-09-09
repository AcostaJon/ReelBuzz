'use client'
// react
import { useContext, useState } from "react"
// context api
import { AppContext } from "../context/context";
// css
import styles from "./login.module.css"

export default function Login() {
    // ******************************************************** state
    const [signUpLogin, setSignUpLogin] = useState(true);

    // context object (app data)
    const app = useContext(AppContext);

    // ******************************************************** events
    // login submission
    const logginUser = (e) => {
        app.logginUser(e)
    }

    // sign up submission
    const signUpUser = (e) => {
        app.signUp(e)
    }

    // toggle between forms
    const toggleForm = () => {
        if (signUpLogin == true) {
            setSignUpLogin(false)
        } else {
            setSignUpLogin(true)
        }
    }

    if (signUpLogin) {
        return (
            <div className={styles.loginContainer}>
                {/* form */}
                <form onSubmit={logginUser}>
                    <h4>Log In</h4>
                    <input className={styles.emailInput} id="email" type="email" placeholder="email" required />
                    <input className={styles.passwordInput} id="pasword" type="password" placeholder="password"  required/>
                    <div className={styles.checkboxpasswordContainer}>
                        <a href="./forgotPassword">Forgot Password</a>
                    </div>
                    <button >Login</button>
                    <p>Or</p>
                    <button onClick={toggleForm}>Sign Up</button>
                </form>
            </div>
        )

    } else if (signUpLogin == false) {
        return (
            <div className={styles.loginContainer}>
                {/* form */}
                <form onSubmit={signUpUser}>
                    <h4>Sign Up</h4>
                    <input className={styles.emailInput} id="firstName" type="text" placeholder="First Name" required />
                    <input className={styles.passwordInput} id="lastName" type="text" placeholder="Last Name" />
                    <input className={styles.emailInput} id="email" type="email" placeholder="Email" required />
                    <input className={styles.passwordInput} id="pasword" type="password" placeholder="Password" required/>
                    <div className={styles.checkboxpasswordContainer}>
                        <a href="./forgotPassword">Forgot Password</a>
                    </div>
                    <button>Sign Up</button>
                    <p>Or</p>
                    <button onClick={toggleForm} >Login</button>
                </form>
            </div>
        )
    }

}


