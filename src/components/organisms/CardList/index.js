import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "components";

const useStyles = makeStyles((theme) => ({
  card_list: {
    // width: '100%',
  },
}));

export default function CardList(props) {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
}
