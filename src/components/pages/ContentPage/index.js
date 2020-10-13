/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, ImageHeader, TitleHeader, Content } from "components";
import ContentHeader from '../../organisms/ContentHeader';
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import Utils from "../../Utils";

export default function ContentPage(props) {
  const [loading, setLoading] = useState(false);
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [meet, setMeet] = useState({});
  const [imgPath, setImgPath] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [applicationMeet, setApplicationMeet] = useState([]);

  useEffect(e => {
    const token = localStorage.getItem("token");
    if(login) {
      getMeet(JSON.parse(token).access_token);
    }
  }, []);

  const getMeet = async token => {
    setLoading(true);
    try {
      const meet = await Meet.getMeet({id: props.match.params.id, token: token});
      setMeet(meet);
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        const imageList = await File.postImagesPath({fileList: meet.data.imgList});
        setImgPath(imageList);
      }

      const avatarPath = await User.getUserAvatar({username: meet.data.user.username, token: token});
      setAvatar(avatarPath.data);

      const applicationMeetUser = await Meet.getUserApplicationMeet({id: meet.data.id, token: token});
      setApplicationMeet(applicationMeetUser.data);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleApplication = async e => {
    const body = {
      meetId: meet.data.id
    }
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    const param = { token, body };
    setLoading(true);
    try {
      await Meet.postApplication(param);
      getMeet(token);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleApproval = async userId => {
    const body = {
      meetId: meet.data.id,
      userId: userId
    }
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    const param = { token, body };
    setLoading(true);
    try {
      await Meet.postApproval(param);
      getMeet(token);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  if(!login) return <Redirect to='/login' />

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader path={props.location.state.path ? props.location.state.path : "/"} imgPath={imgPath} {...props} />
        : <TitleHeader path={props.location.state.path ? props.location.state.path : "/"} {...props}>상세보기</TitleHeader>
      } loading={loading}>
      <ContentHeader userInfo={userInfo} meet={meet.data} avatar={avatar} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <Content
        userInfo={userInfo}
        meet={meet.data}
        applicationMeet={applicationMeet}
        onApplication={handleApplication}
        onApproval={handleApproval}
      />
    </PageTemplate>
  );
}

