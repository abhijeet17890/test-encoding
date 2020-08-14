import React, { useEffect, useState } from 'react';
import { Select,Option } from '../../../sharedComponents/Select/index';
import Divider from '../../../sharedComponents/Divider';
import {Row, Col, Form} from 'antd';
import { useInsideAuthApi} from '../../../contextProviders/apiProvider';
import * as S from './styles';





export default function TopSection(){
    const{ connectWithApi }  = useInsideAuthApi();
    const[userAccounts, setUserAccounts] = useState([]);
    const[id, setId] = useState();

    function handleSelectAccount(value) {

        let account = userAccounts.find((currentAccount) => {
            return currentAccount.dw_account_number === value;
        });
        if(account){
            if (account.account_type !== undefined) {
                    setId(account.account_type.id);
               
                }
            } 
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
    };

    useEffect(()=>{
        connectWithApi()
            .getUserAccounts()
            .then((res) => {
                console.log("plan response->", res);
                setUserAccounts(res.data);
            })
            .catch((error) => {
                // Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
        
    }, []);


    return(
        <S.Container>
            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>Account</S.Text>
                </Col>
                <Col span={16}>
                    <Select
                        placeholder="Select"
                        onChange={handleSelectAccount}>
                        {renderUserAccountOptions()}
                    </Select>
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
                    <S.Text>$60,092.66</S.Text>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,25]}>
                <Col span={23}>
                    <Divider/>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,25]}>
                <Col span={7}>
                    <S.Text>$58,582.61</S.Text>
                    <S.Text small>Stock Value</S.Text>
                </Col>
                <Col span={6}>
                    <S.Text>$1,510.05</S.Text>
                    <S.Text small>Cash Value</S.Text>
                </Col>
                <Col span={6}>
                    <S.Text>+$10,281.23 (+21.29%)</S.Text>
                    <S.Text small>Total gain/loss</S.Text>
                </Col>
                <Col span={4}>
                    <S.Text>+$298.69 (+0.51%)</S.Text>
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
                    <S.Text>$1,510.05</S.Text>
                </Col>
            </Row>
            

        </S.Container>
    );

}