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

export async function getUnread(props) {
  return axios.get(
    url + '/unread/' + props.meetId,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function getUnreadUsers(props) {
  return axios.get(
    url + '/unread/users/' + props.meetId,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function putRead(props) {
  return axios.put(
    url + '/read/' + props.id,
    null,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}