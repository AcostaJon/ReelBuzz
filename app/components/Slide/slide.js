// slide Component for displaying movies and tv shows - horizontal scroll
'use client'
// components
import MovieWidget from "@/app/components/movieWidget/movieWidget"
// css
import styles from "./styles.module.css"

export default function Slide(props) {
    // *************************************************************  variables
    // array of movies
    const data = props.data;
    // slide title
    const slideTitle = props.slideTitle;
    // variable value at zero, key for list items
    let n = 0;
   
        return (
            <div className={styles.slide}>
                {/* title */}
                <div className={styles.title}>
                    {/* if boolean is true display "Currently Airing TV Shows", if false display "Movies In Theaters" */}
                    <h2>{slideTitle}</h2>
                </div>
                {/* list */}
                <ul>
                    {
                        data.slice(0, 13).map((data) => (
                            // list item
                            <li key={n++}>
                                <MovieWidget backgroundImg={data.poster_path} id={data.id}
                                    title={data.title} name={data.name}
                                    releaseDate={data.release_date} firstAir={data.first_air_date} adult={data.adult}
                                    description={data.overview} rating={data.vote_average} voteCount={data.vote_count}/>
                                <p>{data.title ? data.title : data.name}</p>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        )
    
}