import React from "react";
import { Row, Col } from "antd";

import { SubHeading } from "../../../../sharedComponents/Heading";

import { StyledRightCol } from "../style";

const SubHeadingComponent = ({ title }) => {
  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
        <SubHeading>{title}</SubHeading>
      </Col>
      <StyledRightCol
        xs={{ span: 24 }}
        sm={{ span: 11 }}
        lg={{ span: 11 }}
      ></StyledRightCol>
    </Row>
  );
};

export default SubHeadingComponent;
