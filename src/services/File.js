import axios from "axios";

const url = process.env.REACT_APP_SERVICE_FILE;

export async function postAvatar(file) {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(
    url + '/avatar?group=avatar',
    formData,
    {headers: { 'content-type': 'multipart/form-data' }}
  ).catch(error => {
    console.log(error);
  });
}
