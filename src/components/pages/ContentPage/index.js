/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, ImageHeader, TitleHeader, Content, ContentHeader, Confirm } from "components";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import Utils from "../../Utils";

export default function ContentPage(props) {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [meet, setMeet] = useState({});
  const [imgPath, setImgPath] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [applicationMeet, setApplicationMeet] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [id, setId] = useState(undefined); // 선택한 사용자 ID
  const [title, setTitle] = useState(''); // 지원/확정에 따른 질문

  useEffect(e => {
    const token = localStorage.getItem("token");
    token ? getMeet(JSON.parse(token).access_token) : getMeet(null);
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

      if(token !== null) {
        const applicationMeetUser = await Meet.getUserApplicationMeet({id: meet.data.id, token: token});
        setApplicationMeet(applicationMeetUser.data);
      }
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

  const handleApproval = async e => {
    const body = {
      meetId: meet.data.id,
      userId: id
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

  const handleConfirmOpen = id => {
    if(id !== undefined) {
      setId(id);
      setTitle('확정 하시겠습니까?');
    } else {
      setId(undefined);
      setTitle('지원 하시겠습니까?');
    }
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    id === undefined ? handleApplication() : handleApproval();
  };

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader path={props.location.state.path ? props.location.state.path : "/"} imgPath={imgPath} {...props} />
        : <TitleHeader path={props.location.state.path ? props.location.state.path : "/"} {...props}>상세보기</TitleHeader>
      } loading={loading}>
      <ContentHeader meet={meet.data} avatar={avatar} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <Content
        userInfo={userInfo}
        meet={meet.data}
        applicationMeet={applicationMeet}
        onApplication={handleConfirmOpen}
        onApproval={handleConfirmOpen}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={title}
      />
    </PageTemplate>
  );
}

