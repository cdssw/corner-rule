import axios from "axios";

export async function getMeetListByPage(props) {
  const url = process.env.REACT_APP_SERVICE_MEET + "/";
  return axios.get(
    url, {params: { page: props.page, size: props.size }}
  ).catch(error => {
    console.log(error);
  });
}
