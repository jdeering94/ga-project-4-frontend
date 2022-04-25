import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
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
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        className="text-center"
      >
        All Artists
      </Typography>
      {artists ? (
        <div className="container mx-auto px-10 flex flex-wrap basis-1/3">
          {artists.map((artist) => (
            <Card className="mx-10" key={artist.id} sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <Link to="/">
                  <CardMedia
                    component="img"
                    maxHeight="100px"
                    maxWidth="100px"
                    image={artist.image}
                    alt={artist.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.name}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
              <CardActions></CardActions>
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
