import React from "react";
import { Row, Col } from "antd";

import { SwitchButton } from "../../../../sharedComponents/SwitchButton";

import { SwitchTitle, StyledCol } from "./style";

const switchComponent = ({ title, checked, changedHandler }) => {
  return (
    <Row>
      <Col span={22}>
        <SwitchTitle>{title}</SwitchTitle>
      </Col>
      <StyledCol span={2}>
        <SwitchButton checked={checked} onChange={changedHandler} />
      </StyledCol>
    </Row>
  );
};

export default switchComponent;
