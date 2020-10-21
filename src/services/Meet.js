import axios from "axios";

const url = process.env.REACT_APP_SERVICE_MEET;

export async function getMeetListByPage(props) {
  return axios.get(url + "/", {params: props});
}

export async function getMeetSearch(props) {
  const params = new URLSearchParams();
  params.append('page', props.page);
  params.append('size', props.size);
  params.append('sort', props.sort);
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

export async function postMyPageOpened(props) {
  return axios.post(
    url + "/mypage/opened",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
}

export async function postMyPageApplication(props) {
  return axios.post(
    url + "/mypage/application",
    props.body,
    {headers: { Authorization: "Bearer " + props.token }}
  );
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