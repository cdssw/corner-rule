import axios from "axios";

const url = process.env.REACT_APP_SERVICE_MEET;

export async function getMeetListByPage(props) {
  return axios.get(
    url + "/", {params: { page: props.page, size: props.size }}
  ).catch(error => {
    console.log(error);
  });
}

export async function postMeet(props) {
  return axios.post(
    url + "/",
    props.body,
    {headers: { Authorization: "Bearer " + props.token.access_token }}
  ).catch(error => {
    alert(error.response.data.message);
  });
}