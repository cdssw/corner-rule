import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader } from "components";
import PlaceSelect from '../../organisms/PlaceSelect';
import * as Addr from "../../../services/Addr";
import * as User from "../../../services/User";

export default function HopePlacePage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [ sidoList, setSidoList ] = useState([]);
  const [ sggList, setSggList ] = useState([]);
  const [ sido, setSido ] = useState("서울특별시");
  const [ sgg, setSgg ] = useState("");

  useEffect(e => {
    getSidoList();
  }, []);

  const getSidoList = async event => {
    const sidoRes = await Addr.getSidoList();
    setSidoList(sidoRes.data);
    const sggRes = await Addr.getSggList(sido);
    setSggList(sggRes.data);
  }

  const handleSidoChange = e => {
    setSido(e.target.value);
    getSggList(e.target.value);
  }

  const handleSggChange = e => {
    setSgg(e.target.value);
  }

  const getSggList = async sido => {
    const sggRes = await Addr.getSggList(sido);
    setSggList(sggRes.data);
  }

  const handleSelect = async e => {
    if(sgg === "") {
      alert("시군구를 선택하세요.");
      return;
    }

    const place = sido + " " + sgg;
    if(userInfo.hopePlace) {
      if(userInfo.hopePlace.place1 === place ||
        userInfo.hopePlace.place2 === place ||
        userInfo.hopePlace.place3 === place) {
        alert("이미 등록되어 있습니다.");
        return;
      }
    }

    // place 저장
    const body = {
      hopePlace : {
        ...userInfo.hopePlace,
        [props.location.placeNo]: sido + " " + sgg
      }
    }
    const token = JSON.parse(localStorage.getItem("token"));
    const param = { token, body };
    await User.putEditUser(param);
    history.push("/mypage");
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>희망지역 선택</TitleHeader>}>
      <PlaceSelect
        sidoList={sidoList}
        sggList={sggList}
        sido={sido}
        sgg={sgg}
        onSidoChange={handleSidoChange}
        onSggChange={handleSggChange}
        onSelect={handleSelect}
      />
    </PageTemplate>
  );
}

