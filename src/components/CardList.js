import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MCard from "./MCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  card_list_wrap: {
    padding: '0 10px',
  },
  card_list: {
    position: 'relative',
    top: '-15px',
    height: '100%',
    maxWidth: '600px',
    margin: '0 10px',
  },
}));

export default function CardList() {
  const classes = useStyles();
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
    <React.Fragment>
      <div className={classes.card_list_wrap}>
        <div className={classes.card_list}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
          >
            {items.map((i, index) => (
              <MCard index={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </React.Fragment>
  );
}
