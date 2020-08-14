import React,{useState} from 'react';
import {useHistory} from "react-router-dom";

import { Form, Row, Col } from 'antd';


import OtpInputBoxes from '../../../sharedComponents/OtpInputBoxes/index';
import GrayLinks from '../../../sharedComponents/grayLinks/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';
import {Button } from '../../../sharedComponents/button/index';
import { useAuth } from '../../../contextProviders/authProvider';
import OtpTimer from "../../../sharedComponents/OtpTimer";
import {routes} from "../../../constants/routes";
// import Notification from "../../../sharedComponents/Notification";
import GreyBtnText from "../../../sharedComponents/GreyBtnText";
import 'antd/dist/antd.css';
import * as S from './styles.js';
import {defaultValues} from "../../../constants/defaultValues";



function SignInVerification(){
    const history = useHistory();
    const { loggedInUser, signInVerification, requestOTPSignIn } = useAuth();

    const[form] = Form.useForm();
    const[errorMessage, setErrorMessage] = useState('');
    const[resendMessage, setResendMessage] = useState(false);    
    const[error, setError] = useState(false);
    const[otpValue,setOTPValue] = useState('');
    const[enableOTP,setEnableOTP] = useState(false)
    const[signInOTPLoading, setSignInOTPLoading] = useState(false);
    const[resendLinkDisabled, setResendLinkDisabled] = useState(false);


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

    const onFinish = values => {
        setError(false);
        const payload = {
            email: loggedInUser.email,
            login_verification_otp: otpValue
        }
        setSignInOTPLoading(true);
        signInVerification(payload, history).then((res)=>{
            // setSignInOTPLoading(false)
        }).catch((error)=>{
            form.setFields([    //for explicitly setting input values and input backend errors
                {
                    name: 'otp',
                    errors: [error.message],
                }
            ]);
            setError(true);
            setSignInOTPLoading(false)
        });
        
    };


    const onFinishFailed = errorInfo => {
    };

    const resendLoginOtp = values => {
        setResendLinkDisabled(true);
        requestOTPSignIn({email:loggedInUser.email}).then((res)=>{
            setEnableOTP(true);
            setResendMessage(true);
            // Notification({type: 'success', content: res.message});
        }).catch((error)=>{
          
            setResendLinkDisabled(false);
            // Notification({type: 'error', content: error.message});
        });
    };


    return(
        
        <React.Fragment>
            <S.ContainerDiv>
                <Row justify='center' gutter={[0,25]}>
                    <Col>
                    <PageHeading>{'Sign In Verification'}</PageHeading>
                    </Col>
                </Row>
                    <Row justify={'center'}>
                        <Col lg={{span:10}}>
                            <S.StyledSubHeading>We have sent a code on your registered contact number and email address.</S.StyledSubHeading>
                               
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
                                            hasErrored={error}
                                            
                                        />
                                
                                    </S.StyledFormItem>
                             </Col>
                        </Row>
                  
                        <S.StyledFormItem {...tailLayout}>
                            <Row justify='center' >
                                <Col>
                                    <GreyBtnText disabled={resendLinkDisabled} onClick={()=>resendLoginOtp()}>Re-Send the code <OtpTimer onTimerComplete={onTimerComplete} enable={enableOTP} /></GreyBtnText>
                                </Col>
                                <Col>
                                    {resendMessage?<S.ResendMessage>{defaultValues.SignInOtpResend}</S.ResendMessage>:''}
                                </Col>
                            </Row>   
                        </S.StyledFormItem>
                        <S.StyledFormItem {...tailLayout}>
                            <Row justify={'center'} gutter={[0,12]}>
                                <Col >
                                    <Button type='primary' 
                                        htmlType="submit" 
                                        loading={signInOTPLoading}
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
                                    <GrayLinks link={routes.noAuthRoutes.signIn}>Cancel</GrayLinks>
                                </Col>
                            </Row>
                        </S.StyledFormItem>
                </Form>
            </S.ContainerDiv>    
        </React.Fragment>
    );
}
export default SignInVerification;
