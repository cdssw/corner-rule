import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: "10px 0",    
  },
  title: {
    width: '100%',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  resultWrap: {
    display: 'flex',
    flexDirection: 'column',
  },  
  juso: {
    fontWeight: 'bold',
  },
  jibun: {
    fontSize: '13px',
  },
  detail: {
    color: '#0077ff'
  },
}));

export default function AddressResult({total, items, fetchMoreData, onAddrClick, page}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {page !== 0 ?
        total === 0
        ?
          <div className={classes.title}>
            검색결과 없음
          </div>
        :
          <>
            <div className={classes.title}>
              도로명주소 검색결과 ({total}건)
            </div>
            <div style={{width: '100%', borderBottom: '2px solid #707070'}}></div>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
            >
              {items.map((m, index) => {
                return (
                  <div key={index} onClick={() => onAddrClick(index)}>
                    <div style={{marginBottom: '10px'}}></div>
                    <div className={classes.wrap}>
                      <div className={classes.resultWrap}>
                        <div className={classes.juso}>{m.roadAddrPart1}</div>
                        <div className={classes.juso}>{m.roadAddrPart2}</div>
                        <div style={{marginBottom: '3px'}}></div>
                        <div className={classes.jibun}>{m.jibunAddr}</div>
                        <div style={{marginBottom: '3px'}}></div>
                        {/* {m.detBdNmList !== '' &&
                          <>
                            <div className={classes.detail}>상세건물 보기</div>
                            <div className={classes.jibun}>[상세건물명] {m.detBdNmList}</div>
                          </>
                        } */}
                      </div>
                      <div>{m.zipNo}</div>
                    </div>
                    <div style={{width: '100%', borderBottom: '1px solid #dfdfdf'}}></div>
                  </div>
                )
              })}
            </InfiniteScroll>
          </>
        :
        <></>
      }
    </div>
  );
}
