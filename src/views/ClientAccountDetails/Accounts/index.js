import React from 'react';
import Table from '../sharedComponents/Table/index';
import { Button } from '../../../sharedComponents/button/index';
import columns from './columns';
import { Row, Col, Space } from 'antd';

import * as S from './styles.js';

export default function Accounts(){
    return(
        
        <S.container>
    
            <S.StyledPageHeading>Accounts</S.StyledPageHeading>
            <S.StyledSpace>
            <Table columns={columns} />
            </S.StyledSpace>
            <Row justify='center' gutter={[0,20]}>
                <Col >
                    <Button size={'lg'}> Create New Account</Button>
                </Col>
            </Row>

        </S.container>
    );
}