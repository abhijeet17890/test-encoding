import React from "react";
import { Row, Col, List } from "antd";

import { Checkbox } from "../../../sharedComponents/Checkbox";
import { Button } from "../../../sharedComponents/button";
import Divider from "../../../sharedComponents/Divider";

import { Headline, Title, CustomList, StyledRow } from "./styles";

import { data } from "./constants/disclosures";

const Disclosures = ({ closeDisclosure, dataSharing }) => {
  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 18 }}>
          <Headline>Disclosures</Headline>
          <Divider />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 17 }}>
          <Title>Customer needs to give his acceptance on</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 17 }}>
          <CustomList
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <React.Fragment>
                      <span>{index + 1}.</span> <span>{item.title}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.subTitle}
                      </a>
                      {item.checkBox ? (
                        <Checkbox checked={dataSharing} disabled={true}>
                          {item.checkBox}
                        </Checkbox>
                      ) : null}
                    </React.Fragment>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <StyledRow justify="center">
        <Col>
          <Button htmlType="button" size="lg" onClick={closeDisclosure}>
            Ok
          </Button>
        </Col>
      </StyledRow>
    </React.Fragment>
  );
}

export default Disclosures;
