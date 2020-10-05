import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './styles.css';

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

export default function ImageHeader({imgPath, history, path}) {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if(imgPath.data !== undefined) {
      const imgList = Array.from(imgPath.data).map(img => {
        return {original: process.env.REACT_APP_IMAGE + img.path + '/' + img.chgFileNm, originalClass: {height: '269px'}};
      });
      setImages(imgList);
    }
  }, [imgPath]);

  const handleBack = e => {
    path ? history.push(path) : history.goBack(path);
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
