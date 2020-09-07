import axios from "axios";

const url = process.env.REACT_APP_SERVICE_USER;

export async function getUser(props) {
  return axios.get(
    url, {headers: { Authorization: "Bearer " + props.access_token }}
  ).catch(error => {
    console.log(error);
  });
}

export async function getCheckUsername(props) {
  return axios.get(
    url + "/check/username", {params: { username: props.username }}
  ).catch(error => {
    console.log(error);
  });
}

export async function getCheckNicknm(props) {
  return axios.get(
    url + "/check/nicknm", {params: { nicknm: props.nicknm }}
  ).catch(error => {
    console.log(error);
  });
}

export async function signup(body) {
  return axios.post(
    url + "/signup", body
  ).catch(error => {
    console.log(error.response);
  });
}

export async function putEditUser(props) {
  return axios.put(
    url,
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  ).catch(error => {
    console.log(error.response);
  });
}

export async function postPasswordChange(props) {
  return axios.post(
    url + "/change/password",
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  ).catch(error => {
    alert(error.response.data.message);
  });
}

