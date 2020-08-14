import React from "react";
import { Col } from "antd";

import { PageHeading } from "../../../../sharedComponents/Heading";
import Divider from "../../../../sharedComponents/Divider";

import { StyledRow } from "../style";

const PageHeadingComponent = ({ title }) => {
  return (
    <StyledRow justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 23 }}>
        <PageHeading>{title}</PageHeading>
      </Col>
      <Divider />
    </StyledRow>
  );
};

export default PageHeadingComponent;
