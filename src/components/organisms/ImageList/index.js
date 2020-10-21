import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../molecules/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
    padding: '13px 0',
    overflowX: 'auto', 
  },
}));

export default function ImageList({imgList, onFileChange, onRemoveClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{width: window.innerWidth - 20}}>
      {imgList.map((img, i) => {
        return (
          <div key={i} style={{paddingRight: '10px'}}>
            <Image file={process.env.REACT_APP_IMAGE + img.filePath} onFileChange={onFileChange} onRemoveClick={() => onRemoveClick(img.id)} />
          </div>
        )
      })}
      {imgList.length < 5 && <Image onFileChange={onFileChange} />}
    </div>
  );
}
