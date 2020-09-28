import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ImageList, RegForm, FileUploader } from "components";
import * as File from "../../../services/File";
import * as Meet from "../../../services/Meet";

export default function RegPage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [loading, setLoading] = useState(false);
  const [fileUploader, setFileUploader] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(0);

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
    setTotal(files.length);

    if(state.imgList.length + files.length > 5) {
      alert("최대 5개까지 파일을 업로드 할수 있습니다.");
      return;
    }

    const maxSize = 1024 * 1000 * 20;
    for(const [index, file] of files.entries()) {
      if(file.size > maxSize) {
        alert("한 파일당 최대 20MB까지 업로드 가능합니다.");
        return;
      }
    }

    setFileUploader(true);
    const results = [];
    for(const [index, file] of files.entries()) {
      const param = { index, file, token, files: files.length, onProgress };
      setCurrent(index + 1);
      try {
        const res = await File.postImage(param);
        results.push(res.data);
      } catch(error) {
        console.log(error.response);        
      }
    }
    setFileUploader(false);
    setState({
      ...state,
      imgList: state.imgList.concat(results)
    });
  }

  const onProgress = (index, files, percent) => {
    const full = 100 / files;
    const p = ((full / 100) * percent) + (full * index);
    setValue(p);
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
    setLoading(true);
    try {
      const res = await Meet.postMeet(param);
      if(res !== undefined) {
        history.push("/");
      }
    } catch(error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>등록</TitleHeader>} loading={loading}>
      <ImageList imgList={state.imgList} onFileChange={handleFileChange} onRemoveClick={onRemoveClick} />
      {fileUploader && <FileUploader total={total} current={current} value={value} />}
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

