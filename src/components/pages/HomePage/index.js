import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, Header, CardList, PlaceSearch } from "components";

export default function HomePage() {
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [items, setItems] = useState([]);
  const [place, setPlace] = useState(10);
  const [search, setSearch] = useState('');

  const handlePlace = event => {
    setPlace(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  useEffect(e => {
    setItems(Array.from({length: 20}));
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({length: 20})));
    }, 500);
  }

  return (
    <PageTemplate header={<Header userInfo={userInfo} />}>
      <PlaceSearch place={place} onPlace={handlePlace} onInput={handleSearch} />
      <CardList fetchMoreData={fetchMoreData} items={items} />
    </PageTemplate>
  );
}
