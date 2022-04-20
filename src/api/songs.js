import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getAllSongs = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/song-list/`,
  };

  const { data } = await axios.request(options);
  return data;
};
