import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

import { Button } from 'antd';

import ResultImg from '../../assets/thank-you.png';

import 'antd/dist/antd.css';
import * as S from './styles.js';
import PageTitle from './PageTitle';


function RecommendedPortfolios(){
    const [count, setCount] = useState(0);
    return(
        <S.PageContainer>
        <PageTitle />
        <S.StyledResult
            status='success'
            icon={<img src={ResultImg} alt={'result-screen'} />}
            subTitle={count==0?"Globalise will launch the Select Funds soon. Register your interest and we will notify you when these are available.":"Thank you, your interest has been registered. We will notify you when Select Funds are available."}
            extra={count==0?<Button onClick={()=> setCount(1)} type="primary">Register</Button>:null}
        />
        </S.PageContainer>
    );
}

export default RecommendedPortfolios;
