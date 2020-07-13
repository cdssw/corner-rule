import axios from "axios";

export async function getUserCall(props) {
  const url = 'https://cdssw.duckdns.org:9000/user';
  // const url = 'http://localhost:8090/user';
  try {
    return axios.get(url, {headers: { Authorization: "Bearer " + props.access_token }});
  } catch(error) {
    console.log(error);
  }
}
