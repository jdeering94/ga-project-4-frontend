import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createArtist } from '../../api/artists';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Artist = () => {
  const navigate = useNavigate();
  const [artistName, setArtistName] = React.useState('');
  const [artistImage, setArtistImage] = React.useState('');

  const handleArtistNameChange = (e) => {
    setArtistName(e.target.value);
  };
  const handleArtistImageChange = (e) => {
    setArtistImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArtist({ name: artistName, image: artistImage });
    navigate('/browse/artists');
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Artist</h1>
          <Box
            component="form"
            sx={{ maxWidth: '100%' }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Artist Name"
              variant="outlined"
              type="text"
              value={artistName}
              onChange={handleArtistNameChange}
            />
            <TextField
              fullWidth
              id="fullWidth"
              label="Image Link"
              variant="outlined"
              type="text"
              value={artistImage}
              onChange={handleArtistImageChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Artist"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Artist;
