export function isLiked(user, song) {
  if (user.liked_songs.includes(song.id)) {
    return true;
  } else return false;
}

export function averageRating(context) {
  const ratingArray = context.reviews.map((review) => {
    return review.rating;
  });
  const average = ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;
  return average;
}
