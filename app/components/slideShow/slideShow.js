'use client'
import { useState, useEffect } from "react";
import styles from "./slideShow.module.css"


export default function SlideShow(props) {
    const [filteredArray, setFilteredArray] = useState([])

    // extract props and store in state
    useEffect(() => {
        const content = props.content
        if (content) {
            // Extracting only 'id', 'name','backdrop and poster image path'
            const arr = props.content.map(({ id, name, title, backdrop_path, poster_path }) => ({ id, name, title, backdrop_path, poster_path }));
            // update state array with filtered content
            setFilteredArray(arr);
        }
    }, [props.content]);


    return (
        <>
            <div id={props.id} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {/* return first item in filtered array as active */}
                    <div className={`carousel-item active  ${styles.carouselItem}`} style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + filteredArray[0]?.poster_path})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} key={filteredArray[0]?.id} >
                        {/*  */}
                    </div>
                    {/* using the .slice method on array to remove first item in list. Return the rest of items in filtered array*/}
                    {
                        filteredArray.slice(1).map((item) => (
                            <div className={`carousel-item ${styles.carouselItem}`} style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + item?.poster_path})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} key={item.id}>
                                {/*  */}
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={"#" + props.id} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={"#" + props.id} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}