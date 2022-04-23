export function isLiked(user, song) {
  if (user.liked_songs.includes(song.id)) {
    return true;
  } else return false;
}
