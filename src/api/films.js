import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getAllFilms = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/film-list/`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const getFilmById = async (filmId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/film-detail/${filmId}`,
  };

  const { data } = await axios.request(options);
  return data;
};
