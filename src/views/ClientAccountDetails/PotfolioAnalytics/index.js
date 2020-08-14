import React from 'react';
import Input  from '../sharedComponents/Input';
import Chart from '../../../sharedComponents/Chart';
import {Row, Col} from 'antd';

import * as S from './styles';

export default function PortfolioAnalytics() {
    return(
        <S.StyledMainDiv>
            <Row justify='center'>
                <Col span={2}>
                    Account 
                </Col>
                <Col span={20}>
                    <Input select/>
                </Col>
            </Row>
            <Row justify='center'>
                <Col>
                    <Chart/>
                </Col>
            </Row>

        </S.StyledMainDiv>
    );
}