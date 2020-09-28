import axios from "axios";
import imageCompression from "browser-image-compression";

const url = process.env.REACT_APP_SERVICE_FILE;

export async function resizeFile(file) {
  return new Promise(resolve => {
    resolve(imageCompression(file, {maxSizeMB: 0.3, maxWidthOrHeight: 1280}));
  });
}

export async function postAvatar(file) {
  const image = await resizeFile(file);
  const formData = new FormData();
  formData.append('file', new File([image], file.name, {type: file.type, lastModified: Date.now()}));

  return axios.post(
    url + '/avatar?group=avatar',
    formData,
    {headers: { 'content-type': 'multipart/form-data' }}
  );
}

export async function postImage({index, file, token, files, onProgress}) {
  const image = await resizeFile(file);
  const formData = new FormData();
  formData.append('file', new File([image], file.name, {type: file.type, lastModified: Date.now()}));

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