export function getLoggedInUserId() {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.sub;
}

export function getLoggedInUsername() {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.username;
}
