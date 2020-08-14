import React from "react";
import { Row, Col } from "antd";

import Divider from "../Divider";

import { CustomAntSteps, CustomAntStepsIcon, StyledComponent } from "./style";

const StepsComponent = ({ current, steps, Step }) => (
  <Row justify="center">
    <Col span={22}>
      <StyledComponent>
        <CustomAntSteps>
          <CustomAntStepsIcon current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </CustomAntStepsIcon>
        </CustomAntSteps>
      </StyledComponent>
      <Divider />
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 23 }}>
          {steps[current]?.content}
        </Col>
      </Row>
    </Col>
  </Row>
);

export default StepsComponent;
