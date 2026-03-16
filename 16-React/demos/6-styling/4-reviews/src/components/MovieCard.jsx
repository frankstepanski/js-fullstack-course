import {
  Card,
  Categories,
  Category,
  Poster,
  Meta,
  Title,
  Muted,
  LeftColumn,
  ReviewsColumn,
  ReviewsScroll
} from "../styles";

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function MovieCard({ movie, onAddReview }) {
  return (
    <Card>
      {/* ===================== */}
      {/* LEFT COLUMN */}
      {/* Poster + Review Form */}
      {/* ===================== */}
      <LeftColumn>
        <Poster src={movie.image} alt={movie.alt} />
        <ReviewForm
          onSubmit={(review) =>
            onAddReview(movie.id, review)
          }
        />
      </LeftColumn>

      {/* ===================== */}
      {/* CENTER COLUMN */}
      {/* Movie details */}
      {/* ===================== */}
      <Meta>
        <Title>{movie.title}</Title>
        <Muted>{movie.release} • {movie.length}</Muted>
        
        {/* 🎭 Movie Categories */}
        <Categories>
          {movie.categories.map((cat) => (
            <Category key={cat}>{cat}</Category>
          ))}
        </Categories>

        <p>{movie.description}</p>
        
        {/* 🎬 YouTube Trailer */}
        <iframe
          width="100%"
          height="260"
          src={`https://www.youtube.com/embed/${movie.youtube}`}
          allowFullScreen
          title={movie.title}
          style={{ borderRadius: "10px" }}
        />
      </Meta>

      {/* ===================== */}
      {/* RIGHT COLUMN */}
      {/* Reviews */}
      {/* ===================== */}
      <ReviewsColumn>
        <ReviewsScroll>
          <ReviewList reviews={movie.reviews} />
        </ReviewsScroll>
      </ReviewsColumn>
    </Card>
  );
}
