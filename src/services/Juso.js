import axios from "axios";

const url = process.env.REACT_APP_SERVICE_JUSO
// 발급시 검색용API로 발급해야 함.
const key = 'devU01TX0FVVEgyMDIxMDQxNDEwMzIxMTExMTA0ODQ=';

export async function postJuso(props) {
  const req = url
            + `?confmKey=${key}`
            + `&currentPage=${props.page}`
            + `&countPerPage=10`
            + `&keyword=${props.search}`
            + `&resultType=json`
  return axios.get(req);
}