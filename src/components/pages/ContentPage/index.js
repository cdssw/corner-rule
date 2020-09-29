/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, ImageHeader, Content } from "components";
import ContentHeader from '../../organisms/ContentHeader';

export default function ContentPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);

  useEffect(e => {
    const token = localStorage.getItem("token");
  }, []);

  // if(!login) return <Redirect to='/' />

  return (
  <PageTemplate imageWrap={true} header={<ImageHeader path="/mypage" {...props} />} loading={loading}>
    <ContentHeader />
    <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
    <Content />
  </PageTemplate>
  );
}

