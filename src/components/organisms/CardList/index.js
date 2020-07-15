import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../../molecules/Card';

const useStyles = makeStyles((theme) => ({
  card_list_wrap: {
    padding: '0 10px',
  },
  card_list: {
    position: 'relative',
    top: '-15px',
    height: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
}));

export default function (props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.card_list_wrap}>
        <div className={classes.card_list}>
          <InfiniteScroll
            dataLength={props.items.length}
            next={props.fetchMoreData}
            hasMore={true}
          >
            {props.items.map((i, index) => (
              <Card key={index} index={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </React.Fragment>
  );
}
