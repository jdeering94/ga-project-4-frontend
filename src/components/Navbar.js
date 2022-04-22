import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { getLoggedInUserId, getLoggedInUsername } from '../lib/authentication';
import { removeToken } from '../api/auth';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const userId = getLoggedInUserId();
  const username = getLoggedInUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    console.log(userId);
    navigate('/');
    console.log('logged out');
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            >
              Song to Film
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? 'flex' : 'hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        Browse
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>
                          <Link to="/browse/artists">By Artist</Link>
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>
                          <Link to="/browse/films">By Film</Link>
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>
                          <Link to="/browse/songs">By Song</Link>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>
              </li>

              <li className="nav-item">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        User
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>
                          <Link to="/register">Sign Up</Link>
                        </MenuItem>
                        {!userId && (
                          <MenuItem onClick={popupState.close}>
                            <Link to="/login">Login</Link>
                          </MenuItem>
                        )}
                        {userId && (
                          <MenuItem onClick={popupState.close}>
                            <Link to={`/profile/${userId}`}>Profile</Link>
                          </MenuItem>
                        )}
                        {userId && (
                          <MenuItem onClick={popupState.close}>
                            <Button onClick={handleLogout}>Logout</Button>
                          </MenuItem>
                        )}
                      </Menu>
                    </>
                  )}
                </PopupState>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
