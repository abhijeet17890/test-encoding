import React,{useState} from 'react';

import OtpInputBoxes from '../../../sharedComponents/OtpInputBoxes/index';
import {defaultValues} from "../../../constants/defaultValues";
import {  Form, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../../contextProviders/authProvider";
// import {useNav} from "../../../contextProviders/navigationProvider";

import GrayLinks from '../../../sharedComponents/grayLinks/index';
import { Button } from '../../../sharedComponents/button/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';
import {routes} from "../../../constants/routes";
import OtpTimer from "../../../sharedComponents/OtpTimer";
import GreyBtnText from "../../../sharedComponents/GreyBtnText";



import 'antd/dist/antd.css';
import * as S from './styles.js';

function ResetPassVerification(){
    const history = useHistory();
    const location = useLocation();
    const { verifyForgotPassword, requestOTPResetPassword } = useAuth();
    const [form] = Form.useForm();  
    const[error,setError] = useState(false);
    // const[errorMessage, setErrorMessage] = useState('');
    const[resendMessage, setResendMessage] = useState(false);
    const[otpValue,setOtpValue] = useState('');
    const[enableOTP,setEnableOTP] = useState(false)
    const[resetOTPLoading, setResetOTPLoading] = useState(false);
    const[resendLinkDisabled, setResendLinkDisabled] = useState(false);

    function handleOtp(e){
        if(otpValue<=5){
            setError(false);
        }
        setOtpValue(e);
  
    }
    const layout = {
        labelCol: {
          span: 16,
        },
        wrapperCol: {
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 8,

        },
      };
    const onFinish = values => {
        setError(false);
        setResetOTPLoading(true);
        const payload = {
            "email": location.state.email,
            "forgot_password_verification_otp": otpValue
        }
        
        verifyForgotPassword(payload).then((res)=>{
            setResetOTPLoading(false)
            history.push({
                pathname: routes.noAuthRoutes.newPassword,
                state:{email:location.state.email}
            })
        }).catch((error)=>{
            setError(true);
            form.setFields([    //for explicitly setting input values and input backend errors
                {
                    name: 'otp',
                    errors: [error.message],
                }
            ]);
            setResetOTPLoading(false);
            // Notification({type:'error',content:error.message})
        })

    };
    
    const onFinishFailed = errorInfo => {
        console.log('capturing Failed:', errorInfo);
    };

    function onTimerComplete(){
        setEnableOTP(false);
        setResendLinkDisabled(false);
        setResendMessage(false);
    }
    const resendPassResetOtp = () =>{
        setResendLinkDisabled(true);
        requestOTPResetPassword({email: location.state.email}).then((res)=>{
            setEnableOTP(true);
            setResendMessage(true);
            // Notification({type: 'success', content: res.message});
        }).catch((error)=>{
            setResendLinkDisabled(false);
            // Notification({type: 'error', content: error.message});
        });
    }

    return(
        
        <React.Fragment>
            <S.ContainerDiv>
                <Row justify='center' gutter={[0,25]}>
                    <Col>
                        <PageHeading>{'Reset Password'}</PageHeading>
                    </Col>
                </Row>                    
                <Row justify={'center'}>
                    <Col lg={{span:10}}>
                        <S.StyledSubHeading>We have sent a password reset code to {location.state.email}, please enter it below
                            to reset your password
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
                    onFinish={onFinish}
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
             
                    <S.StyledFormItem {...tailLayout} >
                        <Row justify='center' >
                            <Col>
                                <GreyBtnText disabled={resendLinkDisabled} onClick={()=>resendPassResetOtp()}>Re-Send the code <OtpTimer onTimerComplete={onTimerComplete} enable={enableOTP} /> </GreyBtnText>

                            </Col>
                            <Col>
                            {resendMessage?<S.ResendMessage>{defaultValues.ResetPasswordOtpResend}</S.ResendMessage>:''}
                            
                            </Col>
                        </Row>   
                    </S.StyledFormItem>
                  
                    <S.StyledFormItem {...tailLayout}>
                        <Row justify={'center'} gutter={[0,15]}>
                            <Col >
                                <Button type='primary' htmlType='submit' loading={resetOTPLoading} size={'lg'}>Confirm</Button>
                            </Col>
                        </Row>
                    </S.StyledFormItem>
        
                    <S.StyledFormItem {...tailLayout}>
                        <Row justify='center'>
                            <Col>
                                <div>
                                    <S.Span>
                                        <GrayLinks link={routes.noAuthRoutes.forgotPassword}>Change email</GrayLinks>
                                    </S.Span>
                                    <GrayLinks link={routes.noAuthRoutes.signIn}>Cancel</GrayLinks>
                                </div>
                            </Col>
                        </Row>
                    </S.StyledFormItem>
                </Form>
            </S.ContainerDiv>
        </React.Fragment>
    );
}
export default ResetPassVerification;