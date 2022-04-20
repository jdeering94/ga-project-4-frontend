import React from 'react';
import { getAllArtists } from '../api/artists';

const ArtistList = () => {
  const [artists, setArtists] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const artists = await getAllArtists();
      setArtists(
        artists.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
    };
    getData();
  }, []);

  return (
    <>
      <h1>All Artists</h1>
      {artists ? (
        <div className="container">
          <div className="columns is-multiline">
            {artists.map((artist) => (
              <div key={artist.id} className="column card m-5 is-one-fifth">
                <div className="card-image">
                  <figure className="image is-4by5">
                    <img src={artist.image} alt={artist.name} />
                  </figure>
                  <div className="is-flex is-justify-content-space-between">
                    <p className="card-text">
                      <strong>{artist.name}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArtistList;
