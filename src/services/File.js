import axios from "axios";

export async function postAvatar(file) {
  const url = process.env.REACT_APP_SERVICE_FILE + '/avatar?group=avatar';
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(
    url, formData, {headers: { 'content-type': 'multipart/form-data' }
  }).catch(error => {
    console.log(error);
  });
}
