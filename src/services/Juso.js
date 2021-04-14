import axios from "axios";

const url = process.env.REACT_APP_SERVICE_JUSO
const key = 'devU01TX0FVVEgyMDIxMDQxNDEwMjAyMjExMTA0ODA=';

export async function postJuso(props) {
  const req = url
            + `?confmKey=${key}`
            + `&currentPage=${props.page}`
            + `&countPerPage=10`
            + `&keyword=${props.search}`
            + `&resultType=json`
  return axios.get(req);
}