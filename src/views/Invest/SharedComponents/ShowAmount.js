import React, { useState } from "react";
import { Row, Col} from 'antd';
import { StyledAmount } from "../style";
import {defaultValues} from '../../../constants/defaultValues';

function ShowAmount(props) {
   const [size, setSize] = useState('large');
  return (
   <>
   <Row type="flex">
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
         <StyledAmount size={size}>
            <span>Sell</span><span>{defaultValues.defaultCurrency+props.data.sell}</span>
         </StyledAmount>
      </Col>
      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
         <StyledAmount size={size}>
            <span>Buy</span><span>{defaultValues.defaultCurrency+props.data.buy}</span>
         </StyledAmount>
      </Col>
   </Row>
   </>
  );
}

export default ShowAmount;