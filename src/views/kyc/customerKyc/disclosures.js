import React, { useState } from "react";
import { Row, Col, List } from "antd";
import { useHistory, useLocation } from "react-router-dom";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { routes } from "../../../constants/routes";

import { Checkbox } from "../../../sharedComponents/Checkbox";
import { Button } from "../../../sharedComponents/button";

import SubHeadingComponent from "../sharedComponents/subHeading";
import PageHeading from "../sharedComponents/pageHeading";

import { data } from "../constants/disclosures";

import { CustomList } from "./style";
import { StyledButtonContainer, StyledDiv } from "../sharedComponents/style";

const Disclosures = () => {
  const history = useHistory();
  const location = useLocation();
  const { connectWithApi } = useInsideAuthApi();

  const isDataSharingChecked =
    location.state && location.state.dataSharing !== undefined
      ? location.state.dataSharing
      : true;
  const [checked, setChecked] = useState(isDataSharingChecked);
  const [isLoading, setIsLoading] = useState(false);

  const checkedHandler = (event) => setChecked(event.target.checked);

  const redirectBack = () => {
    setIsLoading(false);
    history.push({
      pathname: location.state && location.state.lastPath,
      state: {
        dataSharing: checked,
        disclosureAgree: location.state && location.state.disclosureAgree,
      },
    });
  };

  const clickedEventHandler = () => {
    setIsLoading(true);
    if (
      location.state &&
      location.state.lastPath !== routes.authRoutes.kycProcess
    ) {
      const payload = {
        is_data_sharing: checked,
      };
      connectWithApi()
        .updateCustomerDataSharing(payload)
        .then((res) => {
          redirectBack();
        })
        .catch((error) => {
          setIsLoading(false);
          Notification({ type: "error", content: error.message });
        });
    } else {
      redirectBack();
    }
  };
  return (
    <Row justify="center">
      <Col xs={{ span: 22 }} lg={{ span: 15 }}>
        <PageHeading title="Disclosures" />
        <StyledDiv>
          <SubHeadingComponent title="Customer needs to give his acceptance on" />
        </StyledDiv>
        <Row justify="center">
          <Col xs={{ span: 22 }} lg={{ span: 22 }}>
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
                          <Checkbox onChange={checkedHandler} checked={checked}>
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
        <StyledButtonContainer justify="center">
          <Col>
            <Button loading={isLoading} htmlType="button" size="lg" onClick={clickedEventHandler}>
              Ok
            </Button>
          </Col>
        </StyledButtonContainer>
      </Col>
    </Row>
  );
};

export default Disclosures;
