import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { getAllFilms } from '../api/films';
import { Link } from 'react-router-dom';

const FilmList = () => {
  const [films, setFilms] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const films = await getAllFilms();
      setFilms(
        films.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        )
      );
    };
    getData();
  }, []);

  return (
    <>
      <h1>All Films</h1>
      {films ? (
        <div className="container mx-auto px-10 flex">
          {films.map((film) => (
            <Card className="mx-10" key={film.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <Link to="/">
                  <CardMedia
                    component="img"
                    height="140"
                    image={film.image}
                    alt={film.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {film.title}
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

export default FilmList;
