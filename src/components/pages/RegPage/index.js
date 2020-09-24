import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ImageList, RegForm } from "components";
import * as File from "../../../services/File";
import * as Meet from "../../../services/Meet";

export default function RegPage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  console.log("login:", login);

  const [state, setState] = useState({
    title: '',
    content: '',
    recruitment: 0,
    cost: 0,
    costOption: false,
    address: {
      address1: '',
      address2: '',
    },
    term: {
      startDt: '',
      endDt: '',
      startTm: '09:00',
      endTm: '18:00',
      detailDay: 0      
    },
    imgList: [],
  });

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'startDt':
      case 'endDt':
      case 'startTm':
      case 'endTm':
      case 'detailDay': {
        setState({
          ...state,
          term: {
            ...state.term,
            [e.target.name]: e.target.value
          }
        });
        break;
      }
      case 'address1':
      case 'address2':
        setState({
          ...state,
          address: {
            ...state.address,
            [e.target.name]: e.target.value
          }
        });
        break;
      default:
        setState({
          ...state,
          [e.target.name]: e.target.value
        });
        break;   
    }
  }

  const handleFileChange = async e => {
    const token = JSON.parse(localStorage.getItem("token"));
    const files = Array.from(e.target.files);

    const results = [];
    for(const [index, file] of files.entries()) {
      const param = { index, file, token, onProgress, onFailure };
      const res = await File.postImage(param);
      results.push(res.data);
    }
    setState({
      ...state,
      imgList: state.imgList.concat(results)
    });
  }

  const onProgress = percent => {
    console.log(percent);
  }

  const onFailure = (index, e) => {
    console.log(index, " failure");
    console.log(e);
  }

  const onRemoveClick = id => {
    setState({
      ...state,
      imgList: state.imgList.filter(img => img.id !== id)
    });
  }

  const onSaveClick = async e => {
    const token = JSON.parse(localStorage.getItem("token"));
    const param = {
      token: token,
      body: {...state, imgList: state.imgList.map(i => i.id)}
    }
    console.log(param);
    const res = await Meet.postMeet(param);
    if(res !== undefined) {
      history.push("/");
    }
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>등록</TitleHeader>}>
      <ImageList imgList={state.imgList} onFileChange={handleFileChange} onRemoveClick={onRemoveClick} />
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      <div style={{marginBottom: '20px'}}></div>
      <RegForm
        state={state}
        onInputChange={handleInputChange}
        onSaveClick={onSaveClick}
      />
    </PageTemplate>
  );
}

