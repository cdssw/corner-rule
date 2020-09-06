import axios from "axios";

const url = process.env.REACT_APP_SERVICE_MEET;

export async function getMeetListByPage(props) {
  return axios.get(
    url + "/", {params: { page: props.page, size: props.size }}
  ).catch(error => {
    console.log(error);
  });
}
