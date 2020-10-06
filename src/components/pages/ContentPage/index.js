/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, ImageHeader, TitleHeader, Content } from "components";
import ContentHeader from '../../organisms/ContentHeader';
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as User from "../../../services/User";

export default function ContentPage(props) {
  const [loading, setLoading] = useState(false);
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [meet, setMeet] = useState({});
  const [imgPath, setImgPath] = useState(null);
  const [avatar, setAvatar] = useState("");

  useEffect(e => {
    const token = localStorage.getItem("token");
    getMeet(JSON.parse(token));
  }, []);

  const getMeet = async token => {
    setLoading(true);
    try {
      const meet = await Meet.getMeet({id: props.match.params.id, token: token.access_token});
      setMeet(meet);
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        const imageList = await File.postImagesPath({fileList: meet.data.imgList});
        setImgPath(imageList);
      }

      const avatarPath = await User.getUserAvatar({username: meet.data.user.username, token: token.access_token});
      setAvatar(avatarPath.data);
    } catch(error) {
      alert(error.response.data.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader path="/" imgPath={imgPath} {...props} />
        : <TitleHeader path="/" {...props}>상세보기</TitleHeader>
      } loading={loading}>
      <ContentHeader userInfo={userInfo} meet={meet.data} avatar={avatar} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <Content userInfo={userInfo} meet={meet.data} />
    </PageTemplate>
  );
}

