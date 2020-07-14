import axios from "axios";
import querystring from "querystring";

export async function loginCall(props) {
  const url = process.env.REACT_APP_SERVICE_AUTHORIZATION;
  const data = {
    grant_type: 'password',
    client_id: 'auth_id',
    scope: 'read write',
    common: 'common',
    ...props
  };
  try {
    return axios({
      url: '/oauth/token',
      baseURL: url,
      method: 'post',
      auth: { username: 'auth_id', password: 'auth_secret'},
     data: querystring.stringify(data)
    });
  } catch(error) {
    console.log(error);
  }
}
