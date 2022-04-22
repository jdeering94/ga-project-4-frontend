export function isLiked(userId, song) {
  if (song.liked_by.includes(userId)) {
    return true;
  } else return false;
}
