import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Utils from "../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
    marginBottom: '15px',
  },
  titleWrap: {
    display: 'flex',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: '13px',
    color: '#919394',
  },
  titleBottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commWrap: {
    display: 'flex',
    fontSize: '15px',
    color: '#95989A',
    right: '10px',
    display: 'flex',
    '& div': {
      paddingLeft: '2px',
    },
    '& .ico': {
      paddingTop: '2px',
    },
  },
  space: {
    flexGrow: 1,
  }
}));

export default function Content({userInfo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <div className={classes.space}>
          <div className={classes.title}>아이돌봄 구합니다.</div>
          <div className={classes.titleBottom}>
            <div className={classes.date}>9.27 14:10</div>
            <div className={classes.space}></div>
            <div className={classes.commWrap}>
              <div className="ico"><ForumIcon fontSize="small" /></div>
              <div>5</div>
              <div className="ico"><PermIdentityIcon fontSize="small" /></div>
              <div>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
