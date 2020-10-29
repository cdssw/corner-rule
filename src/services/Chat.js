import axios from "axios";

const url = process.env.REACT_APP_SERVICE_CHAT;

export async function getHistory(props) {
  return axios({
    url: url + "/history",
    method: 'POST',
    headers: {
      Authorization: "Bearer " + props.token
    },
    params: {
      page: props.page,
      size: props.size,
      sort: props.sort,
    },
    data: props.body
  });
}