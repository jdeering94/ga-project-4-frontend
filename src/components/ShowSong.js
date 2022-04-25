import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import { CardActionArea, CardActions, Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSongById } from '../api/songs';
import { Link } from 'react-router-dom';
import { getAllContextsForSong } from '../api/contexts';
import { getUserData } from '../api/auth';
import { averageRating } from '../lib/favourites';
import { addLikedSong, removeLikedSong } from '../api/auth';
import { createContextRating } from '../api/contexts';
import Spotify from 'react-spotify-embed';

const ShowSong = () => {
  const { songId } = useParams();
  const [song, setSong] = React.useState(null);
  const [songContexts, setSongContexts] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const songdata = await getSongById(songId);
      setSong(songdata);

      const contextData = await getAllContextsForSong(songId);
      setSongContexts(contextData);
      if (window.sessionStorage.token) {
        const user = await getUserData();
        setUserData(user);
      }
    };
    getData();
  }, []);

  if (!song) {
    return <p>Loading...</p>;
  }

  console.log(songContexts);

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
      <Container
        maxWidth="sm"
        className="bg-slate-200 shadow flex-col justify-center p-5"
      >
        <h1 className="font-semibold text-center p-5">{song.name}</h1>
        <div className="image justify-center">
          <figure>
            <img src={song.album.image} alt={song.name} />
          </figure>
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
            <p>
              <strong>Used in:</strong>
            </p>
            <div className="film-info flex flex-wrap justify-center">
              <br />
              {song.films.map((film) => (
                <Card
                  key={film.title}
                  sx={{ maxWidth: 400, maxHeight: 300, width: '100%' }}
                  className="m-1 justify-center flex-col"
                >
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
                            <>
                              <Typography
                                key={context.id}
                                variant="body2"
                                color="text.secondary"
                              >
                                Average Rating: {averageRating(context)}
                                <br />
                                {context.usage}
                              </Typography>
                            </>
                          ))}
                      </CardContent>
                    </Link>
                  </CardActionArea>
                  {userData && (
                    <CardActions>
                      {songContexts
                        ?.filter((item) => item.film.id === film.id)

                        .map((context) => (
                          <>
                            <div key={context.id}>
                              <Rating
                                name="no-value"
                                value={null}
                                max={10}
                                onChange={async (event, newValue) => {
                                  createContextRating({
                                    usage: context.id,
                                    rating: newValue,
                                  });
                                  const contextData =
                                    await getAllContextsForSong(songId);
                                  setSongContexts(contextData);
                                }}
                              />
                              {/* <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Your Rating:
                                {context.reviews.length > 0
                                  ? userData.reviews.filter(
                                      (filteredReview) =>
                                        filteredReview.usage === context.id
                                    )[0].rating
                                  : 'not rated'}
                              </Typography> */}
                            </div>
                          </>
                        ))}
                    </CardActions>
                  )}
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
