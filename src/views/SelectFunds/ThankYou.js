import React from 'react';

import ResultImg from '../../assets/thank-you.png';
import {Row, Col} from 'antd';

import * as S from './styles.js';

function SelectFundsThankYou(){
    return(
            <React.Fragment>
                <Row justify='center'>
                    <Col>
                        <S.StyledResult
                            status='success'
                            icon={<S.StyledImg src={ResultImg} alt={'result-screen'} className='result-img'/>}
                            subTitle="Thank you, your interest has been registered. We will notify you when
                            Select Funds are available."
                        />
                    </Col>
                </Row>
            </React.Fragment>
    );
}

export default SelectFundsThankYou;
