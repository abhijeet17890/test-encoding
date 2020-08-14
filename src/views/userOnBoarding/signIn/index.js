import React,{ useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";

import { Form, Row, Col, Alert} from 'antd';
import {PageHeading} from '../../../sharedComponents/Heading/index';
import GrayLinks from '../../../sharedComponents/grayLinks/index';
import {routes} from '../../../constants/routes';
import { useAuth } from "../../../contextProviders/authProvider";
import { Button } from '../../../sharedComponents/button/index';
import {Input, NumberInput} from '../../../sharedComponents/Input/index';
import { Checkbox} from '../../../sharedComponents/Checkbox/index';

import 'antd/dist/antd.css';
import * as S from './styles';



function SignIn() {
    const [form] = Form.useForm();
    const { signIn } = useAuth();
    const history = useHistory();
    // const[errorMessage, setErrorMessage] = useState('');
    // const[error, setError] = useState(false);
    const[signInLoading, setSignInLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    // const [rememberMeUser, setRememberMeUser] = useState();


    const layout = {
        wrapperCol: {
            offset:8,
          span: 8,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 8,
       
        },
      };
    useEffect(() => {
        let user = localStorage.getItem("rememberMeUser");
        if (user) {
            form.setFieldsValue({ email: user });
            setRememberMe(true);
        }
    }, []);

    const onFinish = values => {
        // setError(false);
        if (rememberMe) {
            localStorage.setItem("rememberMeUser", values.email);
        }
        const payload = { ...values}
        setSignInLoading(true);
        signIn(payload, history).then((res)=>{
            setSignInLoading(false)
        }).catch((error)=>{
            form.setFields([    //for explicitly setting input values and input backend errors
                {
                    name: 'password',
                    errors: [error.message],
                }
            ]);
            // setError(true);
            setSignInLoading(false)
        });
      };

    const rememberMeFunc = (e) => {
        setRememberMe(e.target.checked);
        if (!e.target.checked) {
            localStorage.removeItem("rememberMeUser");
        }
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    // function validate(e){
    //     const password = e.target.value;
       
    // };

    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not validate email!',
    //         number: '${label} is not a validate number!',
    //     },
    //     number: {
    //         range: '${label} must be between ${min} and ${max}',
    //     },
    // };

    return(
        <React.Fragment>
            <S.ContainerDiv>
                <Row justify='center'>
                    <Col>
                        <PageHeading>Sign In</PageHeading>
                    </Col>
                </Row>

              {/*  <Row justify='center' gutter={[0, 16]}>
                    <Alert
                        message="You have been successfully logged out"
                        type="success"

                        showIcon={true}
                    />
                </Row>*/}

              {/*  <Row justify='center' gutter={[0, 16]}>
                    <Alert
                        message="This is some generic error"
                        type="error"
                        showIcon={true}
                    />
                </Row>*/}


               {/*<Row justify='center' gutter={[0, 16]}>
                    <Alert
                        message="Your session is expired, Please login again to continue working"
                        type="warning"
                        showIcon={true}
                    />
                </Row>*/}

                {/*<Row justify='center' gutter={[0, 16]}>
                <Alert
                    message="This is some info"
                    type="info"

                    showIcon={true}
                />
                </Row>*/}

                <S.StyledForm
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={(value)=>onFinish(value)}
                    onFinishFailed={onFinishFailed}
                >
                    <S.StyledFormItem
                        name="email"
                        rules={[{
                            type:'email',
                            required: true,
                            message:'Please enter a valid email'
                            }]}
                    >

                        <Input placeholder='Email address'/>
                    </S.StyledFormItem>

                    <S.StyledFormItem
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please enter the password' }]}
                    >
                        <Input
                            type='password'
                            placeholder='Password'
                            visibilityToggle={false}
                        />
                    </S.StyledFormItem>
                  
                    <S.StyledSpace/>
                    

                    <S.StyledFormItem {...tailLayout}>
                        <Row justify='center'>
                            <Col flex={3} >
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={rememberMeFunc}
                                >
                                    Remember Me
                                </Checkbox>

                            </Col>
                            <Col flex={3}  align={'right'}>
                                <GrayLinks link={routes.noAuthRoutes.forgotPassword}> Forgot Password? </GrayLinks>
                            </Col>
                        </Row>
                    </S.StyledFormItem>
                            <S.StyledSpace/>
                    <S.StyledFormItem {...tailLayout} >
                        <Row justify={'center'} gutter={[0,55]}>
                            <Col>
                                <S.StyledNewUser>
                                    New User?
                                    <GrayLinks link={routes.noAuthRoutes.signUp}>Sign Up</GrayLinks>
                                </S.StyledNewUser>
                            </Col>
                        </Row>
                    </S.StyledFormItem>

                    <S.StyledFormItem {...tailLayout}>
                        <Row justify={'center'}>

                            <Button loading={signInLoading} type="primary" htmlType='submit'  size={'lg'} >
                                Sign In
                            </Button>
                        </Row>
                    </S.StyledFormItem>
                </S.StyledForm>

            </S.ContainerDiv>
            

            
        </React.Fragment>
    );
}

export default SignIn;
