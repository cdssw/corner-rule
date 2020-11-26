import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 20px',
    height: '100%',
    flex: 1,
    backgroundColor: theme.color.white,
  },
  arrowWrap: {
    left: '-10px',
  },
  title: {
    color: theme.color.green,
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '1rem',
    textAlign: 'center',
  },
  space: {
    width: '34px',
  },
  btnRoot: {
    borderRadius: 0,
    right: '-10px',
  },
}));

export default function TitleHeader(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBack = e => {
    props.onBack ? props.onBack() : history.goBack(1);
  }

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = e => {
    setAnchorEl(null);
  }

  const handleEnd = e => {
    handleClose();
    props.onMeetEnd();
  }

  const renderContent = () => {
    return (
        <>
          <IconButton
            onClick={handleClick}
            classes={{root: classes.btnRoot}}
          >
            <img src={resources.subMenu} alt="submenu" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={props.onModify}>수정하기</MenuItem>
            <MenuItem onClick={handleEnd}>종료하기</MenuItem>
          </Menu>
        </>
    )
  }

  const renderMyPage = () => {
    return (
        <>
          <IconButton
            onClick={handleClick}
            classes={{root: classes.btnRoot}}
          >
            <img src={resources.subMenu} alt="submenu" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={props.onMyInfoChange}>내 정보수정</MenuItem>
            <MenuItem onClick={props.onPasswordChange}>비밀번호 변경</MenuItem>
          </Menu>
        </>
    )
  }  

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBack}
        classes={{root: classes.arrowWrap}}
      >
        <img src={resources.arrowLeft} alt="arrowLeft" />
      </IconButton>      
      <div className={classes.title}>{props.children}</div>
      {props.sub === 'mypage'
        ? renderMyPage()
        : props.sub === 'content' ? renderContent() : <div className={classes.space}></div>
      }
    </div>
  );
}
