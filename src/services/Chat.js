import axios from "axios";

const url = process.env.REACT_APP_SERVICE_CHAT;

export async function getChatListByPage(props) {
  const params = new URLSearchParams();
  params.append('page', props.page);
  params.append('size', props.size);
  params.append('sort', props.sort);
  return axios({
    url: url + "/history",
    method: 'GET',
    headers: {
      Authorization: "Bearer " + props.token
    },
    params: {
      page: props.page,
      size: props.size,
      sort: props.sort,
    }
  });
}