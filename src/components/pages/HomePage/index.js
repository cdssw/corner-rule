import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, Header, CardList, PlaceSearch } from "components";
import * as User from "../../../services/User";
import * as Meet from "../../../services/Meet";

export default function HomePage() {
  const { userInfo, login } = useSelector(state => state.userInfo, {});
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [place, setPlace] = useState(10);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const size = 10;

  const handlePlace = event => {
    setPlace(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  useEffect(e => {
    const token = localStorage.getItem("token");
    if(token) { // 로그인 되어 있으면 user정보 복구
      loadUserInfo(JSON.parse(token));
    } else {
      fetchMoreData();
    }
  }, []);

  const loadUserInfo = async token => {
    const userInfo = await User.getUserCall(token);
    dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
    dispatch(setLogin(true)); // login 상태로 처리
    fetchMoreData();
  }

  const fetchMoreData = async event => {
    const response = await Meet.getMeetListByPage({page: page, size: size})
    setPage(page + 1); // infinite scroll시 다음페이지 조회
    setItems(items.concat(response.data.content));
  }

  const path = userInfo ? '/mypage' : '/login';
  return (
    <PageTemplate header={<Header userInfo={userInfo} path={path} />}>
      {login && 
        <>
          <PlaceSearch place={place} onPlace={handlePlace} onSearch={handleSearch} search={search} login={login} />
          <div style={{borderBottom: '1px solid #dfdfdf'}} />
        </>
      }
      <div style={{marginBottom: '10px'}}></div>
      <CardList fetchMoreData={fetchMoreData} items={items} />
    </PageTemplate>
  );
}

