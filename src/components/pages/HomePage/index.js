import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, Header, CardList, PlaceSearch } from "components";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as User from "../../../services/User";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import { Link } from 'react-router-dom';
import Utils from "../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'fixed',
    right: 'calc(50% - 270px)',
    bottom: theme.spacing(2),
    [theme.breakpoints.down(600)]: {
      right: theme.spacing(2),
    }
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const { userInfo, login } = useSelector(state => state.userInfo, {});
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [place, setPlace] = useState('');
  const [search, setSearch] = useState('');
  const [param, setParam] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const size = 10;
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(e => {
    if(token) {
      if(userInfo === null) { // 로그인 되어 있으면 user정보 복구
        loadUserInfo(token);
      } else if(userInfo.hopePlaceList.length > 0) {
        hopePlaceSet(userInfo);
      }
    } else {
      fetchMoreData();
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(e => {
    if(place !== '') {
      localStorage.setItem('place', place);
      setParam({
        ...param,
        sido: place.split(' ')[0],
        sgg: place.substring(place.indexOf(' ') + 1)
      });
    }
  }, [place]);

  useEffect(e => {
    if((userInfo && userInfo.hopePlaceList.length === 0) || (Object.keys(param).length > 0)) {
      fetchMoreData(0);
    }
  }, [param]);

  const handlePlace = event => {
    setPlace(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  const handleKeyPressSearch = e => {
    if(e.key !== 'Enter') return;
    setParam({
      ...param,
      title: search
    });
  }

  const handleSearchClick = e => {
    setParam({
      ...param,
      title: search
    });
  }

  const hopePlaceSet = userInfo => {
    const place = localStorage.getItem('place');
      if(place !== null && place !== '') {
        setPlace(place);
      } else {
        if(userInfo && userInfo.hopePlaceList.length > 0) {
          setPlace(userInfo.hopePlaceList[0].sido + ' ' + userInfo.hopePlaceList[0].sgg);
        } else {
          setParam({
            ...param,
          });
        }
      }
  }

  const loadUserInfo = async token => {
    setLoading(true);
    try {
      const userInfo = await User.getUser(token);
      dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
      hopePlaceSet(userInfo.data);
    } catch(error) {
      console.log(error);
      localStorage.removeItem('token');
      fetchMoreData();
    } finally {
      setLoading(false);
    }
  }

  const fetchMoreData = async init => {
    setLoading(true);
    try {
      const p = init === 0 ? init : page;
      const response = await Meet.getMeetSearch({body: param, page: p, size: size, sort: 'id,desc'});
      const data = await getImagePath(response.data.content);
      setPage(p + 1); // infinite scroll시 다음페이지 조회
      setItems(init === 0 ? data : items.concat(data));
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const getImagePath = async arr => {
    for (const m of arr) {
      const data = await File.postImagesPath({fileList: m.imgList});
      m.imgList = data.data;
    }
    return arr;
  }

  const path = userInfo ? '/mypage' : '/login';
  return (
    <PageTemplate header={<Header userInfo={userInfo} path={path} />} loading={loading}>
      {login && 
        <PlaceSearch userInfo={userInfo} place={place} search={search} login={login}
          onKeyPress={handleKeyPressSearch}
          onPlace={handlePlace}
          onSearch={handleSearch}
          onSearchClick={handleSearchClick}
        />
      }
      {/* <div style={{marginBottom: '10px'}}></div> */}
      <CardList path="/" fetchMoreData={fetchMoreData} items={items} />
      {login && 
        <Link to="/reg" className={classes.link}>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon fontSize='large' />
          </Fab>
        </Link>
      }
    </PageTemplate>
  );
}

