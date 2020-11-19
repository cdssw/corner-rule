import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ImageList, RegForm, FileUploader } from "components";
import * as File from "../../../services/File";
import * as Meet from "../../../services/Meet";
import Utils from "../../Utils";

export default function RegPage(props) {
  const history = useHistory();
  const { login } = useSelector(state => state.userInfo, []);
  const [loading, setLoading] = useState(false);
  const [fileUploader, setFileUploader] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  const [state, setState] = useState({
    title: '',
    titleValid: null,
    content: '',
    contentValid: null,
    recruitment: '',
    recruitmentValid: null,
    cost: '',
    costOption: false,
    address: {
      address1: '',
      address2: '',
      address2Valid: null,
      sido: '',
      sgg: '',
    },
    term: {
      startDt: '',
      endDt: '',
      startTm: '09:00',
      endTm: '18:00',
      detailDay: 0,
      detailDayValid: null
    },
    imgList: [],
  });

  useEffect(e => {
    if(props.match.params.id) {
      getMeet(token);
    } else {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setState({
        ...state,
        term: {
          ...state.term,
          startDt: today.toISOString().substring(0, 10),
          endDt: nextWeek.toISOString().substring(0, 10),
        }
      });
    }
  }, []);

  useEffect(e => {
    if(props.location.state === undefined) return;
    // 주소검색 페이지에서 돌아올때 위치 조정
    const current = props.location.state;
    setState(current);
    window.scrollTo(0, document.body.scrollHeight); // 맨아래로 스크롤
  }, [props.location.state]);

  useEffect(() => {
    if(state.cost === '') return;
    setState({
      ...state,
      cost: state.cost.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    });
  }, [state.cost]);  

  useEffect(() => {
    if(state.recruitment === '') return;
    setState({
      ...state,
      recruitment: state.recruitment.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    });
  }, [state.recruitment]);   

  const getMeet = async token => {
    setLoading(true);
    try {
      // meet 정보
      const meet = await Meet.getMeet({id: props.match.params.id, token: token});
      let loadState = {
        title: meet.data.title,
        titleValid: true,
        content: meet.data.content,
        contentValid: true,
        recruitment: meet.data.recruitment.toString(),
        recruitmentValid: true,
        cost: meet.data.cost.toString(),
        costOption: meet.data.costOption,
        address: {
          address1: meet.data.address.address1,
          address2: meet.data.address.address2,
          address2Valid: true,
          sido: meet.data.address.sido,
          sgg: meet.data.address.sgg,
        },
        term: {
          startDt: meet.data.term.startDt,
          endDt: meet.data.term.endDt,
          startTm: meet.data.term.startTm,
          endTm: meet.data.term.endTm,
          detailDay: meet.data.term.detailDay,
          detailDayValid: true
        },
        imgList: [],
      }

      // 첨부이미지 정보
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        let imageList = await File.postImagesPath({fileList: meet.data.imgList});
        imageList = imageList.data.map(m => {
          m.filePath = m.path + '/' + m.chgFileNm;
          return m;
        });
        loadState = {
          ...loadState,
          imgList: imageList
        };
        setState(loadState);
      } else {
        setState(loadState);
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'startDt':
      case 'endDt':
      case 'startTm':
      case 'endTm':
        setState({
          ...state,
          term: {
            ...state.term,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value !== null
          }
        });
        break;
      case 'detailDay': {
        setState({
          ...state,
          term: {
            ...state.term,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value
          }
        });
        break;
      }
      case 'address2':
        setState({
          ...state,
          address: {
            ...state.address,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value
          }
        });
        break;
      case 'cost': {
        const regex = /^[1-9]+[0-9]*$/;
        if (e.target.value === '' || regex.test(e.target.value.replace(/,/g, ''))) {
          setState({
            ...state,
            [e.target.name]: e.target.value,
          });
        }
        break;
      }
      case 'recruitment': {
        const regex = /^[1-9]+[0-9]*$/;
        if (e.target.value === '' || regex.test(e.target.value.replace(/,/g, ''))) {
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value !== ''
          });
        }
        break;
      }
      default:
        setState({
          ...state,
          [e.target.name]: e.target.value,
          [e.target.name + 'Valid']: e.target.value
        });
        break;
    }
  }

  const handleFileChange = async e => {
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
        Utils.alertError(error);
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

  const handleRemoveClick = id => {
    setState({
      ...state,
      imgList: state.imgList.filter(img => img.id !== id)
    });
  }

  const handleSaveClick = async e => {
    let param = {
      token: token,
      body: {
        ...state,
        cost: state.cost.replace(/,/g, ''),
        imgList: state.imgList.map(i => i.id)
      }
    }
    setLoading(true);
    try {
      if(props.match.params.id) {
        param = {
          ...param,
          id: props.match.params.id
        }
        const res = await Meet.putMeet(param);
        if(res !== undefined) {
          history.replace({
            pathname: '/content/' + props.match.params.id,
            state: {path: null}
          });
        }
      } else {
        const res = await Meet.postMeet(param);
        if(res !== undefined) {
          history.replace({
            pathname: '/content/' + res.data,
            state: {path: null}
          });
        }
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddress = e => {
    history.push({
      pathname: '/address',
      state: state
    });
  }

  const handleBack = e => {
    history.replace('/');
  }

  if(!token) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>글쓰기</TitleHeader>} loading={loading}>
      <ImageList imgList={state.imgList} onFileChange={handleFileChange} onRemoveClick={handleRemoveClick} />
      {fileUploader && <FileUploader total={total} current={current} value={value} />}
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      <div style={{marginBottom: '20px'}}></div>
      <RegForm
        state={state}
        onInputChange={handleInputChange}
        onSaveClick={handleSaveClick}
        onAddress={handleAddress}
      />
    </PageTemplate>
  );
}

