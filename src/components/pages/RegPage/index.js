import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, ImageList, RegForm } from "components";
import * as User from "../../../services/User";

export default function RegPage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [ imgList, setImgList ] = useState([]);

  const [state, setState] = useState({
    title: '',
    startDt: '',
    endDt: '',
    startTm: '',
    endTm: '',
    cost: '',
    addr: '',
    content: '',
  });

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }


  // if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>등록</TitleHeader>}>
      <ImageList imgList={imgList} />
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      <div style={{marginBottom: '20px'}}></div>
      <RegForm
        state={state}
        onInputChange={handleInputChange}
      />
    </PageTemplate>
  );
}

