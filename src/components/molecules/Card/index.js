import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ForumIcon from '@material-ui/icons/Forum';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    marginBottom: '10px',
    paddingBottom: '30%',
    border: '1px solid #EBEBEB',
    height: '120px',
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '35%',
    padding: '10px',
    boxSizing: 'border-box',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
    },
  },
  content: {
    padding: '10px',
    position: 'absolute',
    width: '68%',
    top: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box',
    '& .title': {
      position: 'absolute',
      top: '7%',
      fontWeight: 'bold',
      color: '#2D3057',
      fontSize: '0.9rem'
    },
    '& .addressWrap': {
      padding: '0 10px',
      top: '26%',
      position: 'absolute',
      border: '1px solid #707070',
      borderRadius: '12px',
      height: '23px',
      display: 'flex',
      alignItems: 'center',
      '& .address': {
        color: '#707070',
        fontSize: '0.8rem'
      },
    },
    '& .date': {
      position: 'absolute',
      top: '48%',
      color: '#707070',
      display: 'flex',
      '& div': {
        paddingRight: '3px',
      },
      '& div:nth-child(2)': {
        paddingTop: '2px',
      }
    },
    '& .info': {
      position: 'absolute',
      top: '70%',
      boxSizing: 'border-box',
      width: '100%',
      '& .costWrap': {
        padding: '0 10px',
        position: 'absolute',
        borderRadius: '12px',
        backgroundColor: '#FFC7E3',
        height: '23px',
        display: 'flex',
        alignItems: 'center',
        '& .cost': {
          paddingTop: '2px',
          color: '#FF3096',
          fontWeight: 'bold',
        },
      },
      '& .commWrap': {
        position: 'absolute',
        fontSize: '0.9rem',
        color: '#95989A',
        right: '20px',
        display: 'flex',
      },
    },
  },
}));

export default function Card(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.img}>
        <img src={process.env.PUBLIC_URL + "/images/back1.jpg"} />
      </div>
      <div className={classes.content}>
        <div className="title">Can you bring my child to me!!</div>
        <div className="addressWrap">
          <div className="address">처인구 역북동</div>
        </div>
        <div className="date">
          <div><CalendarTodayIcon fontSize="small" /></div>
          <div>7.10 - 8.10, 주말</div>
        </div>
        <div className="info">
          <div className="costWrap">
            <div className="cost">￦ 10,000</div>
          </div>
          <div className="commWrap">
            <div><ForumIcon fontSize="small" /></div>
            <div>5</div>
            <div><PermIdentityIcon fontSize="small" /></div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
