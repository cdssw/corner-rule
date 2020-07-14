import axios from "axios";

export async function getUserCall(props) {
  const url = process.env.REACT_APP_SERVICE_USER;
  try {
    return axios.get(url, {headers: { Authorization: "Bearer " + props.access_token }});
  } catch(error) {
    console.log(error);
  }
}
