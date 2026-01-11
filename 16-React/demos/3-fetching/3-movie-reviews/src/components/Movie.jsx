/*
  Movie.jsx
  ---------
  - Displays ONE movie
  - Calculates rating
  - Passes reviews down
*/

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { calcMovieRating } from "../util";

export default function Movie({ movie, addReview }) {
  const rating = movie.reviews.length
    ? calcMovieRating(movie.reviews)
    : "No ratings yet";

  return (
    <article>
      <header>
        <img
          className="thumbnail"
          src={movie.imgSrc}
          alt={movie.title}
        />

        <div>
          <h3>
            {movie.title} ({movie.year})
          </h3>

          <p>{movie.synopsis}</p>

          <h4>Rating: {rating}</h4>

          <div className="categories">
            <h4>Categories:</h4>
            <ul>
              {movie.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <aside className="reviews-section">
        <ReviewList reviews={movie.reviews} />
        <ReviewForm movieID={movie.id} addReview={addReview} />
      </aside>
    
    </article>
  );
}
