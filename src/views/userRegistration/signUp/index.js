import React,{ useState } from 'react';

import {useHistory} from "react-router-dom";

import {routes} from '../../../constants/routes';
import {defaultValues} from '../../../constants/defaultValues';
import { regExp } from '../../../constants/regExp';

import { useAuth } from "../../../contextProviders/authProvider";
import { checkEmail } from "../../../utils/validation";
import { buildQuery } from '../../../utils/dataManipulation';


import { Form, Row, Col} from 'antd';
import ModalPassValidation from '../modalPassValidation/index';

import {PageHeading} from '../../../sharedComponents/Heading/index';
import {Input} from '../../../sharedComponents/Input/index';
import GrayLinks from "../../../sharedComponents/grayLinks";
import { Button } from '../../../sharedComponents/button/index';

import info from '../../../assets/info.png';
import Check from '../../../assets/check.png';
import Cross from '../../../assets/cross.png';


import 'antd/dist/antd.css';
import * as S from './styles';

function SignUp(){
    const { signUp, checkIfEmailRegistered } = useAuth();

    const history = useHistory();
    const[form] = Form.useForm();
    const[userError, setUserError] = useState(false);
    const[passError, setPassError] = useState(false);
    const[checkEmailInProgress, setCheckEmailInProgress] = useState(false);

    const[lengthflag, setlengthflag] = useState('');
    const[upperflag, setupperflag] = useState('');
    const[lowerflag,setlowerflag] = useState('');
    const[isnumber,setisnumber] = useState('');
    const[isspchar,setisspchar] = useState('');
    const[visible, setVisible] = useState(false);
    const [emailExists, setEmailExists] = useState(true);
    const[signUpLoading, setSignUpLoading] = useState(false);
    // const[emptyPass, setEmptyPass] = useState(false);
    

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
      
    const onFinish = (values) => {
        const payload = { ...values, user_role: defaultValues.userRole}
        setSignUpLoading(true);
        signUp(payload, history).then((res)=>{
            setSignUpLoading(false)
        }).catch((error)=>{
            setUserError(true);
            form.setFields([
                {
                    name:'email',
                    errors:[error.message]
                },
            
            ])
            setSignUpLoading(false)});
    };
    
    const onFinishFailed = errorInfo => {

    };

    const showModal = () => {                                                    
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const checkEmailAvail = (email) => {
        setUserError(true);
        setEmailExists(true);
     
        if(checkEmail(email)){
            let message =''; // on hold
            let emailExistsCheck = true
            setCheckEmailInProgress(true);
            setUserError(checkEmailInProgress)
            setEmailExists(true);
            checkIfEmailRegistered(buildQuery({email})).then((res)=>{
                emailExistsCheck = res.data['email_exists']
                setEmailExists(emailExistsCheck);
                setUserError(emailExists);
                message = emailExistsCheck?res.message: '';
                form.setFields([    //for explicitly setting input values and input backend errors
                    {
                        name: 'email',
                        errors: [message],
                    }
                ]);
                setCheckEmailInProgress(false);
            }).catch((error)=>{
                setCheckEmailInProgress(false);
            });

        }

        else if(checkEmail(email)==='false' && (!checkEmailInProgress))
        {
            setUserError(true)
        }
        

    }

    function onEmailChange(e){

        // const email = e.target.value;
        // setTimeout(function(){    // DO NOT remove this code for now
        //     checkEmailAvail(email);
        // }, (defaultValues.timeAfterEmailExistsCheck));
    }

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
  
    return(
        <React.Fragment>
            <S.ContainerDiv>
                <Row justify='center'>
                    <Col>
                        <PageHeading>Sign Up</PageHeading>
                    </Col>
                </Row>
                
                <S.StyledForm
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={(value)=>onFinish(value)}
                    onFinishFailed={onFinishFailed}
                >
                    <S.StyledFormItem
                    
                        bottomMargin={emailExists}
                        name="email"
                        hasFeedback={checkEmailInProgress} 
                        validateStatus='validating'
                        // help="The information is being validated..."
                        onChange={(e)=>onEmailChange(e)}
                        rules={[
                            {
                                type:'email',
                                required: true,
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <S.StyledEmail
                            error={emailExists && userError}
                            placeholder='Email address'
                            size={'large'}
                            onChange={(e)=>onEmailChange(e)}
                            onBlur={(e)=>checkEmailAvail(e.target.value)}
                            suffix={!emailExists?<S.Tick/>:<span/>}
                     
                            
                        />
                    </S.StyledFormItem>
                    <S.StyledFormItem 
                        bottomMargin={true}
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                        ]}
                    >
                        <Input
                            
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            size={'large'}
                            suffix= {<S.Info i={true} src={info} alt="" onClick={showModal}/>}
                            onChange={(e)=>validate(e)}
                         
                        />
                    </S.StyledFormItem>
                   
                    <Row>
                        <Col lg={{span:8, offset:8}}>

                            {(!(lengthflag && upperflag && lowerflag && isnumber && isspchar) && passError) ?
                                <S.StyledError>
                                    Your password must contain
                                    <S.StyledList>
                                        {PassErrors.map(item=>(
                                            <S.StyledLi>
                                                {item.flag?
                                                    <img src={Check} alt='check'/>
                                                    :<img src={Cross} alt='cross'/>}

                                                <S.Span>
                                {item.error}
                                </S.Span>
                                            </S.StyledLi>))}
                                    </S.StyledList>
                                </S.StyledError>
                                :''}
                        </Col>
                    </Row>

                    <S.StyledFormItem {...tailLayout}>
                        <Row justify='center'>
                            <Col>
                                <S.StyledExistingUser>
                                    Existing User?<GrayLinks link={routes.noAuthRoutes.signIn}>Sign In</GrayLinks>
                                </S.StyledExistingUser>
                            </Col>
                        </Row>
                    </S.StyledFormItem>

                    {passError?'':<S.StyledSpace/>}
                   
                    <S.StyledFormItem {...tailLayout}>
                        <Row justify='center'>
                            <Col >
                                {/*onClick={()=>doSignUp({history})}*/}
                                <Button type="primary" htmlType='submit'  loading={signUpLoading} size={'lg'} >
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                    </S.StyledFormItem>

                </S.StyledForm>
                      
            </S.ContainerDiv>
        
            <ModalPassValidation visible={visible} closeModal={closeModal}/>
            
        </React.Fragment>
    );
}
export default SignUp;
