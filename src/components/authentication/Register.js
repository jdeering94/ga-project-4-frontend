import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Register = () => {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] =
    React.useState('');

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmationValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      password_confirmation: passwordConfirmationValue,
      image: 'default_avatar',
    });
    navigate('/login');
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          {/* <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              id="username"
              value={usernameValue}
              onChange={handleUsernameChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              id="email"
              value={emailValue}
              onChange={handleEmailChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              id="password"
              placeholder="8-12 characters - one upper/lower and special chararacter"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              id="passwordConfirmation"
              placeholder="confirm password"
              value={passwordConfirmationValue}
              onChange={handlePasswordConfirmationChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Create Account"
            />
          </form> */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: '100%' }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              value={usernameValue}
              onChange={handleUsernameChange}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              value={emailValue}
              onChange={handleEmailChange}
            />
            <TextField
              fullWidth
              id="fullWidth"
              label="Password"
              variant="outlined"
              type="password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            <TextField
              fullWidth
              id="fullWidth"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={passwordConfirmationValue}
              onChange={handlePasswordConfirmationChange}
            />

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Sign Up"
            />
          </Box>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{' '}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
