import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createFilm } from '../../api/films';

const Film = () => {
  const navigate = useNavigate();
  const [filmTitle, setFilmTitle] = React.useState('');
  const [filmYear, setFilmYear] = React.useState('');
  const [director, setDirector] = React.useState('');
  const [filmImage, setFilmImage] = React.useState('');

  const handleFilmTitleChange = (e) => {
    setFilmTitle(e.target.value);
  };
  const handleFilmYearChange = (e) => {
    setFilmYear(e.target.value);
  };
  const handleDirectorChange = (e) => {
    setDirector(e.target.value);
  };
  const handleFilmImageChange = (e) => {
    setFilmImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFilm({
      title: filmTitle,
      year: filmYear,
      director: director,
      image: filmImage,
    });
    navigate('/browse/films');
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Film</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              id="name"
              placeholder="Film Title"
              value={filmTitle}
              onChange={handleFilmTitleChange}
            />

            <input
              type="number"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="year"
              placeholder="Year of Release"
              id="year"
              value={filmYear}
              onChange={handleFilmYearChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="director"
              id="director"
              placeholder="Director"
              value={director}
              onChange={handleDirectorChange}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="image"
              id="image"
              placeholder="Image Link"
              value={filmImage}
              onChange={handleFilmImageChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Film"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Film;
