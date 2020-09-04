import axios from "axios";

export async function getSidoList() {
  const url = process.env.REACT_APP_SERVICE_ADDR + "/sido";
  return axios.get(
    url
  ).catch(error => {
    console.log(error);
  });
}

export async function getSggList(sido) {
  const url = process.env.REACT_APP_SERVICE_ADDR + "/sgg";
  return axios.get(
    url, {params: { sido }}
  ).catch(error => {
    console.log(error);
  });
}