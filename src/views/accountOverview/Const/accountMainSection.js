import React, {useState, useEffect} from 'react';
import PageTitle from './PageTitle';
import {Col, Row} from "antd";
import Table from './Table';
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import * as S from '../styles.js';
import Loader from "../../../sharedComponents/Loader";

// getAccountOverview

const getAccountOverview = (connectWithApi,setAccountData,setLoader,setShowText,setText) =>{
    connectWithApi()
    .getAccountOverview()
    .then((res) => {
        setAccountData(res.data);
        if(res.available_fund_status > 0){
          setShowText(false);
        }else{
          setText(res.available_fund_status);
        }
    })
    .catch((error) => {
      setLoader(false);
    });
  }

function AccountMainSection(){
    const [counter, setCounter] = useState(0);
    const { connectWithApi } = useInsideAuthApi();
    const [loader, setLoader] = useState(true);
    const [accountData, setAccountData] = useState([]);
    const [showText, setShowText] = useState(true);
    const [Text, setText] = useState('');

    useEffect(() => {
        getAccountOverview(connectWithApi,setAccountData,setLoader,setShowText,setText);
      }, [counter]);

    return(
        <S.container>
            <PageTitle />
            {showText?<Row gutter={[0, 20]}>
               <Col span={23} offset={1}>
               <p>{Text}</p>
               </Col>
            </Row>:null}
            <Table info={accountData}/>
        </S.container>
    );
}

export default AccountMainSection;
