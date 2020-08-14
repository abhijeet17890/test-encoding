import React from 'react';
import { Row, Col } from 'antd';
import Divider from '../../../sharedComponents/Divider/index';
import { Button } from '../../../sharedComponents/button/index';
import { PageHeading } from '../../../sharedComponents/Heading/index';
import TableView from './TableView';
import SearchBar from './SearchBar';

import 'antd/dist/antd.css';
// import * as S from '../styles';

function MyList(){
    return(
        <React.Fragment>
           <Row justify='center' gutter={[0,20]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 19, offset: 0 }}>
                    <PageHeading>List A</PageHeading>
                    <Divider/>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,20]}>
                <Col xs={{ span: 17, offset: 0 }} lg={{ span: 17,   }}>
                    <SearchBar/>
                </Col>
                <Col xs={{ span: 2, offset: 0 }} lg={{ span: 2,  }}>
                    <Button  size={'sm-1'} type='primary'>View All</Button>
                </Col>
            </Row>
            
            <Row justify='center' gutter={[0,20]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 19, offset: 0 }}>
                    <TableView/>
                </Col>
            </Row>
    
        </React.Fragment>
    );
    
}
export default MyList;