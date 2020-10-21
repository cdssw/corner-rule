import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, Alert } from "components";
import PlaceSelect from '../../organisms/PlaceSelect';
import * as Addr from "../../../services/Addr";
import * as User from "../../../services/User";
import Utils from "../../Utils";

export default function HopePlacePage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
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

  useEffect(e => {
    getSidoList();
  }, []);

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
    const token = JSON.parse(localStorage.getItem("token")).access_token;
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

  if(!login) return <Redirect to='/' />

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

