import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getAllArtists = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/artist-list/`,
  };

  const { data } = await axios.request(options);
  return data;
};
