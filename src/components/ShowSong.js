import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSongById } from '../api/songs';
import { Link } from 'react-router-dom';
import { getAllContextsForSong } from '../api/contexts';
import { getUserData } from '../api/auth';
import { isLiked } from '../lib/favourites';
import { addLikedSong, removeLikedSong } from '../api/auth';
import Spotify from 'react-spotify-embed';

const ShowSong = () => {
  const { songId } = useParams();
  const [song, setSong] = React.useState(null);
  const [songContexts, setSongContexts] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  // const [liked, setLiked] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const songdata = await getSongById(songId);
      setSong(songdata);

      const contextData = await getAllContextsForSong(songId);
      setSongContexts(contextData);
      if (window.sessionStorage.token) {
        const user = await getUserData();
        setUserData(user);
        // setLiked(isLiked(user, songdata));
      }
    };
    getData();
  }, []);

  if (!song) {
    return <p>Loading...</p>;
  }

  const handleLikeButton = async () => {
    if (
      song.liked_by.filter((item) => item.username === userData.username)
        .length > 0
    ) {
      console.log('removing like');
      await removeLikedSong(song.id);
      const songdata = await getSongById(songId);
      setSong(songdata);
      const user = await getUserData();
      setUserData(user);
    } else {
      const data = await addLikedSong(song.id);
      setUserData(data);
      const songdata = await getSongById(songId);
      setSong(songdata);
      const user = await getUserData();
      setUserData(user);
    }
  };

  return (
    <>
      <h1>this is a song page for {song.name}</h1>
      <Container maxWidth="sm">
        <div className="image m-10">
          {/* <Card> */}
          <CardMedia
            component="img"
            height="140"
            image={song.album.image}
            alt={song.name}
            sx={{ maxHeight: 300, maxWidth: 300 }}
          />
          {/* </Card> */}
          <CardActions>
            {userData && (
              <Button size="small" color="primary" onClick={handleLikeButton}>
                {song.liked_by.filter(
                  (item) => item.username === userData.username
                ).length > 0
                  ? '♥'
                  : '♡'}
              </Button>
            )}
            <Spotify wide link={song.spotify_link} />
          </CardActions>
        </div>
        <div className="flex">
          <div className="information card">
            <h2 className="name">{song.name}</h2>
            <p>
              <strong>Artist:</strong> {song.artist.name}
            </p>
            <p>
              <strong>Album: </strong>
              {song.album.name}
            </p>
            <p>
              <strong>Released in:</strong> {song.year}
            </p>
            <p>
              <strong>Description:</strong> {song.description}
            </p>
            <p>
              <strong>Likes:</strong> {song.liked_by.length}
            </p>
            <div className="film-info">
              <strong>Used in:</strong>
              {song.films.map((film) => (
                <Card key={film.title} sx={{ maxWidth: 345, maxHeight: 250 }}>
                  <CardActionArea>
                    <Link to={`/films/${film.id}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={film.image}
                        alt={film.title}
                        sx={{ maxHeight: 100, maxWidth: 100 }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {film.title}
                        </Typography>

                        {songContexts
                          ?.filter((item) => item.film.id === film.id)

                          .map((context) => (
                            <Typography
                              key={context.id}
                              variant="body2"
                              color="text.secondary"
                            >
                              {context.usage}
                            </Typography>
                          ))}
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShowSong;
