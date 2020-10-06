import axios from "axios";

const url = process.env.REACT_APP_SERVICE_USER;

export async function getUser(props) {
  return axios.get(url, {headers: { Authorization: "Bearer " + props.access_token }});
}

export async function getCheckUsername(props) {
  return axios.get(url + "/check/username", {params: { username: props.username }});
}

export async function getCheckNicknm(props) {
  return axios.get(url + "/check/nicknm", {params: { nicknm: props.nicknm }});
}

export async function signup(body) {
  return axios.post(url + "/signup", body);
}

export async function putEditUser(props) {
  return axios.put(
    url,
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  );
}

export async function postPasswordChange(props) {
  return axios.post(
    url + "/change/password",
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  );
}

export async function getUserAvatar(props) {
  return axios.get(url + "/avatar", {params: { username: props.username }, headers: { Authorization: "Bearer " + props.token }});
}


