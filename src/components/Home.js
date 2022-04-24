import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSongs } from '../api/songs';
import { Link } from 'react-router-dom';

const Home = () => {
  const [songs, setSongs] = React.useState(null);
  const [selectedSong, setSelectedSong] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const songs = await getAllSongs();
      setSongs(
        songs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/songs/${selectedSong.id}`);
  };

  if (!songs) return <h1>Loading/...</h1>;

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            maxWidth: '100%',
            width: '500px',
          }}
          noValidate
          onSubmit={handleSubmit}
          className="my-10"
        >
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={songs}
            getOptionLabel={(song) => song.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search For Songs"
                placeholder="Available Songs..."
              />
            )}
            onChange={(_event, songChoice) => {
              setSelectedSong(songChoice);
            }}
            className="my-10"
          />

          <Carousel sx={{ maxWidth: 500, Height: 10000 }}>
            {songs.map((song) => (
              <Box key={song.id} sx={{ maxWidth: 345, maxHeight: 250 }}>
                <CardActionArea sx={{ maxHeight: 300, maxWidth: 300 }}>
                  <Link to={`/songs/${song.id}`}>
                    <CardMedia
                      component="img"
                      height="100%"
                      width="100%"
                      image={song.album.image}
                      alt={song.title}
                      sx={{ maxHeight: 400, maxWidth: 400 }}
                    />
                  </Link>
                </CardActionArea>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Container>
    </>
  );
};

export default Home;
