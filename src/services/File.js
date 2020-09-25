import axios from "axios";

const url = process.env.REACT_APP_SERVICE_FILE;

export async function postAvatar(file) {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(
    url + '/avatar?group=avatar',
    formData,
    {headers: { 'content-type': 'multipart/form-data' }}
  );
}

export async function postImage({index, file, token, files, onProgress}) {
  const formData = new FormData();
  formData.append('file', file);

  return axios({
    baseURL: url,
    url: '/image?group=image',
    method: 'post',
    data: formData,
    headers: { 'content-type': 'multipart/form-data', 'Authorization': "Bearer " + token.access_token},
    onUploadProgress: progress => {
      const { loaded, total } = progress;
      const percent = Math.floor((loaded / total) * 100);
      onProgress(index, files, percent);
    }
  });
}