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
    padding: '9px 0 5px 0',
  },
  title: {
    color: theme.color.green,
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '1rem',
    textAlign: 'center',
  },
  space: {
    width: '14px',
  },
  btnRoot: {
    padding: 0,
    marginLeft: '10px',
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

  const renderSubMenu = () => {
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

  return (
    <div className={classes.root}>
      <div className={classes.arrowWrap}>
        <img onClick={handleBack} src={resources.arrowLeft} alt="arrowLeft" />
      </div>
      <div className={classes.title}>{props.children}</div>
      {props.sub ? renderSubMenu() : <div className={classes.space}></div>}
    </div>
  );
}
