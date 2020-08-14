import React from "react";
import { Col, Row } from "antd";

import { PageHeading } from "../../../../sharedComponents/Heading";
import Divider from "../../../../sharedComponents/Divider";

const PageHeadingComponent = ({ title }) => {
  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
        <PageHeading>{title}</PageHeading>
        <Divider />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 12 }}>
        <PageHeading>&nbsp;</PageHeading>
        <Divider />
      </Col>
    </Row>
  );
};

export default PageHeadingComponent;
