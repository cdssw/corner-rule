import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "components";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function CardList(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <InfiniteScroll
          dataLength={props.items.length}
          next={props.fetchMoreData}
          hasMore={true}
        >
          {props.items.map((item, index) => (
            <Card key={index} index={index} image={index % 3 === 0 && true} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
