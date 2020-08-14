import React, { useEffect, useState } from 'react';
import { Select,Option } from '../../sharedComponents/Select';
import Divider from '../../sharedComponents/Divider';
import {Row, Col, Form} from 'antd';
import { useInsideAuthApi} from '../../contextProviders/apiProvider';
import {applyAmountCommaMask, formatPercentage} from '../../utils/dataManipulation';
import {defaultValues} from '../../constants/defaultValues';
import Loader from '../../sharedComponents/Loader';
import * as S from './styles';


export default function TopSection({TableData}){
    const{ connectWithApi }  = useInsideAuthApi();

    const[userAccounts, setUserAccounts] = useState([]);
    const [defaultKey, setDefaultKey] = useState();
    const[portfolioDetails, setPortfolioDetails] = useState([]);
    const[portfolioValue, setPortfolioValue] = useState();
    const[cashValue, setCashValue] = useState();
    const[stockValue, setStockValue] = useState();
    const[totalGainLoss, setTotalGainLoss] = useState();
    const[totalGainLossPercent, setTotalGainLossPercent] = useState();
    const[todayGainLossPercent, setTodayGainLossPercent] = useState();
    const[todayGainLoss, setTodayGainLoss] = useState();
    const[availInvest, setAvailInvest] = useState();
    const[loading, setLoading] = useState(true);
    const [accountCounter,setAccountCounter] = useState(0);
    const[counter,setCounter] = useState(0);
    const formRef = React.createRef();
    const[form] = Form.useForm();
    const[select, setSelect] = useState({
        selected:{
            val: false,
          },
    })
    const[id, setId] = useState();

    function handleSelectAccount(value, select) {
        let account = userAccounts.find((currentAccount) => {
            return currentAccount.dw_account_number === value;
        });
    
        if(account){
            if (account.id !== undefined) {
                    setId(account.id);
                }
        }

    
        console.log(account.id); 
        connectWithApi()
            .getPortolioOverview(account.id)
            .then((res)=>{
                setPortfolioDetails(res.data);
                setLoading(false);
            
                setPortfolioValue(res.data.portfolio_overview.portfolio_value?res.data.portfolio_overview.portfolio_value:'');
                setStockValue(res.data.portfolio_overview.stock_value?res.data.portfolio_overview.stock_value:'');
                setCashValue(res.data.portfolio_overview.cash_value?res.data.portfolio_overview.cash_value:'');
                
                setTotalGainLoss(res.data.portfolio_overview.total_value?res.data.portfolio_overview.total_value:'');
                setTodayGainLossPercent(res.data.portfolio_overview.todays_total_gain_or_loss?formatPercentage(res.data.portfolio_overview.todays_total_gain_or_loss):'');
                setTodayGainLoss(res.data.portfolio_overview.todays_total_value?res.data.portfolio_overview.todays_total_value:'');
                setTotalGainLossPercent(res.data.portfolio_overview.total_gain_or_loss_percent?formatPercentage(res.data.portfolio_overview.total_gain_or_loss_percent):'');

                setAvailInvest(res.data.accountSummary.cash.cashAvailableForTrade?res.data.accountSummary.cash.cashAvailableForTrade:'');
                TableData(res.data.accountSummary.equity.equityPositions, loading);
                
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            })
    }
      
    const renderUserAccountOptions = () => {
        let options = [];
        userAccounts.map((value, index) => {
            options.push(
                <Option key={value.dw_account_number}>
                    {value.nick_name} / {value.dw_account_number}
                </Option>
            );
            });
            
            
            return options;
        }
 
    useEffect(()=>{
        connectWithApi()
            .getUserAccounts()
            .then((res) => {
                console.log("plan response->", res);
                setUserAccounts(res.data);
                
                
                form.setFieldsValue({
                    account: res.data[0].dw_account_number
                })
                connectWithApi()
                .getPortolioOverview(res.data[0].id)
                .then((res)=>{
                    setPortfolioDetails(res.data);
                    setLoading(false);
                
                    setPortfolioValue(res.data.portfolio_overview.portfolio_value?res.data.portfolio_overview.portfolio_value:'');
                    setStockValue(res.data.portfolio_overview.stock_value?res.data.portfolio_overview.stock_value:'');
                    setCashValue(res.data.portfolio_overview.cash_value?res.data.portfolio_overview.cash_value:'');
                    
                    setTotalGainLoss(res.data.portfolio_overview.total_value?res.data.portfolio_overview.total_value:'');
                    setTodayGainLossPercent(res.data.portfolio_overview.todays_total_gain_or_loss?formatPercentage(res.data.portfolio_overview.todays_total_gain_or_loss):'');
                    setTodayGainLoss(res.data.portfolio_overview.todays_total_value?res.data.portfolio_overview.todays_total_value:'');
                    setTotalGainLossPercent(res.data.portfolio_overview.total_gain_or_loss_percent?formatPercentage(res.data.portfolio_overview.total_gain_or_loss_percent):'');
    
                    setAvailInvest(res.data.accountSummary.cash.cashAvailableForTrade?res.data.accountSummary.cash.cashAvailableForTrade:'');
                    TableData(res.data.accountSummary.equity.equityPositions, loading);
                    
                })
                .catch((error)=>{
                    console.log(error);
                    setLoading(false);
                })
                

            })
            .catch((error) => {
                // Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    }, [counter]);
    
    useEffect(() => {
     
    })
    const changeAccount = (val) => {
        setSelect((prevState) => ({
          ...prevState,
          account: {
            val: val,
          },
      }
      ))};

    return(
        <S.Container>
            {loading?<Loader/>:<div>
            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>Account</S.Text>
                </Col>
                <Col span={16}>
                    <Form

                    form={form}
                    >
                        <Form.Item
                        name='account'>
                    <Select
                        placeholder="Select"
                        // defaultActiveFirstOption
                        // initialValues={defaultKey}
                        onChange={handleSelectAccount}>
                        {renderUserAccountOptions()}
                    </Select>
                    </Form.Item>
                    </Form>

               </Col>
            </Row>
            <Row justify='center'gutter={[0,25]}>
                <Col span={23}>
                    <Divider/>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>Portfolio Value</S.Text>
                </Col>
                <Col span={16}>
                    <S.Text>
                    {portfolioValue!==undefined?
                        !portfolioValue.toString().includes('-')? 
                            (defaultValues.defaultCurrency+applyAmountCommaMask(portfolioValue))
                            
                        :'':''}
                    </S.Text>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,25]}>
                <Col span={23}>
                    <Divider/>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>
                    {stockValue!==undefined?
                        !stockValue.toString().includes('-')? 
                            (defaultValues.defaultCurrency+applyAmountCommaMask(stockValue))
               
                        :
                            ('- '+defaultValues.defaultCurrency+applyAmountCommaMask(stockValue).slice(1,)+stockValue)
                        
                        :''}
                
                    </S.Text>
                    <S.Text small>Stock Value</S.Text>
                </Col>
                <Col span={6}>
                    <S.Text>
                    {cashValue!==undefined?
                        !cashValue.toString().includes('-')? 
                            (defaultValues.defaultCurrency+applyAmountCommaMask(cashValue))
                        :
                            ('- '+defaultValues.defaultCurrency+applyAmountCommaMask(cashValue).slice(1,)+cashValue)
                        
                        :''}
                
                    </S.Text>
                    <S.Text small>Cash Value</S.Text>
                </Col>
                <Col span={6}>
                    <S.Text>
                    {totalGainLoss!==undefined?
                        !totalGainLoss.toString().includes('-')? 
                            (defaultValues.defaultCurrency+applyAmountCommaMask(totalGainLoss))
                        :
                            ('- '+defaultValues.defaultCurrency+applyAmountCommaMask(totalGainLoss).slice(1,))
                        
                        :''}
                        
                        (  {totalGainLossPercent!==undefined? 
                            totalGainLossPercent>0? '+' + totalGainLossPercent
                            : totalGainLossPercent
                        :''})
             
                        </S.Text>
                    <S.Text small>Total gain/loss</S.Text>
                </Col>
                <Col span={4}>
                    <S.Text>
                    {todayGainLoss!==undefined?
                        !todayGainLoss.toString().includes('-')? 
                            (defaultValues.defaultCurrency+applyAmountCommaMask(todayGainLoss))
                          
                        :
                            ('- '+defaultValues.defaultCurrency+applyAmountCommaMask(todayGainLoss).slice(1,))
                        
                        :''}
                         (  {todayGainLossPercent!==undefined? 
                            todayGainLossPercent>0? '+' +   todayGainLossPercent
                            :
                            todayGainLossPercent
                      
                        :''})
         
                    </S.Text>
                    <S.Text small>Today's gain/loss</S.Text>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,25]}>
                <Col span={23}>
                    <Divider/>
                </Col>
            </Row>
            
            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>Available to Invest</S.Text>
                </Col>
                <Col span={16}>
                    <S.Text>
                        {availInvest!==undefined? 
                        defaultValues.defaultCurrency + applyAmountCommaMask(availInvest)
                        :
                        ''}
                  
                    </S.Text>
                </Col>
            </Row>
            </div>
}
            

        </S.Container>
    );

}