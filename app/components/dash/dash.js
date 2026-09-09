'use client'
// components
import Header from "../header/header"
import MainContent from "../content/mainContent"
import Navigation from "../nav/navigation"

export default function Dash(props) {
    return (
        <>
            {/* dashboard - 3 components*/}
            <Header />
            <MainContent />
            <Navigation />
        </>
    )
}
