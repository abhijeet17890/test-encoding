import React,{ useState }  from 'react';
import { Form, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';


import GrayLinks from '../../../sharedComponents/grayLinks/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';
import { Button } from '../../../sharedComponents/button/index';
import { Input } from '../../../sharedComponents/Input/index';
import {routes} from "../../../constants/routes";
import { useAuth } from "../../../contextProviders/authProvider";

import * as S from './styles.js';
import 'antd/dist/antd.css';

function ForgotPassword(){
    const history = useHistory();
    const [form] = Form.useForm();  //for explicitly setting input values and input backend errors
    const { forgotPassword } = useAuth();

    // const[emailError, setEmailError]= useState(false)
    // const[errorMessage, setErrorMessage] = useState('');
    const[forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

    const layout = {
        wrapperCol: {
            offset:8,
            span: 8,
        },
    };
    const onFinish = values => {
        // setEmailError(false);
        setForgotPasswordLoading(true);
        forgotPassword(values).then((res)=>{
            setForgotPasswordLoading(false)
            history.push({
                pathname: routes.noAuthRoutes.resetPassVerification,
                state:values
            })
        }).catch((error)=>{
            // setErrorMessage(error.message);
            // setEmailError(true);
            form.setFields([    //for explicitly setting input values and input backend errors
                {
                    name: 'email',
                    errors: [error.message],
                }
            ]);
            setForgotPasswordLoading(false);
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return(
        <React.Fragment>
            <S.ContainerDiv>
                <Row justify='center' gutter={[0,20]}>
                    <Col>
                        <PageHeading>{'Forgot Password'}</PageHeading>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col >
                        <S.StyledSubHeading>Enter your email below to reset your password</S.StyledSubHeading>
                            
                    </Col>
                </Row>
                
                <Form
                    form={form} //for explicitly setting input values and input backend errors
                    {...layout}
                    onFinish={(value)=>onFinish(value)}
                    onFinishFailed={onFinishFailed}
                >
                    <S.StyledFormItem
                        name="email"
                        rules={[
                            {
                                type:'email',
                                required: true,
                                message:'Please enter a valid email'
                            }
                        ]}
                    >
                        <Input placeholder='Email Address' size={'large'}/>

                    </S.StyledFormItem>
                    
                    <S.StyledFormItem>
                        <Row justify='center' >
                            <Col >
                                <Button type='primary' loading={forgotPasswordLoading} htmlType='submit' size={'lg'}>
                                    Reset Password
                                </Button>
                            </Col>
                        </Row>
                    </S.StyledFormItem>
    
                    <S.StyledFormItem>
                        <Row justify='center'>
                            <Col >
                                <GrayLinks link={routes.noAuthRoutes.signIn}>Cancel</GrayLinks>
                            </Col>
                        </Row>
                    </S.StyledFormItem>
                </Form>

            </S.ContainerDiv>
        </React.Fragment>

    );
}
export default ForgotPassword;