import React from "react";
import { Col, Row } from "antd";

import { PageHeading } from "../../../sharedComponents/Heading";

import { StyledRightCol } from "../sharedComponents/style";

const ClientName = ({name}) => {
  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
        <PageHeading>Client: {name}</PageHeading>
      </Col>
      <StyledRightCol
        xs={{ span: 24 }}
        sm={{ span: 11 }}
        lg={{ span: 11 }}
      ></StyledRightCol>
    </Row>
  );
};

export default ClientName;
