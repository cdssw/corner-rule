import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader } from "components";
import PlaceSelect from '../../organisms/PlaceSelect';
import * as Addr from "../../../services/Addr";

export default function HopePlacePage(props) {
  const { login } = useSelector(state => state.userInfo, []);
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

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>희망지역 선택</TitleHeader>}>
      <PlaceSelect sidoList={sidoList} sggList={sggList} onSidoChange={handleSidoChange} onSggChange={handleSggChange} sido={sido} sgg={sgg} />
    </PageTemplate>
  );
}

