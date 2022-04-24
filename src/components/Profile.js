import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Carousel from 'react-material-ui-carousel';
import Container from '@mui/material/Container';
import { getUserData } from '../api/auth';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const userData = await getUserData();
      setUserData(userData);
    };
    getData();
  }, []);

  if (!userData) return <h1>Loading...</h1>;
  console.log(userData);
  return (
    <>
      <Container maxWidth="sm">
        <CssBaseline />
        <figure>
          <img src={userData.image} alt={userData.username} />
        </figure>
        <Carousel sx={{ maxWidth: 500, Height: 500 }}>
          {userData.liked_songs.map((song) => (
            <Card key={song.id} sx={{ maxWidth: 345, maxHeight: 250 }}>
              <CardActionArea>
                <Link to={`/songs/${song.id}`}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={song.album.image}
                    alt={song.title}
                    sx={{ maxHeight: 500, maxWidth: 500 }}
                  />
                </Link>
              </CardActionArea>
            </Card>
          ))}
        </Carousel>
        <h1>Liked Songs</h1>
        <div className="flex">
          {userData.liked_songs.map((song) => (
            <Card
              key={song.id}
              sx={{ maxWidth: 345, maxHeight: 345 }}
              className="mx-10"
            >
              <CardActionArea>
                <Link to={`/songs/${song.id}`}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={song.album.image}
                    alt={song.title}
                    sx={{ maxHeight: 345, maxWidth: 345 }}
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    {song.title}
                  </Typography>
                </Link>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Profile;
