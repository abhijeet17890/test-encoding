import React,{useState} from 'react';
import {useHistory} from "react-router-dom";

import {Form, Row, Col } from 'antd';

import OtpInputBoxes from '../../../sharedComponents/OtpInputBoxes/index';
import GrayLinks from '../../../sharedComponents/grayLinks/index';
import GreyBtnText from '../../../sharedComponents/GreyBtnText/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';
import {Button} from '../../../sharedComponents/button/index';
import { useAuth } from '../../../contextProviders/authProvider';
import OtpTimer from "../../../sharedComponents/OtpTimer";
import {routes} from "../../../constants/routes";


import 'antd/dist/antd.css';
import * as S from './styles.js';
import {defaultValues} from "../../../constants/defaultValues";
// import Notification from "../../../sharedComponents/Notification";


function EmailVerification(props){

    const history = useHistory();
    const { loggedInUser, verifyEmailAfterSignUp, requestOTPSignUp } = useAuth();

    const[form]= Form.useForm();
    const[resendMessage, setResendMessage] = useState(false);    
    const[error, setError] = useState(false);
    const[otpValue,setOTPValue] = useState('');
    const[enableOTP,setEnableOTP] = useState(false)
    const[emailOTPLoading, setEmailOTPLoading] = useState(false);
    const[resendLinkDisabled, setResendLinkDisabled] = useState(false);

    // const sampleMail = 'abhijeet@mantralabsglobal.com'

    function handleOtp(e){
        if(otpValue<=5){
            setError(false);
        }
        setOTPValue(e);
    }
    const layout = {
        wrapperCol: {
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 8,

        },
      };
    function onTimerComplete(){
        setEnableOTP(false);
        setResendLinkDisabled(false);
        setResendMessage(false);
    }
    const resendSignupOtp = () =>{
        setResendLinkDisabled(true);
        requestOTPSignUp({email:loggedInUser.email}).then((res)=>{
            setEnableOTP(true);
            setResendMessage(true);
            // Notification({type: 'success', content: res.message});
        }).catch((error)=>{
            setResendLinkDisabled(false);
            // Notification({type: 'error', content: error.message});
        });
    }

    const onFinish = values => {
        setError(false);
        const payload = {
            email: loggedInUser.email,
            account_activation_otp: otpValue
        }
        setEmailOTPLoading(true);
        verifyEmailAfterSignUp(payload, history).then((res)=>{
            setEmailOTPLoading(false)
        }).catch((error)=>{
            form.setFields([    //for explicitly setting input values and input backend errors
                {
                    name: 'otp',
                    errors: [error.message],
                }
            ]);
            setError(true);
           

            setEmailOTPLoading(false)
        });
    };
    
    const onFinishFailed = errorInfo => {
    };

    return(
        
        <React.Fragment>
            <S.ContainerDiv>
                    <Row justify='center' gutter={[0,25]}>
                        <Col>
                            <PageHeading>{'Email Verification'}</PageHeading>
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Col>
                            <S.StyledSubHeading>
                               We have sent a code by email to {loggedInUser.email}
                            </S.StyledSubHeading>
                        </Col>
                    </Row>
                    <Form
                        form={form}
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(value)=>onFinish(value)}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row justify='center'>
                            <Col> 
                                <S.StyledFormItem
                                    name='otp'
                                    rules={[
                                        {
                                            len:defaultValues.otpLength,
                                            required:true,
                                            message:'Please enter the otp'
                                        }
                                    ]}>
                            
                                        <OtpInputBoxes
                                            onChange={(e)=>handleOtp(e)}
                                            value={otpValue}
                                            hasErrored={error?true:false}
                                            
                                        />
                                </S.StyledFormItem>    
                            </Col>
                        </Row>

             
                        <S.StyledFormItem {...tailLayout}>
                            <Row justify='center' >
                                <Col>
                                    <GreyBtnText disabled={resendLinkDisabled} onClick={()=>resendSignupOtp()}>Re-Send the code <OtpTimer onTimerComplete={onTimerComplete} enable={enableOTP} /> </GreyBtnText>
                                </Col>
                                <Col>
                                    {resendMessage?<S.ResendMessage>{defaultValues.SignUpOtpResend}</S.ResendMessage>:''}
                                </Col>
                            </Row>   
                        </S.StyledFormItem>
                        <S.StyledFormItem {...tailLayout}>
                            <Row justify={'center'}  gutter={[0,12]}>
                                <Col >
                                    {/*onClick={()=>signUp(null,history})}*/}
                                    <Button 
                                        type='primary' 
                                        htmlType="submit"  
                                        loading={emailOTPLoading}
                                        size={'lg'}
                                    >
                                        Confirm
                                    </Button>
                                </Col>
                            </Row>
                        </S.StyledFormItem>
               
                        <S.StyledFormItem {...tailLayout}>
                            <Row justify={'center'}>
                                <Col>
                                    <GrayLinks link={routes.noAuthRoutes.signUp}>Cancel</GrayLinks>
                                </Col>
                            </Row>
                        </S.StyledFormItem>
                </Form>
            </S.ContainerDiv>
        </React.Fragment>
    );
}
export default EmailVerification;