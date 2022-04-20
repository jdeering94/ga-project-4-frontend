import axios from 'axios';

export const getAllFilms = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/song-to-film/film-list/',
  };

  const { data } = await axios.request(options);
  return data;
};
