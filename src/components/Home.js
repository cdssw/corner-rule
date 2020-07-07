import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Avatar } from '@material-ui/core';
import CardList from './CardList';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: 0,
  },
  header: {
    position: 'relative',
    margin: '0 auto',
    boxSizing: 'border-box',
    height: '80px',
    backgroundColor: '#5475FF',
  },
  headerWrap: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '0 10px',
    maxWidth: '600px',
    position: 'relative',
    padding: '0 10px',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '48%',
    transform: 'translate(-50%)',
    width: '110px',
  },
  name: {
    color: 'white',
    fontSize: '0.9rem',
    position: 'absolute',
    right: '45px',
    top: '25px',
  },
  avatar: {
    position: 'absolute',
    right: '0px',
    top: '18px',
    border: '2px solid white',
    width: '33px',
    height: '33px',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main">
      <header className={classes.header}>
        <div className={classes.headerWrap}>
          <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo_small.png"} />
          <div className={classes.name}>홍길동</div>
          <Avatar className={classes.avatar} alt="Remy Sharp" src={process.env.PUBLIC_URL + "/images/foreigner1.png"} />
        </div>
      </header>
      <CardList />
    </Container>
  );
}
