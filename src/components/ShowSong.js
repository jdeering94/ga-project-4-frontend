import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSongById } from '../api/songs';
import { Link } from 'react-router-dom';
import { getAllContextsForSong } from '../api/contexts';

const ShowSong = () => {
  const { songId } = useParams();
  const [song, setSong] = React.useState(null);
  const [songContexts, setSongContexts] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const songdata = await getSongById(songId);
      setSong(songdata);

      const contextData = await getAllContextsForSong(songId);
      setSongContexts(contextData);
    };
    getData();
  }, []);

  console.log(songContexts);

  if (!song) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>this is a song page for {song.id}</h1>
      <div className="flex">
        <div className="image">
          <figure className="image">
            <img src={song.album.image} alt={song.album.image} />
          </figure>
          <h1>{song.name}</h1>
        </div>
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
    </>
  );
};

export default ShowSong;
