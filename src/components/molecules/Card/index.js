import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Utils from "../../Utils";
import * as resources from "constants/resources";

const cardTheme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        width: '0.7em',
        height: '0.8em',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    marginBottom: '10px',
    border: '1px solid #EBEBEB',
    height: '110px',
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'hidden',    
    width: '110px',
    height: '110px',
    '& img': {
      borderRadius: '5px',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  content: {
    position: 'absolute',
    left: '110px',
    top: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box',
    '& .title': {
      position: 'absolute',
      top: '9px',
      fontWeight: 'bold',
      color: '#3e3e3e',
      fontSize: '15px',
      textOverflow: 'ellipsis',
      width: '95%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    '& .addressWrap': {
      padding: '0 10px',
      top: '31px',
      position: 'absolute',
      border: '1px solid #707070',
      borderRadius: '12px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      '& .address': {
        color: '#707070',
        fontSize: '12px'
      },
    },
    '& .date': {
      position: 'absolute',
      top: '53px',
      color: '#707070',
      display: 'flex',
      width: '100%',
      '& div': {
        paddingRight: '3px',
      },
      '& div:nth-child(2)': {
        fontSize: '13px',
      },
      '& .space': {
        flexGrow: 1,
      },
      '& .approval': {
        padding: '2px 10px 0',
        borderRadius: '12px',
        backgroundColor: '#8cfb97',
        fontWeight: 'bold',
        color: '#137e13',
        textAlign: 'center',
      },
      '& .chat': {
        padding: '1px 7px',
        height: '22px',
        border: 'solid 1px #ffffff',
        backgroundColor: '#4a71dc',
        color: 'white',
        borderRadius: '90px',
        textAlign: 'center',
      },
      '& .application': {
        padding: '1px 7px',
        height: '22px',
        border: 'solid 1px #ffffff',
        backgroundColor: '#e63232',
        color: 'white',
        borderRadius: '90px',
        textAlign: 'center',
      }
    },
    '& .info': {
      position: 'absolute',
      top: '79px',
      boxSizing: 'border-box',
      width: '100%',
      '& .costWrap': {
        padding: '0 10px',
        position: 'absolute',
        borderRadius: '12px',
        backgroundColor: '#FFC7E3',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        '& .cost': {
          paddingTop: '2px',
          color: '#FF3096',
          fontWeight: 'bold',
          fontSize: '15px',
        },
      },
      '& .commWrap': {
        position: 'absolute',
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
    },
  },
}));

export default function Card({item, image, onContentClick}) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');

  return (
    <ThemeProvider theme={cardTheme}>
      <div className={classes.root} onClick={onContentClick}>
        {image &&
          <div className={classes.img}>
            <img alt="img" src={process.env.REACT_APP_IMAGE + item.imgList[0].path + '/' + item.imgList[0].chgFileNm} />
          </div>
        }
        <div className={classes.content} style={{left : !image && '10px'}}>
          <div className="title">{item.title}</div>
          <div className="addressWrap">
            <div className="address">{item.address.sgg}</div>
          </div>
          <div className="date">
            <div><CalendarTodayIcon fontSize="small" /></div>
            <div>{Utils.parseDate(item.term.startDt)} ~ {Utils.parseDate(item.term.endDt)}{Utils.detailDay(item.term)}</div>
            <div className="space"></div>
            {item.chatCnt ? item.chatUnread > 0 && <div style={{padding: isSafari && '0 7px'}} className="chat">CHAT {item.chatUnread}</div> : ''}
            {item.toApprovalCnt ? item.toApprovalCnt > 0 && <div style={{padding: isSafari && '0 7px'}} className="application">APPOVAL {item.toApprovalCnt}</div> : ''}
            {item.approval ? item.approval.approvalYn && <div className="approval">승인완료</div> : ''}
            <div>&nbsp;&nbsp;</div>
          </div>
          <div className="info">
            <div style={{padding: isSafari && '0 10px 2px'}} className="costWrap">
              <div className="cost">{item.cost === 0 ? 'Free' : `￦ ` + Utils.numberWithCommas(item.cost)}</div>
            </div>
            <div className="commWrap">
              <div className="ico"><img src={resources.chat} alt="chat" /></div>
              <div>{item.chatCnt}</div>
              <div className="ico"><img src={resources.man} alt="man" /></div>
              <div>{item.application}/{item.recruitment}</div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
