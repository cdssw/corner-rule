import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './styles.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    height: '100%',
    flex: 1,
    position: 'relative',
  },
  arrowWrap: {
    padding: '13px 0 5px 10px',
    zIndex: 1,
    position: 'absolute',
  },
  arrow: {
    color: 'white',
  },
  carouselWrap: {
    position: 'absolute',
    width: '100%',
    heigth: '269px',
  },
}));

export default function ImageHeader(props) {
  const classes = useStyles();
  const history = useHistory();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if(props.imgPath.data !== undefined) {
      const imgList = Array.from(props.imgPath.data).map(img => {
        return {original: process.env.REACT_APP_IMAGE + img.path + '/' + img.chgFileNm};
      });
      setImages(imgList);
    }
  }, [props.imgPath]);

  const handleBack = e => {
    props.onBack ? props.onBack() : history.goBack(1);
  }

  return (
    <div className={classes.root}>
      <div className={classes.arrowWrap}>
        <ArrowBackIcon className={classes.arrow} onClick={handleBack} />
      </div>
      <div className={classes.carouselWrap}>
        <ImageGallery
          items={images}
          showNav={false}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
        />
      </div>
    </div>
  );
}
