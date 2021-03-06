import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ApplicatorInfo } from "components";
import Utils from "../../Utils";
import * as Meet from "../../../services/Meet";
import * as User from "../../../services/User";

export default function ApplicatorPage(props) {
  const history = useHistory();
  const { login } = useSelector(state => state.userInfo, []);
  const [applicator, setApplicator] = useState(null);
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).access_token;  

  useEffect(() => {
    if(props.location.username) {
      getApplicator(props.location.username);
    } else {
      history.goBack();
    }
  }, []);

  const getApplicator = async username => {
    try {
      const applicator = await User.getApplicator({token: token, username: username});
      const info = await Meet.getApplicatorInfo({token: token, meetId: props.location.meet.id, username: username});
      applicator.data.meetCnt = info.data.meetCnt;
      applicator.data.estimateAvg = info.data.estimateAvg;
      setApplicator(applicator.data);
    } catch(error) {
      Utils.alertError(error);
    }
  }

  const handleBack = () => {
    history.replace({
      pathname: props.location.meet ? '/content/' + props.location.meet.id : '/',
      path: props.location.path,
      tab: props.location.tab
    });
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>지원자 보기</TitleHeader>}>
      {applicator && <ApplicatorInfo applicator={applicator} meet={props.location.meet} />}
    </PageTemplate>
  );
}

