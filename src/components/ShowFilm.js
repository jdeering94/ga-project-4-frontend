import React from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../api/films';

const ShowSong = () => {
  const { filmId } = useParams();
  const [film, setFilm] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const filmdata = await getFilmById(filmId);
      setFilm(filmdata);
    };
    getData();
  }, []);

  console.log(film);

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>this is a song page for {film.id}</h1>
      <div className="flex">
        <div className="image">
          <figure className="image">
            <img src={film.image} alt={film.title} />
          </figure>
          <h1>{film.title}</h1>
        </div>
        <div className="information card">
          <h2 className="name">{film.title}</h2>
          <p>
            <strong>Director:</strong> {film.director}
          </p>
          <p>
            <strong>Released in:</strong> {film.year}
          </p>
          <p>
            <strong>Description:</strong> {film.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowSong;
