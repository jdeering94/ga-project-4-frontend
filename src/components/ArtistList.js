import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { getAllArtists } from '../api/artists';
import { Link } from 'react-router-dom';

const ArtistList = () => {
  const [artists, setArtists] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const artists = await getAllArtists();
      setArtists(
        artists.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
    };
    getData();
  }, []);

  return (
    <>
      <h1>All Artists</h1>
      {artists ? (
        <div className="container mx-auto px-10 flex">
          {artists.map((artist) => (
            <Card className="mx-10" key={artist.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <Link to="/">
                  <CardMedia
                    component="img"
                    height="140"
                    image={artist.image}
                    alt={artist.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.name}
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

export default ArtistList;
