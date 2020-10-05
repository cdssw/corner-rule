import axios from "axios";

const url = process.env.REACT_APP_SERVICE_MEET;

export async function getMeetListByPage(props) {
  return axios.get(url + "/", {params: props});
}

export async function getMeet(props) {
  return axios.get(url + "/" + props.id, {headers: { Authorization: "Bearer " + props.token }});
}

export async function postMeet(props) {
  return axios.post(
    url + "/",
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  );
}