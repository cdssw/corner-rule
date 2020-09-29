import React from 'react';
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

export default function ImageHeader({children, history, path}) {
  const classes = useStyles();

  const images = [
    {
      original: 'https://picsum.photos/id/1018/600/269/',
      originalClass: {height: '100px'}
    },
    {
      original: 'https://picsum.photos/id/1015/600/269/',
    },
    {
      original: 'https://picsum.photos/id/1019/375/269/',
    },
  ];

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
