import React from 'react';
import {Row, Col, Typography} from 'antd';
import 'antd/dist/antd.css';
import { ProgressStyle, headingStyle , StyledDivider, StyledGapDivider } from '../Style';

const ProgressBar = (props) => {
   const { Title } = Typography;
   return (
      <>
         <Title level={4}>{props.Title}</Title>
         <StyledDivider />
            {props.data.length?props.data.map((x,index)=>(
               <Row key={index}>
                  <Col span={24}>
                     <headingStyle><p>{x.heading}</p></headingStyle>
                     <ProgressStyle width={x.width}>
                        <div>
                        <div className="progress-bar">
                        </div>         
                        </div>              
                     </ProgressStyle> 
                     <StyledGapDivider />
                  </Col>
               </Row>
            )):null}
      </>
   )
 }
 
 export default ProgressBar;
