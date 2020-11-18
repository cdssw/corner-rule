import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ApplicatorEstimate } from "components";
import Utils from "../../Utils";
import * as Meet from "../../../services/Meet";
import * as User from "../../../services/User";

export default function EstimatePage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [applicator, setApplicator] = useState(null);
  const [star, setStar] = useState(1);
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).access_token;  

  useEffect(() => {
    if(props.location.username) {
      getApplicator(props.location.username);
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

  const handleStarClick = value => {
    setStar(value);
  }

  const handleEstimate = async e => {
    try {
      const body = {
        meetId: props.location.meet.id,
        username: props.location.username,
        estimate: star
      }
      await Meet.putEstimate({token: token, body: body});
      handleBack();
    } catch(error) {
      Utils.alertError(error);
    }
  }

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>평가하기</TitleHeader>}>
      {applicator &&
        <ApplicatorEstimate
          applicator={applicator}
          meet={props.location.meet}
          star={star}
          onStarClick={handleStarClick}
          onEstimate={handleEstimate}
        />
      }
    </PageTemplate>
  );
}

