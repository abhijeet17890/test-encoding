import React, {useState} from 'react';
import TopSection from './TopSection';
import Table from './Table.js';
import { Row, Col } from 'antd';
import { PageHeading} from '../../sharedComponents/Heading';
import Loader from '../../sharedComponents/Loader';

import * as S from './styles';


export default function PortfolioOverview(){
    const[tableInfo, setTableInfo] = useState([]);
    const[load, setLoading] = useState(false);

    function TableData(tableData,loading){
     
        if(tableData!==undefined){
            setTableInfo(tableData);

        }
    }
    return(
        <S.PageContainer>
       {load?<Loader/>:
            <div>
            <Row justify='center'>
                <Col span={21}>
                    <PageHeading>Portfolio Overview</PageHeading>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={21}>
                    <TopSection TableData={TableData}/>
                    <Table info={tableInfo}/>
                </Col>
            </Row>
            </div>}
            

        </S.PageContainer>
    );

}