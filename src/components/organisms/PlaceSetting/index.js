import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as resources from "constants/resources";

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
      padding: '9px 5px',
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
  
  return (
    <div className={classes.root}>
      {userInfo &&
        <>
          <div className={classes.title}>관심지역</div>
          <div className={classes.placeWrap}>
            {userInfo.hopePlaceList && userInfo.hopePlaceList.map((v, i) => {
              return (
                <Button key={i} id={v.id} classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" onClick={onPlaceClick}>
                  {v.sido + ' ' + v.sgg}
                </Button>  
              );
            })}
            {Array.from(Array(3 - userInfo.hopePlaceList.length)).map((_, i) => {
              return (
                <Button key={i} classes={{label: classes.buttonTextColor}} variant="outlined" onClick={onAddClick}>
                  <img src={resources.add} alt='add' style={{width: '15px'}} />
                </Button>
              )
            })}
          </div>
        </>
      }
    </div>
  );
}
