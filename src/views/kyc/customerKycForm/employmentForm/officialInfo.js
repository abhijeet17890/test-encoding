import React from "react";
import { Row, Col } from "antd";

import { Input } from "../../../../sharedComponents/Input";

import { StyledFormItem } from "../../sharedComponents/style";
import { SwitchTitle } from "../../sharedComponents/switchComponent/style";
import { WarningMessage } from "./style";

const OfficialInfo = () => {
  return (
    <React.Fragment>
      <Row>
        <SwitchTitle className="space">
          Please provide the names of that official and official's immediate
          family members (including former spouses)
        </SwitchTitle>
        <Col xs={{ span: 23 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="&nbsp;"
            name="political_public_member"
            className="no-label"
            rules={[
              {
                required: true,
                message: "Please enter your family members",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your family members" />
          </StyledFormItem>
        </Col>
      </Row>
      <WarningMessage>
        Please enter the names separated by commas in the box above
      </WarningMessage>
    </React.Fragment>
  );
};

export default OfficialInfo;
