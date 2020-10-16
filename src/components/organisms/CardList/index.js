import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "components";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function CardList(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div className={classes.root}>
        <InfiniteScroll
          dataLength={props.items.length}
          next={props.fetchMoreData}
          hasMore={true}
        >
          {props.items.map((item, index) => (
            <Card key={index} image={item.imgList.length > 0 && true} item={item}
             onContentClick={() => history.push({
               pathname: '/content/' + item.id,
               state: {path: props.path}
             })} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
