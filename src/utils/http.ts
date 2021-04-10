import axios from 'axios';

export function getData() {
  return axios.get('sjtx/api.php?format=json', {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(response => {
    return response.data;
  }).catch(err => {
    console.error(err);
  });
};