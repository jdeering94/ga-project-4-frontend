import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { getAllSongs } from '../api/songs';
import { Link } from 'react-router-dom';
import { getUserData } from '../api/auth';

const SongList = () => {
  const [songs, setSongs] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const songs = await getAllSongs();
      setSongs(
        songs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
      if (window.sessionStorage.token) {
        const user = await getUserData();
        setUserData(user);
      }
    };
    getData();
  }, []);

  if (!songs) return <h1>Loading...</h1>;
  // if (!userData) return <h1>Loading</h1>;
  // console.log(userData.liked_songs[0].id);

  return (
    <>
      <h1>All Songs</h1>

      <div className="container mx-auto px-10 flex flex-wrap basis-1/3">
        {songs.map((song) => (
          <Card className="mx-10" key={song.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Link to={`/songs/${song.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={song.album.image}
                  alt={song.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {song.name}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
            <CardActions>
              {/* {userData && (
                <Button size="small" color="primary">
                  Like
                </Button> */}
              {/* )} */}
              {/* {userData.liked_songs
                ?.filter((item) => item.id === song.id)

                .map((like) => (
                  <Button key={like.id} size="small" color="primary">
                    unLike
                  </Button>
                ))} */}
            </CardActions>
            {song.liked_by.length > 0 && (
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="px-10"
              >
                ❤️{song.liked_by.length}
              </Typography>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default SongList;
