import request from 'superagent'
import { alert } from './components/Alert';
import users from './users/users.json';

export const getRequest = (query, message) => {
    return request
    .get('https://api.weatherbit.io/v2.0/current')
    .query(query)
    .query({ 'key': 'd5c3391c63af47658c84946c5fe654e5' })
    .then(res => {
      if (res.body) {
        return res.body;
      } else {
        alert(message, 'error')
      }
    })
    .catch(err => {
      alert(err.message, 'error');
    });
}

export const getRequestLogin = (username, password) => {
  const user = users.find(user => user.name === username);
  if (user) {
    if (user.password === password) {
      return user;
    } else {
      alert('Password is not correct', 'error');
    }
  } else {
    alert('Username is not correct', 'error');
  }
}