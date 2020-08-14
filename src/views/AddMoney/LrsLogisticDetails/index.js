import React, { useState } from 'react';

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { useAuth } from "../../../contextProviders/authProvider";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants/routes";

import Divider from '../../../sharedComponents/Divider';
import { PageHeading } from '../../../sharedComponents/Heading';
import { Select, Option } from '../../../sharedComponents/Select';
import { Input } from '../../../sharedComponents/Input';
import DatePicker from '../sharedComponents/datePicker/index';
import moment from "moment";
import { regExp } from "../../../constants/regExp";


import {Row,Col, Form} from 'antd';
import {CalendarTwoTone } from '@ant-design/icons';

import * as S from './styles.js';


export default function LrsLogisticDetails(props){
    const { connectWithApi } = useInsideAuthApi();
    const { updateLoggedInUserInfo } = useAuth();
    const history = useHistory();

    const[date, setDate] = useState();
    const dateFormat = "DD/MM/YYYY";
    

    const handleDate = (value, dateString) => {
        if (dateString !== "") {
          dateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
          setDate(dateString);
        } else {
          // console.log("start datestring", dateString);
          setDate("");
        }
      };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const onFinish = e => {
        console.log('Success:', e);
        let payload = {};
        payload.amount = props.res.amount;
        payload.account_info = props.res.account_info;
        payload.bank = props.res.bank;
        payload.pickup_date = date;
        payload.pickup_time = e.pickupTime;
        payload.pickup_location = e.pickupLocation;
        payload.remittance_bank_ifsc = e.ifscCode.trim();

        console.log(payload);
        connectWithApi()
            .submitAddMoneyPickup(payload)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
   
      };
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return(
        <React.Fragment>
            <Row justify='center' gutter={[0,25]}>
            <Col span={18}>
                    <PageHeading>Add Money from Bank in India</PageHeading>
                    <Divider/>
                </Col>
            </Row>
            <Row justify='center' >
               <Col lg={{span:17}}>
                     <S.StyledSubHeading>LRS Logistic Details</S.StyledSubHeading>
                 </Col>
            </Row>

            <Form
                name='add-money-user-details'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row justify='center' gutter={[0,25]} flex={'10px'}>
               <S.StyledCol span={9} >
                    <S.Label>Pickup Date</S.Label>

                    <S.FormItem
                        name='pickupDate'
                    >
                         
                        <DatePicker 
                            onChange={handleDate} 
                            format={dateFormat} 
                            suffixIcon={<CalendarTwoTone />} 
                            placeholder='Select Pickup Date'
                            disabledDate={disabledDate}/>
                    </S.FormItem>
                </S.StyledCol>

                <S.StyledCol span={8}>
                    <S.Label>Pickup Time</S.Label>
                    <S.FormItem
                        name='pickupTime'
                    >
                        <Select placeholder='Select Pickup Time'>
                            <Option value='8:00 AM - 12:00 PM'>8:00 AM - 12:00 PM</Option>
                            <Option value='12:00 PM - 4:00 PM'>12:00 PM - 4:00 PM</Option>
                            <Option value='4:00 PM - 8:00 PM'>4:00 PM - 8:00 PM</Option>
                        </Select>
                    </S.FormItem>
                </S.StyledCol>
                </Row>

                <Row justify='center' >
                    <Col span={17}>
                        <S.Label>Pickup Location</S.Label>
                        <S.FormItem
                            name='pickupLocation'
                        >
                            <Input placeholder='Enter Pickup Location'/>
                        </S.FormItem>
                    </Col>
                </Row>
                <Row justify='center'gutter={[0,30]}>
                    <Col span={17} >
                        <S.Note>Note: Please include your city and pin code in the address</S.Note>
                    </Col>
                </Row>

                <Row justify='center' gutter={[0,30]}>
                    <Col span={17}>
                        <S.Label>Remittance Bank IFSC Code</S.Label>
                        <S.FormItem
                            name='ifscCode'
                            rules={[
                                {
                                required: true,
                                whitespace: true,
                                message: " ",
                                pattern: regExp.ifscCode,
                                },
                                ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (value && !regExp.ifscCode.test(value)) {
                                    return Promise.reject("Please enter valid IFSC Code");
                                    } else if (value && regExp.ifscCode.test(value)) {
                                    return Promise.resolve();
                                    } else {
                                    return Promise.reject("Please enter your IFSC Code");
                                    }
                                },
                                }),
                            ]}
                        >
                            <Input 
                                placeholder='Enter IFSC Code'/>
                        </S.FormItem>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                    <S.FormItem>
                        <S.StyledButton outlined size={'md-1'}>Back</S.StyledButton>
                    </S.FormItem>
                    </Col>
                    <S.ButtonCol>
                        <S.FormItem>
                            <S.StyledButton size={'md-1'} htmlType='submit'>Next</S.StyledButton>
                        </S.FormItem>
                    </S.ButtonCol>
                </Row>
            </Form>
            
        </React.Fragment>
    );
}
