import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#f6f6f6',
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '10px',
    marginBottom: '10px',
    paddingBottom: '30%',
  },
  card_img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '30%',
    padding: '7px',
    boxSizing: 'border-box',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
    },
  },
  card_content: {
    position: 'absolute',
    width: '70%',
    top: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box',
    '& .title': {
      position: 'absolute',
      top: '10%',
      fontWeight: 'bold',
      color: '#2D3057',
      fontSize: '1rem'
    },
    '& .star': {
      position: 'absolute',
      top: '10%',
      right: '10px',
      color: '#FF507C'
    },
    '& .address': {
      position: 'absolute',
      top: '30%',
      fontSize: '0.9rem',
      color: '#8154FF',
      fontWeight: 'bold',
    },
    '& .date': {
      position: 'absolute',
      top: '47%',
      fontSize: '1rem',
      color: '#2D3057',
    },
    '& .info_container': {
      position: 'absolute',
      top: '70%',
      boxSizing: 'border-box',
      height: '30px',
      width: '100%',
      '& .cost': {
        position: 'absolute',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#F85D84',
      },
      '& .attend_title': {
        position: 'absolute',
        fontSize: '1rem',
        color: '#18AA49',
        right: '10px',
      },
    },
  },
}));

export default function Card(props) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.card_img}>
        <img src={process.env.PUBLIC_URL + "/images/street1.png"} />
      </div>
      <div className={classes.card_content}>
        <div className="title">{Math.random().toString(36).substr(2,11)} {props.index}</div>
        <StarIcon className="star" />
        <div className="address">{Math.random().toString(36).substr(2,11)}</div>
        <div className="date">2020년 {Math.floor(1 + (Math.random() * (12-7)))}월 {Math.floor(1 + (Math.random() * (31-1)))}일 {Math.floor(1 + (Math.random() * (24-1)))}:{Math.floor(1 + (Math.random() * (59-1)))}분</div>
        <div className="info_container">
          <div className="cost">￦{Math.floor(0 + (Math.random() * (100000-0))).toLocaleString()}</div>
          <div className="attend_title">모집중 {Math.floor(1 + (Math.random() * (5-1)))}/{Math.floor(5 + (Math.random() * (10-5)))}</div>
        </div>
      </div>
    </div>
  );
}
