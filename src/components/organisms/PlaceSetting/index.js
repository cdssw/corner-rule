import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '10px',
  },
  placeWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > button': {
      padding: '5px 5px',
      margin: '0 5px',
      flex: '1 1 0',
    },
  },
  title: {
    margin: '0 5px 7px 5px',
    color: '#707070',
  },
  buttonTextColor: {
    color: '#707070',
    fontSize: '0.8rem',
    lineHeight: '17px',
  }, 
}));

export default function PlaceSetting({userInfo, onAddClick, onPlaceClick}) {
  const classes = useStyles();
  const { hopePlaceList } = userInfo;

  return (
    <div className={classes.root}>
      <div className={classes.title}>희망지역</div>
      <div className={classes.placeWrap}>
        {hopePlaceList && hopePlaceList.map((v, i) => {
          return (
            <Button key={i} id={v.id} classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" onClick={onPlaceClick}>
              {v.sido + ' ' + v.sgg}
            </Button>  
          );
        })}
        {Array.from(Array(3 - hopePlaceList.length)).map((_, i) => {
          return (
            <Button key={i} classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" onClick={onAddClick}>
              <AddIcon />
            </Button>
          )
        })}
      </div>
    </div>
  );
}
