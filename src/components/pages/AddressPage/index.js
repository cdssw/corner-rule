import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, AddressSearch, AddressResult } from "components";
import Utils from "../../Utils";
import * as Juso from "../../../services/Juso";

function checkSearchedWord(value){
  if(value.length === 0) return;
	if(value.length > 0){
		//특수문자 제거
		var expText = /[%=><]/ ;
		if(expText.test(value) == true){
			alert("특수문자를 입력 할수 없습니다.") ;
			value = value.split(expText).join(""); 
			return false;
		}
		
		//특정문자열(sql예약어의 앞뒤공백포함) 제거
		var sqlArray = new Array(
			//sql 예약어
			"OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
             		 "UNION",  "FETCH", "DECLARE", "TRUNCATE" 
		);
		
		var regex;
		for(var i=0; i<sqlArray.length; i++){
			regex = new RegExp( sqlArray[i] ,"gi") ;
			
			if (regex.test(value) ) {
			    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
				value =value.replace(regex, "");
				return false;
			}
		}
	}
	return true ;
}

export default function AddressPage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleChange = event => {
    setSearch(event.target.value);
  }

  const handleSearch = e => {
    if(e.key !== 'Enter') return;
    if(!checkSearchedWord(search)) return;
    fetchMoreData(1);
  }

  const fetchMoreData = async e => {
    const param = {
      page: e === 1 ? e : page,
      search: search
    }
    setLoading(true);
    try {
      const result = await Juso.postJuso(param);
      setPage(page + 1);
      if(e === 1) {
        setItems(result.data.results.juso);
      } else {
        setItems(items.concat(result.data.results.juso));
      }
      setTotal(parseInt(result.data.results.common.totalCount));
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
  }

  const handleAddrClick = index => {
    console.log(items[index]);
    const address = {
      address1: items[index].roadAddrPart1,
      address2: '',
      address2Valid: null,
      sgg: items[index].sggNm,
      sido: items[index].siNm,
    };
    const state = props.location.state;
    state.address = address;
    history.push({
      pathname: '/reg',
      state: state,
    });
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>도로명 주소</TitleHeader>} loading={loading}>
      <AddressSearch onSearch={handleChange} search={search} onKeyPress={handleSearch} />
      <AddressResult items={items} total={total} fetchMoreData={fetchMoreData} onAddrClick={handleAddrClick} page={page} />
    </PageTemplate>
  );
}

