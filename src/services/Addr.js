import axios from "axios";

const url = process.env.REACT_APP_SERVICE_ADDR

export async function getSidoList() {
  return axios.get(url + "/sido").catch(error => {
    console.log(error);
  });
}

export async function getSggList(sido) {
  return axios.get(
    url + "/sgg", {params: { sido }}
  ).catch(error => {
    console.log(error);
  });
}