import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageGallery from "react-image-gallery";
import * as resources from "constants/resources";
import "react-image-gallery/styles/css/image-gallery.css";
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    height: '100%',
    flex: 1,
    position: 'relative',
  },
  menuWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
  },
  arrowWrap: {
    left: '3px',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
  },
  arrow: {
    color: 'white',
  },
  carouselWrap: {
    position: 'absolute',
    width: '100%',
    height: '269px',
  },
  icoBtn: {
  },
}));

export default function ImageHeader(props) {
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
            classes={{root: classes.icoBtn}}
          >
            <img src={resources.subMenuWrap} alt="submenu-wrap" />
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
      <div className={classes.menuWrap}>
        <IconButton
          onClick={handleBack}
          classes={{root: classes.arrowWrap}}
        >
          <img src={resources.arrowLeftWrap} alt="arrowLeftWrap" />
        </IconButton> 
        <div onClick={props.onGrallery} className={classes.carouselWrap}>
          <ImageGallery
            items={props.images}
            showNav={false}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
          />
        </div>
        {props.sub && renderContent()}
      </div>
    </div>
  );
}
