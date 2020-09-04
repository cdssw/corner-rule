import React from 'react';
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
  }, 
}));

export default function PlaceSetting(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>희망지역</div>
      <div className={classes.placeWrap}>
        <Button classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" id="place1" onClick={props.onClick}><AddIcon /></Button>
        <Button classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" id="place2" onClick={props.onClick}><AddIcon /></Button>
        <Button classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" id="place3" onClick={props.onClick}><AddIcon /></Button>
      </div>
    </div>
  );
}
