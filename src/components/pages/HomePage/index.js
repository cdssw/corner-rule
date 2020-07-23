import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, Header, CardList, InputIcon } from "components";
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function HomePage() {
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [items, setItems] = useState([]);
  const [place, setPlace] = React.useState('');

  const handleChange = (event) => {
    setPlace(event.target.value);
  };

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
      <div>
        <Select
          labelId="place-id"
          id="place-select"
          value={place}
          onChange={handleChange}
        >
          <MenuItem value={10}>역북동</MenuItem>
          <MenuItem value={20}>동부동</MenuItem>
          <MenuItem value={30}>김량장동</MenuItem>
        </Select>
        <InputIcon icon={<SearchIcon />} />
      </div>
      <CardList fetchMoreData={fetchMoreData} items={items} />
    </PageTemplate>
  );
}
