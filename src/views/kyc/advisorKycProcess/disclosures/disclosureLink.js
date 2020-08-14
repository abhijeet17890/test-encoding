import React from "react";
import { Row, Col } from "antd";

import DisclosuresTitle from "./title";

const DisclosureLink = () => {
  return (
    <Row justify="center">
      <Col span={15}>
        <DisclosuresTitle />
        <Row justify="center">
            <p>Disclosure Link</p>
        </Row>
      </Col>
    </Row>
  );
};

export default DisclosureLink;
