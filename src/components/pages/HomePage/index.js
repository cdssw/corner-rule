import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, Header, CardList, PlaceSearch } from "components";
import * as Meet from "../../../services/Meet";

export default function HomePage() {
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [items, setItems] = useState([]);
  const [place, setPlace] = useState(10);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const handlePlace = event => {
    setPlace(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  useEffect(e => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async event => {
    const response = await Meet.getMeetListByPage({page: page, size: size})
    setPage(page + 1);
    setItems(items.concat(response.data.content));
  }

  return (
    <PageTemplate header={<Header userInfo={userInfo} />}>
      <PlaceSearch place={place} onPlace={handlePlace} onInput={handleSearch} />
      <CardList fetchMoreData={fetchMoreData} items={items} />
    </PageTemplate>
  );
}
