import axios from "axios";
import querystring from "querystring";

const url = process.env.REACT_APP_SERVICE_AUTHORIZATION;

export async function loginCall(props) {
  const data = {
    grant_type: 'password',
    client_id: 'auth_id',
    scope: 'read write',
    common: 'common',
    ...props
  };

  return axios({
    url: '/oauth/token',
    baseURL: url,
    method: 'post',
    auth: { username: 'auth_id', password: 'auth_secret'},
    data: querystring.stringify(data)
  }).catch(error => {
    console.log(error);    
    if(error.response.data.error_description === 'Bad credentials') {
      alert("아이디와 비밀번호를 확인하고 다시 로그인 하세요.");
    }
  });
}
