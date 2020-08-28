import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, Header, CardList, PlaceSearch } from "components";
import * as Meet from "../../../services/Meet";

export default function HomePage() {
  const { userInfo, login } = useSelector(state => state.userInfo, {});
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
    fetchMoreData(); // 최초에 한번만 로딩
  }, []);

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

