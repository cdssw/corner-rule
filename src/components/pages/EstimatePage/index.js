import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ApplicatorEstimate } from "components";

export default function EstimatePage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).access_token;  

  const handleBack = () => {
    history.replace({
      pathname: '/content/' + props.location.meetId,
      path: props.location.path,
      tab: props.location.tab
    });
  }

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>평가하기</TitleHeader>}>
      <ApplicatorEstimate />
    </PageTemplate>
  );
}

