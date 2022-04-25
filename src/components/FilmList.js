import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        className="text-center"
      >
        All Films
      </Typography>
      {films ? (
        <div className="container mx-auto px-10 flex flex-wrap basis-1/3">
          {films.map((film) => (
            <Card className="mx-10" key={film.id} sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <Link to={`/films/${film.id}`}>
                  <CardMedia
                    component="img"
                    maxHeight="100px"
                    maxWidth="100px"
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
