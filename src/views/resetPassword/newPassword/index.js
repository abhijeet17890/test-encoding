import React,{ useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { PageHeading } from '../../../sharedComponents/Heading/index';
import GrayLinks from '../../../sharedComponents/grayLinks/index';
import { Button } from '../../../sharedComponents/button/index';
import { Input } from '../../../sharedComponents/Input/index';
import {regExp} from '../../../constants/regExp';

import { Row, Col } from 'antd';
import ModalPassValidation from '../../userRegistration/modalPassValidation/index';

import { useAuth } from "../../../contextProviders/authProvider";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";

import info from '../../../assets/info.png';
import Check from '../../../assets/check.png';
import Cross from '../../../assets/cross.png';

import * as S from './styles';
import 'antd/dist/antd.css';
import {routes} from "../../../constants/routes";
// import Notification from "../../../sharedComponents/Notification";

function NewPassword(){
    const history = useHistory();
    const { resetPassword,loggedInUser, updateLoggedInUserInfo, } = useAuth();
    const location = useLocation();
    const { connectWithApi } = useInsideAuthApi();
    const[passError, setPassError] = useState('');
    const[lengthflag, setlengthflag] = useState('');
    const[upperflag, setupperflag] = useState('');
    const[lowerflag,setlowerflag] = useState('');
    const[isnumber,setisnumber] = useState('');
    const[isspchar,setisspchar] = useState('');
    const[newPasswordLoading, setNewPasswordLoading] = useState(false);
    const[visible, setVisible] = useState(false);


    const PassErrors = [
        {
            error:'Atleast 8 characters',
            flag: lengthflag
        },
        {
            error:'A lower case letter',
            flag: lowerflag
        },
        {
            error:'An upper case letter',
            flag: upperflag
        },
        {
            error:'A special character',
            flag: isspchar
        },
        {
            error:'A number',
            flag: isnumber
        }
    ];

    function validate(e){
        const password = e.target.value;
        if(e.target.value===''){
            setPassError(false);
        }
        else{
            setPassError(true);
        }
        setlengthflag(password.length>=8);
        setupperflag(regExp.strUpperCase.test(password));
        setlowerflag(regExp.strLowerCase.test(password));
        setisnumber(regExp.containsNum.test(password));
        setisspchar(regExp.containsSpecialChar.test(password));
    };

    const showModal = () => {                                                       
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const layout = {
        wrapperCol: {
            offset:8,
            span: 8,
        },
      };

    const onFinish = values => {
        setNewPasswordLoading(true);
        if(location.pathname === routes.authRoutes.rmNewPassword){
            let payload ={
                "new_password": values.password,
                "confirm_new_password": values.password
            }
            connectWithApi()
                .changePasswordForRM(payload).then((res)=>{
                setNewPasswordLoading(false);
                let updatedProp = loggedInUser["relationship_manager_details"];
                updateLoggedInUserInfo({
                    relationship_manager_details: {
                        ...updatedProp,
                        status: "Active"
                    }
                });
                history.push(routes.authRoutes.rmDashboard);
            }).catch((error)=>{
                setNewPasswordLoading(false)
            })
        }else{
            let payload = {
                "email": location.state.email,
                "new_password": values.password
            }
            resetPassword(payload).then((res)=>{
                setNewPasswordLoading(false);
                history.push(routes.noAuthRoutes.passwordResetSuccess);
            }).catch((error)=>{
                setNewPasswordLoading(false)
            })
        }

    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return(
    <React.Fragment>
        <S.ContainerDiv>
            <Row justify='center'>
                <Col>
                    <PageHeading>{location.pathname === routes.authRoutes.rmNewPassword ? 'Change Password': 'Reset Password'}</PageHeading>
                </Col>
            </Row>
            <S.StyledForm
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <S.StyledFormItem
                    name='password'
                    rules = {[{
                        required:true,
                        message: 'Please enter the new password'
                    }]}
                >
                    <Input
                        type='password'
                        placeholder='Password'
                        autoComplete={'off'}
                        size={'large'}
                        suffix= {<S.Tick i={true} src={info} alt="" onClick={showModal}/>}
                        onChange={(e)=>validate(e)}


                    />
                </S.StyledFormItem>
                <Row justify='center'>
                    <Col lg={{span:8,}}>
                        {(!(lengthflag && upperflag && lowerflag && isnumber && isspchar) && passError) ?
                            <S.StyledError>
                                Your password must contain
                                <S.StyledList>
                                    {PassErrors.map(item=>(
                                        <S.StyledLi>

                                            {item.flag?
                                                <img src={Check} alt='check'/>
                                                :<img src={Cross} alt='cross'/>}

                                            <S.Span >
                                    {item.error}
                                    </S.Span>
                                        </S.StyledLi>))}
                                </S.StyledList>
                            </S.StyledError>
                            :''}
                    </Col>
                </Row>

                <S.StyledFormItem
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                // console.log("inside--validator", getFieldValue('password'),value )
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Passwords entered do not match');
                            },
                        }),
                    ]}
                >
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        size={'large'}
                        autoComplete={'off'}
                        visibilityToggle={false}
                    />


                </S.StyledFormItem>
                <ModalPassValidation visible={visible} closeModal={closeModal}/>
            
                <S.StyledFormItem

                >
                    <Row justify='center'>
                        <Col >
                            <Button type="primary" htmlType='submit' loading={newPasswordLoading} size={'lg'} >
                                Change Password
                            </Button>
                        </Col>
                    </Row>
                </S.StyledFormItem>
                <S.StyledFormItem

                >
                    {location.pathname !== routes.authRoutes.rmNewPassword && <Row justify={'center'}>
                        <Col >
                            <GrayLinks link={routes.noAuthRoutes.signIn} >Cancel</GrayLinks>
                        </Col>
                    </Row>}
                </S.StyledFormItem>
            </S.StyledForm>
            
        </S.ContainerDiv>
    </React.Fragment>
    );
};

export default NewPassword;
