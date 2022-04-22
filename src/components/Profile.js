import React from 'react';
import { getUserData } from '../api/auth';

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

  return <h1>this is a profile page for {userData.username}</h1>;
};

export default Profile;
