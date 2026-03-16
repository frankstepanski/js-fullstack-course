import React, {useState, useEffect} from 'react';
import {FaStar} from 'react-icons/fa'
import { getNowPlaying } from "./services";
import { parseNowPlaying } from "./utils";

import styles from "./NowPlaying.module.css";

/*
     The Movie DB API:
        https://developers.themoviedb.org/3/getting-started/introduction

     Trending endpoint:   
       https://developers.themoviedb.org/3/trending/get-trending

     Support:
       https://www.themoviedb.org/talk/

*/

const NowPlaying = () => {

    const [movies, setMovies] = useState([]);
 
    useEffect(() => {
        getNowPlaying()
            .then((data) => {
                const formatted = parseNowPlaying(data)
                setMovies(formatted)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    console.log(movies)
    return (
     <div className={styles.nowPlaying}>
        <div className={styles.nowPlayingList}>
            {
                movies.map((movie) => (
            
                    <article key={movie.id} className={styles.card}>
                         <img className={styles.poster} src={movie.poster} alt={movie.title} />
                         <div className={styles.details}>
                             <h3> 
                                  <span>
                                        <FaStar size = {18} color='FFA500' className={styles.star} />
                                        <span className={styles.rating}>{movie.rating}</span>
                                  </span>
                                  <span className={styles.release}>{movie.release}</span>
                             </h3>
                            <h2 className={styles.title}>{movie.title}</h2>

                        </div>
                    </article>
                ))
            }
        </div>
     </div>
    );
}


export default NowPlaying;