import axios from "axios";

const url = process.env.REACT_APP_SERVICE_MEET;

export async function getMeetListByPage(props) {
  return axios.get(url + "/", {params: props});
}

export async function getMeetSearch(props) {
  return axios({
    url: url + "/search",
    method: 'POST',
    params: {
      page: props.page,
      size: props.size,
      sort: props.sort,
    },
    data: props.body
  });
}

export async function getMeet(props) {
  if(props.token === null)
    return axios.get(url + "/" + props.id);
  else
    return axios.get(url + "/" + props.id, {headers: { Authorization: "Bearer " + props.token }});
}

export async function postMeet(props) {
  return axios.post(
    url + "/",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function putMeet(props) {
  return axios.put(
    url + "/" + props.id,
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function postMyPageOpened(props) {
  return axios({
    url: url + "/mypage/opened",
    method: 'POST',
    params: {
      page: props.page,
      size: props.size,
      sort: props.sort,
    },
    data: props.body,
    headers: { Authorization: "Bearer " + props.token }
  });
}

export async function postMyPageApplication(props) {
  return axios({
    url: url + "/mypage/application",
    method: 'POST',
    params: {
      page: props.page,
      size: props.size,
      sort: props.sort,
    },
    data: props.body,
    headers: { Authorization: "Bearer " + props.token }
  });
}

export async function getUserApplicationMeet(props) {
  return axios.get(url + "/application/" + props.id, {headers: { Authorization: "Bearer " + props.token }});
}

export async function postApplication(props) {
  return axios.post(
    url + "/application",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function postApproval(props) {
  return axios.post(
    url + "/application/approval",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function getApplicatorInfo(props) {
  return axios.get(url + `/application/info/${props.meetId}/${props.username}`, {headers: { Authorization: "Bearer " + props.token }});
}

export async function putEstimate(props) {
  return axios.put(
    url + "/application/estimate",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}