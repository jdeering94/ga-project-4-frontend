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
