import axios from "axios";

export async function getUserCall(props) {
  const url = process.env.REACT_APP_SERVICE_USER;
  return axios.get(
    url, {headers: { Authorization: "Bearer " + props.access_token }}
  ).catch(error => {
    console.log(error);
  });
}

export async function getCheckUsername(props) {
  const url = process.env.REACT_APP_SERVICE_USER + "/check/username";
  return axios.get(
    url, {params: { username: props.username }}
  ).catch(error => {
    console.log(error);
  });
}

export async function getCheckNicknm(props) {
  const url = process.env.REACT_APP_SERVICE_USER + "/check/nicknm";
  return axios.get(
    url, {params: { nicknm: props.nicknm }}
  ).catch(error => {
    console.log(error);
  });
}

export async function signup(body) {
  const url = process.env.REACT_APP_SERVICE_USER + "/signup";

  return axios.post(
    url, body
  ).catch(error => {
    console.log(error.response);
  });
}

