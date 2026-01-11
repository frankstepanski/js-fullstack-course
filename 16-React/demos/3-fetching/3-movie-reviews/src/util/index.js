/*
  Calculates average rating for a movie
*/

export const calcMovieRating = (reviews) => {
  const total = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return (total / reviews.length).toFixed(1);
};
