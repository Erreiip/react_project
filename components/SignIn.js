import {API_URL} from './Api'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      console.error(jsonResponse.data.signIn);
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}
