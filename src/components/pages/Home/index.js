import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import HomeTemplate from '../../templates/HomeTemplate';
import Header from '../../organisms/Header';
import CardList from '../../organisms/CardList';

export default function Home() {
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
    <HomeTemplate
      header={<Header userInfo={userInfo} />}
      cardList={<CardList fetchMoreData={fetchMoreData} items={items} />}
    />
  );
}
