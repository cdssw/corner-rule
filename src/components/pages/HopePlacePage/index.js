import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageTemplate, TitleHeader, Alert } from "components";
import PlaceSelect from '../../organisms/PlaceSelect';
import * as Addr from "../../../services/Addr";
import * as User from "../../../services/User";
import Utils from "../../Utils";
import { setLogin, setLoginUserInfo } from '../../../modules/userInfo';

export default function HopePlacePage(props) {
  const history = useHistory();
  const { userInfo } = useSelector(state => state.userInfo, []);
  const dispatch = useDispatch();
  const [sidoList, setSidoList] = useState([]);
  const [sggList, setSggList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [state, setState] = useState({
    sido: '서울특별시',
    sgg: '',
    sggValid: null
  });
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(e => {
    if(token) {
      loadUserInfo();
    }
    getSidoList();
  }, []);

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

  const getSidoList = async event => {
    setLoading(true);
    try {
      const sidoRes = await Addr.getSidoList();
      setSidoList(sidoRes.data);
      const sggRes = await Addr.getSggList(state.sido);
      setSggList(sggRes.data);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectChange = e => {
    switch(e.target.name) {
      case 'sido':
        setState({
          sido: e.target.value,
          sgg: ''
        });
        getSggList(e.target.value);
        break;
      case 'sgg':
        setState({
          ...state,
          [e.target.name]: e.target.value,
          [e.target.name + 'Valid']: e.target.value
        });
        break;
    }
  }

  const getSggList = async sido => {
    setLoading(true);
    try {
      const sggRes = await Addr.getSggList(sido);
      setSggList(sggRes.data);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = async e => {
    if(userInfo.hopePlaceList.filter(v => v.sido === state.sido && v.sgg === state.sgg).length > 0) {
      setAlertContent('이미 등록되어 있습니다.');
      setAlertOpen(true);
      return;
    }

    // place 저장
    const body = state;
    const param = { token, body };
    setLoading(true);
    try {
      await User.postHopePlace(param);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }

    history.push("/mypage");
  }

  if(!token) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>관심지역 선택</TitleHeader>} loading={loading}>
      <PlaceSelect
        sidoList={sidoList}
        sggList={sggList}
        state={state}
        onSelectChange={handleSelectChange}
        onSelect={handleSelect}
      />
      <Alert
        state={alertOpen}
        onClose={() => {
          setAlertContent('');
          setAlertOpen(false);
        }}
        content={alertContent}
      />
    </PageTemplate>
  );
}

