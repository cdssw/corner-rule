import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#5475FF',
    height: '107px',
  },
  header: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: '500px',
  },
  logo: {
    position: 'relative',
    top: '30px',
    left: '48%',
    transform: 'translate(-50%)',
    width: '120px',
  },
  name: {
    color: 'white',
    fontSize: '12px',
    position: 'absolute',
    right: '37px',
    top: '40px',
  },
  avatar: {
    position: 'absolute',
    right: '0px',
    top: '35px',
    border: '2px solid white',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  card: {
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
    height: '170px',
    borderRadius: '10px',
    top: '45px',
    maxWidth: '500px',
    padding: 0,
  },
  card_content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    '& img': {
      width: '150px',
      height: '150px',
      margin: '10px',
      borderRadius: '5px',
    },
    '& .title': {
      position: 'absolute',
      left: '170px',
      top: '10px',
      fontWeight: 'bold',
      color: '#2D3057',
      fontSize: '15px'
    },
    '& .star': {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: '#FF507C'
    },
    '& .address': {
      position: 'absolute',
      left: '170px',
      top: '30px',
      fontSize: '10px',
      color: '#2D305770',
    },
    '& .desc': {
      position: 'absolute',
      left: '170px',
      top: '50px',
      fontSize: '12px',
      color: '#2D3057',
    },
    '& .date': {
      position: 'absolute',
      left: '170px',
      top: '70px',
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#2D3057',
    },
    '& .time': {
      position: 'absolute',
      left: '170px',
      top: '90px',
      fontSize: '11px',
      color: '#2D3057',
    },
    '& .info_container': {
      position: 'absolute',
      top: '110px',
      '& .cost_container': {
        position: 'absolute',
        left: '170px',
        border: '2px solid #DDE3F6',
        borderRadius: '5px',
        width: '80px',
        height: '47px',
        '& .cost_title': {
          position: 'absolute',
          top: '3px',
          fontSize: '8px',
          color: '#2D3057',
          left: '50%',
          transform: 'translate(-50%)'
        },
        '& .cost': {
          position: 'absolute',
          fontSize: '18px',
          top: '17px',
          fontWeight: 'bold',
          color: '#2D3057',
          left: '50%',
          transform: 'translate(-50%)'
        },
      },
      '& .inter_container': {
        position: 'absolute',
        left: '260px',
        border: '2px solid #DDE3F6',
        borderRadius: '5px',
        width: '50px',
        height: '47px',
        '& .inter_title': {
          position: 'absolute',
          top: '3px',
          fontSize: '8px',
          color: '#2D3057',
          left: '50%',
          transform: 'translate(-50%)'
        },
        '& .inter': {
          position: 'absolute',
          fontSize: '18px',
          top: '17px',
          fontWeight: 'bold',
          color: '#13E1B0',
          left: '50%',
          transform: 'translate(-50%)'
        },
      },
      '& .attend_container': {
        position: 'absolute',
        left: '320px',
        border: '2px solid #DDE3F6',
        borderRadius: '5px',
        width: '118px',
        height: '47px',
        '& .attend_title': {
          position: 'absolute',
          top: '3px',
          fontSize: '8px',
          color: '#2D3057',
          left: '10px',
          '& span': {
            position: 'absolute',
            right: '-55px',
          },
        },
        '& .attend_graph': {
          position: 'absolute',
          top: '24px',
          color: '#13E1B0',
          left: '50%',
          height: '15px',
          width: '90%',
          transform: 'translate(-50%)',
          borderRadius: '25px',
          backgroundColor: '#DDE3F6',
          '& span': {
            position: 'absolute',
            color: '#13E1B0',
            height: '15px',
            width: '50px',
            borderRadius: '25px',
            backgroundColor: '#1DDCAF',
          }
        },
      },
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main">
      <div className={classes.header}>
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo_small.png"} />
        <div className={classes.name}>홍길동</div>
        <Avatar className={classes.avatar} alt="Remy Sharp" src={process.env.PUBLIC_URL + "/images/foreigner1.png"} />
      </div>
      <Container component="div" className={classes.card}>
        <div className={classes.card_content}>
          <img src={process.env.PUBLIC_URL + "/images/street1.png"} />
          <div className="title">테스트 모임</div>
          <StarIcon className="star" />
          <div className="address">경기도 용인시 처인구</div>
          <div className="desc">테스트 모임 설명입니다. 진행테스트...</div>
          <div className="date">2020년 7월 1일</div>
          <div className="time">06:00 PM부터 11:00PM까지</div>
          <div className="info_container">
            <div className="cost_container">
              <div className="cost_title">예상비용</div>
              <div className="cost">10,000</div>
            </div>
            <div className="inter_container">
              <div className="inter_title">관심</div>
              <div className="inter">17</div>
            </div>
            <div className="attend_container">
              <div className="attend_title">참석인원<span>3/8</span></div>
              <div className="attend_graph"><span></span></div>
            </div>

          </div>
        </div>
      </Container>
    </Container>
  );
}
