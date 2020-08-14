import React from "react";
import { Row, Col } from "antd";

import { useHistory, useLocation } from "react-router-dom";

import { Button } from "../../../../sharedComponents/button";
import { routes } from "../../../../constants/routes";

import DisclosuresTitle from "./title";
import DisclosuresList from "./list";
import { StyledButtonContainer } from "../../sharedComponents/style";

const Disclosures = () => {
  const history = useHistory();
  const location = useLocation();

  const clickedEventHandler = () => {
    history.push({
      pathname: routes.authRoutes.advisorKyc,
      state: {
        disclosureAgree: location.state && location.state.disclosureAgree,
        bankDetails: location.state && location.state.bankDetails,
      },
    });
  };

  return (
    <Row justify="center">
      <Col span={15}>
        <DisclosuresTitle />
        <Row justify="center">
          <Col span={24}>
            <DisclosuresList />
            <StyledButtonContainer justify="center">
              <Col>
                <Button
                  htmlType="button"
                  size="lg"
                  onClick={clickedEventHandler}
                >
                  Ok
                </Button>
              </Col>
            </StyledButtonContainer>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Disclosures;
