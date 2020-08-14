import React from "react";
import { Row, Col, Form } from "antd";
import { StyledH2, StyledFormItem } from "../styles";
import { StyledRow } from "./styles";
import { Input } from "../../../sharedComponents/Input/index";
import { SubHeading } from "../../../sharedComponents/Heading/index";

const UserInfoComponent = () => {
    return (
        <React.Fragment>
            <StyledRow justify="center">
                <Col span={11}>
                    <SubHeading>Your Name</SubHeading>
                </Col>
            </StyledRow>
            <Row justify="center">
                <Col xs={{ span: 20 }} lg={{ span: 5 }}>
                    <StyledFormItem
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "First Name is required",
                            },
                        ]}>
                        <Input placeholder="First Name" />
                    </StyledFormItem>
                </Col>
                <Col xs={{ span: 20 }} lg={{ span: 5, offset: 1 }}>
                    <StyledFormItem
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: "Last Name is required",
                            },
                        ]}>
                        <Input placeholder="Last Name" />
                    </StyledFormItem>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UserInfoComponent;
