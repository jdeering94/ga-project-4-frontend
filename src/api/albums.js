import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const createAlbum = async (albumData) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/song-to-film/album-list/`,
    data: albumData,
  };

  const { data } = await axios.request(options);
  return data;
};
