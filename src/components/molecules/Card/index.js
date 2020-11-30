import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Utils from "../../Utils";
import { Badge } from '@material-ui/core';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    marginBottom: '10px',
    border: '1px solid ' + theme.color.border,
    borderRadius: '5px',
  },
  img: {
    padding: '10px 0 10px 10px',
    boxSizing: 'border-box',
    overflow: 'hidden',    
    width: '110px',
    height: '110px',
    flexShrink: 0,
    '& img': {
      borderRadius: '5px',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  content: {
    flexGrow: 1,
    boxSizing: 'border-box',
    padding: '10px',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoB00',
    color: '#3e3e3e',
    textOverflow: 'ellipsis',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  address: {
    top: '31px',
    color: '#707070',
    fontSize: '12px'
  },
  date: {
    display: 'flex',
    marginTop: '5px',
    color: '#707070',
    width: '100%',
    '& div:nth-child(2)': {
      fontSize: '13px',
    }
  },
  alarm: {
    paddingRight: '5px',
  },
  approval: {
    padding: '1px 10px 0',
    borderRadius: '5px',
    backgroundColor: theme.color.red,
    color: theme.color.white,
    textAlign: 'center',
    fontSize: '14px',
  },
  badgeGreen: {
    border: '1px solid white',
    backgroundColor: theme.color.green,
  },
  badgeRed: {
    border: '1px solid white',
    backgroundColor: theme.color.red,
  },
  chat: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.color.green,
    color: theme.color.white,
    borderRadius: '5px',
    padding: '0 5px',
  },
  application: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.color.red,
    color: theme.color.white,
    borderRadius: '5px',
    padding: '0 5px',
  },
  day: {
    color: theme.color.green,
  },
  info: {
    boxSizing: 'border-box',
    display: 'flex',
    '& .costWrap': {
      padding: '0 10px',
      borderRadius: '15px',
      border: '1px solid ' + theme.color.green,
      height: '22px',
      display: 'flex',
      alignItems: 'center',
      '& .cost': {
        paddingTop: '2px',
        color: theme.color.green,
        fontSize: '14px',
      },
    },
    '& .commWrap': {
      fontSize: '15px',
      color: '#95989A',
      display: 'flex',
      '& div': {
        paddingLeft: '2px',
      },
      '& .ico': {
        paddingTop: '2px',
      },
    },
  },
  space: {
    flexGrow: 1,
  }
}));

export default function Card({item, image, onContentClick}) {
  const classes = useStyles();
  const filter = "win16|win32|win64|mac|macintel";
  const mobile = filter.indexOf(navigator.platform.toLocaleLowerCase()) < 0;

  return (
    <div className={classes.root} onClick={onContentClick}>
      {image &&
        <div className={classes.img}>
          <img alt="img" src={process.env.REACT_APP_IMAGE + item.imgList[0].path + '/' + item.imgList[0].chgFileNm} />
        </div>
      }
      <div style={{maxWidth: image && 'calc(100% - 110px)'}} className={classes.content}>
        <div className={classes.title}>{item.title}</div>
        <div className={classes.address}>{item.address.sgg}</div>
        <div className={classes.date}>
          <div className={classes.alarm}><img src={resources.alarm} alt="alarm" /></div>
          {item.term.tmOption
            ? <div>시간협의 <span className={classes.day}>{Utils.detailDay(item.term)}</span></div>
            : <div>{item.term.startTm}~{item.term.endTm} <span className={classes.day}>{Utils.detailDay(item.term)}</span></div>
          }
          <div className={classes.space}></div>

          {item.chatCnt ? item.chatUnread > 0 &&
            <>
            <Badge classes={{badge: classes.badgeGreen}} badgeContent={item.chatUnread} color="primary">
              <div className={classes.chat}>
                <img style={{width: '12px'}} src={resources.chatWhite} alt="chat_white" />
              </div>
            </Badge>
            <div style={{width: '10px'}}></div>
            </>
            : ''
          }
          {item.toApprovalCnt ? item.toApprovalCnt > 0 &&
            <>
            <Badge classes={{badge: classes.badgeRed}} badgeContent={item.toApprovalCnt} color="secondary">
              <div className={classes.application}>
                <img style={{width: '12px'}} src={resources.application} alt="application" />
              </div>
            </Badge>
            <div style={{width: '10px'}}></div>
            </>
            : ''
          }
          {item.approval ? item.approval.approvalYn && <div className={classes.approval}>승인완료</div> : ''}
        </div>
        <div className={classes.info}>
          <div style={{padding: mobile && '0 10px 2px'}} className="costWrap">
            <div className="cost">{item.cost === 0 ? 'Free' : `￦ ` + Utils.numberWithCommas(item.cost)}</div>
          </div>
          <div className={classes.space}></div>
          <div className="commWrap">
            <div className="ico"><img src={resources.chat} alt="chat" /></div>
            <div>{item.chatCnt}</div>
            <div className="ico"><img src={resources.userGray} alt="user_gray" /></div>
            <div>{item.recruitment - item.application}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
