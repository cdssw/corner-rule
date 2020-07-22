import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, Header, CardList } from "components";

export default function HomePage() {
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [items, setItems] = useState([]);

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
      <CardList fetchMoreData={fetchMoreData} items={items} />
    </PageTemplate>
  );
}