import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col} from 'antd';
import Input from './SharedComponents/Input/index';
import ReportTable from './ReportTable';
import { StyledMainDiv, StyledDivider, PageHeading } from './styles';
import Divider from '../../../sharedComponents/Divider/index';


function handleChange(value) {
  console.log(`selected ${value}`);
}

function Reports() {

  return (
    <StyledMainDiv>
        <PageHeading>
            Reports
        </PageHeading>
    <Row gutter={[0,30]} justify='center'>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Input heading='Select your account' onChange={handleChange} select data={['Kelly Halt / DPKU000001']} default/>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} offset={1}>
            <Input heading='Select type of report' onChange={handleChange} select data={['Monthly Statements']} default/>
        </Col>
        <Col span={1}>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Input heading='Start date' onChange={handleChange} datapicker={true}/>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} offset={1}>
            <Input heading='End date' onChange={handleChange} datapicker={true}/>
        </Col>
        <Col xs={12} sm={12} md={1} lg={3} xl={3} offset={1}>
            <Input heading=' ' onClick={handleChange} button={true} type='primary' content='Search'/>
        </Col>
    </Row>
    <Row gutter={[0,20]}>
        <Col span={24}>
            <Divider />
        </Col>
    </Row>
    
    
    <ReportTable/>
    </StyledMainDiv>
  )
}

export default Reports;
