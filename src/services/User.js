import axios from "axios";

const url = process.env.REACT_APP_SERVICE_USER;

export async function getUser(token) {
  return axios.get(url, {headers: { Authorization: "Bearer " + token }});
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
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function postHopePlace(props) {
  return axios.post(
    url + "/hopeplace",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function deleteHopePlace(props) {
  return axios.delete(
    url + "/hopeplace/" + props.id,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function postPasswordChange(props) {
  return axios.post(
    url + "/change/password",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function getUserAvatar(props) {
  if(props.token === null)
    return axios.get(url + "/avatar", {params: { username: props.username }});
  else
    return axios.get(url + "/avatar", {params: { username: props.username }, headers: { Authorization: "Bearer " + props.token }});
}

export async function getApplicator(props) {
  return axios.get(url + '/applicator/' + props.username, {headers: { Authorization: "Bearer " + props.token }});
}
