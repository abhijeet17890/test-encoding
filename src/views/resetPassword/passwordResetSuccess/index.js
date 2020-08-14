import React from 'react';
import { Button } from '../../../sharedComponents/button/index';
import {useHistory} from "react-router-dom";

import ResultImg from '../../../assets/passresetnotif.png';

import 'antd/dist/antd.css';
import * as S from './styles.js';
import {routes} from "../../../constants/routes";


function PasswordResetSuccess(){
    const history = useHistory();
    return(
      
        <S.StyledResult
            status='success'
            icon={<S.Img src={ResultImg} alt={'result-screen'} />}
            subTitle="Your password has successfully been reset."
            extra={<Button type="primary" size={'lg'} onClick={()=>history.push(routes.noAuthRoutes.signIn)} >OK</Button>}
        />
  
    );
}

export default PasswordResetSuccess;