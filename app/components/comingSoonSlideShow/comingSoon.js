'use client'
import styles from "./comingSoon.module.css"

export default function ComingSoon(props) {
    const content = props.content
    let n = 0
    return (
        <div className="bg-dark py-3">
            {/* title */}
            <div className="ps-3">
                <h2>Coming Soon</h2>
            </div>
            {/* list */}
            <ul className="overflow-x-scroll overflow-y-hidden list-group list-group-horizontal my-5">
                {
                    content.map((movie) => (
                        // list item
                        <li className={`list-group-item d-flex align-items-end px-5 me-3 rounded-4  ${styles.li}`} key={n++} style={{ backgroundImage: `-webkit-linear-gradient(rgba(29, 29, 29, 0.5), rgba(0, 0, 0, 0.2)), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` }}>
                            <p className="text-white text-center my-1 mx-5">{movie?.name ? movie?.name : movie?.title}</p>
                        </li>
                    )
                    )
                }
            </ul>
        </div>
    )

}