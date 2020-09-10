import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../molecules/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
    margin: '13px 5px',
    '& div': {
      marginRight: '3px',
    }
  },
}));

export default function ImageList({imgList}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {imgList.map((v, i) => {
        return <Image key={i} width="90" height="90" />
      })}
      {imgList.length < 5 && <Image width="90" height="90" />}
    </div>
  );
}
