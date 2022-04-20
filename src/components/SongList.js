import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { getAllSongs } from '../api/songs';
import { Link } from 'react-router-dom';

const SongList = () => {
  const [songs, setSongs] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const songs = await getAllSongs();
      setSongs(
        songs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
    };
    getData();
  }, []);

  console.log(songs);

  return (
    <>
      <h1>All Songs</h1>
      {songs ? (
        <div className="container mx-auto px-10 flex">
          {songs.map((song) => (
            <Card key={song.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <Link to="/">
                  <CardMedia
                    component="img"
                    height="140"
                    image={song.album.image}
                    alt={song.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {song.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {/* Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica */}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Like
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SongList;
