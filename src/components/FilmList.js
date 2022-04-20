import React from 'react';
import { getAllFilms } from '../api/films';

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
        <div className="container">
          <div className="columns is-multiline">
            {films.map((film) => (
              <div key={film.id} className="column card m-5 is-one-fifth">
                <div className="card-image">
                  <figure className="image is-4by5">
                    <img src={film.image} alt={film.title} />
                  </figure>
                  <div className="is-flex is-justify-content-space-between">
                    <p className="card-text">
                      <strong>{film.title}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default FilmList;
