import React,{useState, useEffect}from 'react';

import { Row, Col, Spin } from 'antd';
import {capitalStr} from '../../../utils/dataManipulation';
import { defaultValues } from '../../../constants/defaultValues';
import Divider from '../../../sharedComponents/Divider/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';

import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; 

import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import * as S from './styles.js';


function InvestmentProfile({clientId}){
    const { connectWithApi } = useInsideAuthApi();
    
    const antIcon = <LoadingOutlined spin/>;
    const[pageLoading, setPageLoading] = useState(true);

    const[fundType, setFundType]= useState()
    const[oftenPlanTrade, setOftenPlanTrade]= useState()
    const[annualIncome, setAnnualIncome]= useState()
    const[liquidNetWorth, setLiquidNetWorth] = useState()
    const[totalNetWorth, setTotalNetWorth] =useState()
    const[investExpYear,setInvestExpYear] = useState()
    const[transactionCount, setTransactionCount] = useState()
    const[riskTolerance, setRiskTolerance] = useState()
    const[expectDepAmout, setExpectDepAmount] = useState()
    const[tradeCount,setTradeCount] = useState()

    useEffect(() => {
        
        // step 3:  function calls for related api functions written in services -> insideAuthApis.js
        connectWithApi()
            .getInvestmentProfileDetails(clientId)
            .then((res) => {
                setPageLoading(false);
                setFundType(res.fund_type)
                setOftenPlanTrade(res.often_plan_trade)
                setAnnualIncome(res.annual_income)
                setLiquidNetWorth(res.liquid_net_worth)
                setTotalNetWorth(res.total_net_worth)
                setInvestExpYear(res.invest_exp_year)
                setTransactionCount(res.transcation_count)
                setRiskTolerance(res.risk_tolerance)
                setExpectDepAmount(res.expect_dep_amt)
                setTradeCount(res.trade_count)
            })  
            .catch((error) => {
                //Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    }, [connectWithApi]);

    const getDescription = (param)=>{
        const data = defaultValues.riskTolerance.find((item) => item.value === param);
        if (data) {
            let updatedData = {};
            if (data.value !== undefined) {
                updatedData = {
                    id: data.id,
                    name: data.name,
                    value: data.value,
                    description: data.description,
                };
            } 
            if(updatedData.name!==undefined)
            {   
                return(updatedData.description)
            }
        } else {
            return null;
        }
    }

    const getName = (param, param_choice) => {
        let data = {};
        if(param_choice==='0'){
            data = defaultValues.riskTolerance.find((item) => item.value === param);
        }
        else if(param_choice==='1'){
            data = defaultValues.planTotrade.find((item) => item.value === param);
        }
        else if(param_choice==='2'){
            data = defaultValues.investmentExperience.find((item) => item.value === param);
        }
        if (data) {
            let updatedData = {};
            if (data.value !== undefined) {
                updatedData = {
                    id: data.id,
                    name: data.name,
                    value: data.value,
                
                };
            } 
            if(updatedData.name!==undefined)
            {  
                return(updatedData.name)
            }
        } else {
            return null;
        }
    };

    return(
        <React.Fragment>
            {pageLoading?
            <Row justify='center'>
                <Col><Spin indicator={antIcon} />
                </Col>
            </Row>:<div>
            <Row justify='center'>
                <Col xs={{ span: 23, offset: 0 }} >
                    <S.PageHeading>Investment Profile</S.PageHeading>
            
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 7, offset: 1 }}>
                    <S.StyledQuestion>How often do you plan to trade?</S.StyledQuestion>
                    <S.StyledAns>{getName(oftenPlanTrade?oftenPlanTrade:'', '1')}</S.StyledAns>
                </Col>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16 , offset: 0}}>
                    <S.StyledQuestion>Investment experience</S.StyledQuestion>
                    <S.StyledAns>{getName(investExpYear?investExpYear:'','2')}</S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 7, offset:1}}>
                    <S.StyledQuestion>Annual income</S.StyledQuestion>
                    <S.StyledAns>{annualIncome}
                   
                    </S.StyledAns>
                </Col>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 7 }}>
                    <S.StyledQuestion>Liquid net worth</S.StyledQuestion>
                    <S.StyledAns>{liquidNetWorth}
                      
                    </S.StyledAns>
                </Col>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 9 }}>
                    <S.StyledQuestion>Total net worth</S.StyledQuestion>
                    <S.StyledAns>{totalNetWorth}
                        
                    </S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ offset: 1 }}>
                    <S.StyledQuestion>Risk tolerance</S.StyledQuestion>
                    <S.StyledAns>{getName(riskTolerance?riskTolerance:'','0')} - {getDescription(riskTolerance?riskTolerance:'')}
                        {/* Conservative - I'm comfortable accepting lower returns for more stability. */}
                    </S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ offset:1 }}>
                    <S.StyledQuestion>Funding source of investment</S.StyledQuestion>
                    <S.StyledAns>{fundType}
                    </S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ offset:1 }}>
                    <S.StyledQuestion>How many deposits and withdrawals do you plan to make over the next 12 months?</S.StyledQuestion>
                    <S.StyledAns>{transactionCount}
                    </S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ offset:1 }}>
                    <S.StyledQuestion>Approximately how much money do you expect to deposit in your Globalise account over the next 12 months?</S.StyledQuestion>
                    <S.StyledAns>{expectDepAmout}
                    </S.StyledAns>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ offset:1 }}>
                    <S.StyledQuestion>Approximately how many trades have you made over the last 12 months?</S.StyledQuestion>
                    <S.StyledAns>{tradeCount}
                    </S.StyledAns>
                </Col>
            </Row>
            </div>}
            
        </React.Fragment>
    );
}

export default InvestmentProfile;