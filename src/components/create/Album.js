import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../api/albums';

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              id="name"
              placeholder="Album Name"
              value={albumName}
              onChange={handleAlbumNameChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="image"
              placeholder="Image Link"
              id="image"
              value={albumImage}
              onChange={handleAlbumImageChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Album"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Album;
