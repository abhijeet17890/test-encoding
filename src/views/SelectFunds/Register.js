import React, {useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Button } from '../../sharedComponents/button/index';
import ResultImg from '../../assets/thank-you.png';
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import SelectFundsThankYou  from "./ThankYou";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import * as S from './styles.js';

function SelectFundsRegister(){
    const[thankYouVisible,setThankYouVisible] = useState();
    const[registerLoader, setRegisterLoader] = useState(false);
    const{ connectWithApi } = useInsideAuthApi();
    const[pageLoading, setPageLoading] = useState(true);

    const antIcon = <LoadingOutlined spin/>;

    
    const registerApi = () => {
        setRegisterLoader(true);
        const payload = {
            is_registered_to_select_funds: true,
        
        };
        connectWithApi()
            .registerSelectFunds(payload)
            .then((res) => {
                console.log("select funds->", res);
            
                setRegisterLoader(true);
                setThankYouVisible(true)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        connectWithApi()
            .getUserPreferences()
            .then((res) => {
                console.log('select funds response ->', res);
                if(res.data.is_registered_to_select_funds===true){
                    setPageLoading(false);
                    setThankYouVisible(true);
                }
            })
            .catch((error)=>{
                setPageLoading(false)
                console.log(error);
            });
        
    }, [connectWithApi]);
    return(
            <React.Fragment>
                <Row justify='center'>
                    <Col>
                    {pageLoading?<Spin indicator={antIcon} />:
                    
                    thankYouVisible?<SelectFundsThankYou/>:
                        <S.StyledResult
                            status='success'
                            icon={<S.StyledImg src={ResultImg} alt={'result-screen'} className='result-img'/>}
                            subTitle={"Globalise will launch the Select Funds soon. Register your interest and we will notify you when these are available."}
                            extra={ <Button 
                                type='primary' 
                                size={'lg'}
                                loading={registerLoader}
                                onClick={registerApi}
                            >
                                Register
                            </Button>}
                        />
                        
                        }
                        

                    </Col>
                </Row>
            </React.Fragment>
    );
}

export default SelectFundsRegister;