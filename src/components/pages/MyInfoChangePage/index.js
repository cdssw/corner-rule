import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, MyInfoForm, Confirm } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import Utils from "../../Utils";
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLoginUserInfo } from '../../../modules/userInfo';

export default function MyInfoChangePage(props) {
  const history = useHistory();
  const { userInfo } = useSelector(state => state.userInfo, []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [state, setState] = useState({
    phone: '',
    mainTalent: '',
    talent: [],
    interest: [],
    avatarPath: '',
    phoneValid: null,
  });
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(() => {
    if(token && !userInfo) {
      loadUserInfo();
    }
  }, []);

  useEffect(e => {
    if(userInfo) {
      setState({
        ...state,
        phone: userInfo.phone,
        mainTalent: userInfo.mainTalent,
        talent: userInfo.talent === '' ? [] : userInfo.talent.split(','),
        interest: userInfo.interest === '' ? [] : userInfo.interest.split(','),
        avatarPath: userInfo.avatarPath,
      });
    }
  }, [userInfo]);
    
  useEffect(() => {
    if(state.phone.replace(/-/g, '').length === 10) {
      setState({
        ...state,
        phone: state.phone.replace(/-/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
        phoneValid: true,
      });
    }
    if(state.phone.replace(/-/g, '').length === 11) {
      setState({
        ...state,
        phone: state.phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        phoneValid: true,
      });
    }
  }, [state.phone]);  

  const loadUserInfo = async e => {
    setLoading(true);
    try {
      const res = await User.getUser(token);
      dispatch(setLoginUserInfo(res.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    handleEditUser();
  };

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'phone':
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value.replaceAll('-', '').length >= 10,
          });
        }
        break;      
      case 'talent':
      case 'interest':
        setState({
          ...state,
          [e.target.name]: state[e.target.name].concat(e.target.value)
        });
        break;
      default:
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
        break;
    }
  }  

  const handleChipDelete = e => {
    setState({
      ...state,
      [e.name]: state[e.name].filter(chip => chip !== e.value)
    });
  }

  const handleSetAvatar = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    setLoading(true);
    try {
      const response = await File.postAvatar(file);
      // 결과에 따라 set
      if(response) {
        setState({
          ...state,
          avatarPath: response.data.filePath
        });
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }  

  const handleEditUser = async e => {
    const body = {
      phone: state.phone,
      mainTalent: state.mainTalent,
      talent: state.talent.join(','),
      interest: state.interest.join(','),
      avatarPath: state.avatarPath
    }
    const param = { token: token, body };
    setLoading(true);
    try {
      const response = await User.putEditUser(param);
      // 결과에 따라 set
      if(response) {
        history.push('/mypage');
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
  }

  if(!token) return <Redirect to='/login' />

  return (
    <PageTemplate loading={loading} header={<TitleHeader {...props}>정보수정</TitleHeader>}>
      <MyInfoForm
        state={state}
        onInputChange={handleInputChange}
        onSetAvatar={handleSetAvatar}
        onChipDelete={handleChipDelete}
        onEditUser={handleConfirmOpen}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={'정보수정 완료하시겠습니까?'}
        content='모든 정보는 즉시 반영됩니다.'
      />
    </PageTemplate>
  );
}
