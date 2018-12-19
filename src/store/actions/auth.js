import axios from 'axios';
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {email, password, returnSecureToken: true};
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_API_KEY}`;

    if (isLogin) url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_API_KEY}`;

    const {data} = await axios.post(url, authData);
    const {idToken, localId, expiresIn} = data;
    const expirationDate = String(new Date(new Date().getTime() + (expiresIn * 1000)));

    localStorage.setItem('token-quiz', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(idToken));
    dispatch(autoLogout(expiresIn));
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    payload: token
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token-quiz');

    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) dispatch(logOut());
      else {
        dispatch(authSuccess(token));
        dispatch(autoLogout(expirationDate.getTime() - (new Date().getTime() / 1000)));
      }
    } else dispatch(logOut());
  }
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => dispatch(logOut()), time * 1000)
  }
}

export function logOut() {
  localStorage.removeItem('token-quiz');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
}
