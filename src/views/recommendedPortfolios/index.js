import React, { useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";


import ResultImg from '../../assets/thank-you.png';

import 'antd/dist/antd.css';
import * as S from './styles.js';
import PageTitle from './PageTitle';
import Loader from "../../sharedComponents/Loader";
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import { defaultValues } from "../../constants/defaultValues";
import {Button} from '../../sharedComponents/button/index';

const recommendedPortfoliosList = (connectWithApi, setThanks, setLoader) =>{
    // const formData = new FormData();
    // formData.set("is_registered_to_portfolios", true);
    connectWithApi()
    .recommendedPortfoliosList()
    .then((res) => {
        if(res.data!==null){
            setThanks(1);
        }
        setLoader(false);
    })
    .catch((error) => {
        setLoader(false);
    });
  }
const rgisterPortfolios = (connectWithApi, setThanks, setLoader) =>{
    const formData = new FormData();
    formData.set("is_registered_to_portfolios", true);
    connectWithApi()
    .registerPortfolios(formData)
    .then((res) => {
        setThanks(1);
        setLoader(false);
    })
    .catch((error) => {
        setLoader(false);
    });
  }


function RecommendedPortfolios(){
    const [thanks, setThanks] = useState(0);
    let [counter, setCounter] = useState(0);
    const [loader, setLoader] = useState(true);
    const { connectWithApi } = useInsideAuthApi();

    useEffect(() => {
        recommendedPortfoliosList(connectWithApi, setThanks, setLoader);
    }, [counter]);

    return(
        <S.PageContainer>
        <PageTitle />
        <S.StyledResult
            status='success'
            icon={<img src={ResultImg} alt={'result-screen'} />}
            subTitle={thanks==0?"Globalise will launch the Recommended Portfolios soon. Register your interest and we will notify you when these are available.":"Thank you, your interest has been registered. We will notify you when Recommended Portfolios are available."}
            extra={thanks==0?<Button onClick={()=> {rgisterPortfolios(connectWithApi, setThanks, setLoader)}} size='lg'>Register</Button>:null}
        />
        </S.PageContainer>
    );
}

export default RecommendedPortfolios;
