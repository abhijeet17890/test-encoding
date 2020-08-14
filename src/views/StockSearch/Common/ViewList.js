import React from 'react';
import {Row, Col} from 'antd';
import { Gain, Lose, StyledDivider ,StyledSmallDivider,StyledUp, StyledDown,StyledUnderline} from '../Style';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css'
import {routes} from "../../../constants/routes";
import {SubHeading} from '../../../sharedComponents/Heading/index';


const ViewList = (props) => {
   
   return (
      <>
         <SubHeading level={4}>{props.Title}</SubHeading>
         <StyledSmallDivider></StyledSmallDivider>
         {props.data.length?props.data.map((data,index)=>(
            <div key={index}>
            <Row type="flex">
            <Col xs={12} sm={12} md={16} lg={16} xl={16}>
               {data.length>4?<StyledUnderline><Link to={routes.authRoutes.productDetails+'/'+data[4]}>{data[0]}</Link></StyledUnderline>:data[0]}
            </Col>
            <Col className='text-center' xs={4} sm={4} md={3} lg={3} xl={3}>
               {data[1]}
            </Col>
            <Col className='text-center' xs={4} sm={4} md={2} lg={2} xl={2}>
               {data[2]?<Gain />:<Lose />}
            </Col>
            <Col className='text-center' xs={4} sm={4} md={3} lg={3} xl={3}>
            {data[2]?<StyledUp>{data[3]}</StyledUp>:<StyledDown>{data[3]}</StyledDown>}
            </Col>
         </Row>
         <StyledDivider />
         </div>
         )):null}
      </>
   )
 }
 
 export default ViewList;
