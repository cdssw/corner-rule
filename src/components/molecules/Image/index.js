import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  img: {
    position: 'relative',
    '& img': {
      borderRadius: '5px',
      border: '1px solid #5a6482',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  imgWrap: {
    '& > img': {
      width: '20px',
      height: '20px',
      position: 'absolute',
      zIndex: 1,
    }
  },
  addWrap: {
    position: 'relative',
  },
  add: {
    border: '1px solid #949494',
    borderRadius: '5px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Image({file, onRemoveClick, onFileChange, width = '100', height = '100'}) {
  const classes = useStyles();
  const fileRef = useRef();

  const handleClick = e => {
    fileRef.current.click();
  }

  return (
    <div className={classes.root}>
      {file
        ?
          <div className={classes.imgWrap}>
            <img alt="remove" src={process.env.PUBLIC_URL + "/images/remove.svg"} style={{left: width - 14, top: height - height - 6}} onClick={onRemoveClick} />
            <div className={classes.img} style={{width: width + 'px', height: height + 'px'}}>
              <img alt="img" src={process.env.PUBLIC_URL + file} />
            </div>
          </div>
        :
          <div className={classes.addWrap} style={{width: width + 'px', height: height + 'px'}}>
            <div className={classes.add} onClick={handleClick}>
              <img src={resources.add} alt='add' />
            </div>
            <input ref={fileRef} type="file" multiple name="file" onChange={onFileChange} style={{display: 'none'}} />
          </div>        
      }
    </div>
  );
}
