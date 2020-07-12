import axios from "axios";
import { Base64 } from "js-base64";
import querystring from "querystring";

export function loginCall(props) {
  const url = 'https://cdssw.duckdns.org:9015/';
  const data = {
    grant_type: 'password',
    client_id: 'auth_id',
    scope: 'read write',
    common: 'common',
    ...props
  };
  axios({
    url: '/oauth/token',
    baseURL: url,
    method: 'post',
    auth: { username: 'auth_id', password: 'auth_secret'},
    data: querystring.stringify(data)
  }).then(response => {
    console.log(response.data);
  }).catch(err => {
    console.log(err);
  });
}