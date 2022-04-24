import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../api/albums';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Album = () => {
  const navigate = useNavigate();
  const [albumName, setAlbumName] = React.useState('');
  const [albumImage, setAlbumImage] = React.useState('');

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };
  const handleAlbumImageChange = (e) => {
    setAlbumImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAlbum({ name: albumName, image: albumImage });
    navigate('/');
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Album</h1>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: '100%' }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Album Name"
              variant="outlined"
              type="text"
              value={albumName}
              onChange={handleAlbumNameChange}
            />
            <TextField
              fullWidth
              id="fullWidth"
              label="Image Link"
              variant="outlined"
              type="text"
              value={albumImage}
              onChange={handleAlbumImageChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Album"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Album;
