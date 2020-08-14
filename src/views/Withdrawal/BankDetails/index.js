import React, { useEffect } from "react";
import { Row, Col, Form } from "antd";

import { regExp } from "../../../constants/regExp";
import { onFinishFailed, scrollToTop } from "../../../utils/dataManipulation";

import { Input } from "../../../sharedComponents/Input";
import { Button } from "../../../sharedComponents/button";
import { PageHeading } from "../../../sharedComponents/Heading";
import Divider from "../../../sharedComponents/Divider";

import SelectComponent from "../sharedComponents/selectComponent";

import {
  StyledRow,
  StyledFormItem,
  StyledButtonContainer,
  StyledRightCol,
  NewBankDiv,
} from "../sharedComponents/style";

let initialValues = {};
const BankDetails = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 23 }}>
        <Form
          layout="vertical"
          // onFinish={submitUserForm}
          initialValues={initialValues}
          hideRequiredMark
          onFinishFailed={() => onFinishFailed("ant-form-item-has-error")}
          form={form}
        >
          <Row justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <PageHeading>Withdrawal Bank Details</PageHeading>
              <Divider />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 12 }}>
              <NewBankDiv>
                <Button size="sm-1">+ New Bank</Button>
              </NewBankDiv>
              <Divider />
            </Col>
          </Row>
          <StyledRow justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <SelectComponent
                placeholder="Select an bank"
                name="bank"
                label="Select Bank"
                list={[]}
                rules={[
                  {
                    required: true,
                    message: `Please select bank`,
                  },
                ]}
              />
            </Col>
            <StyledRightCol
              xs={{ span: 24 }}
              sm={{ span: 11 }}
              lg={{ span: 11 }}
            ></StyledRightCol>
          </StyledRow>
          <Row justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <StyledFormItem
                label="Name on the  Bank Account"
                name="bank_account"
                rules={[
                  {
                    required: true,
                    message: "Please enter the account name",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter the account name " />
              </StyledFormItem>
            </Col>
            <StyledRightCol
              xs={{ span: 24 }}
              sm={{ span: 11 }}
              lg={{ span: 11 }}
            >
              <StyledFormItem
                label="Receiving Bank"
                name="receiving_bank_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the receiving bank",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter the receiving bank " />
              </StyledFormItem>
            </StyledRightCol>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <StyledFormItem
                label="Account Nick Name"
                name="account_nick_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the nick name",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter the nick name" />
              </StyledFormItem>
            </Col>
            <StyledRightCol
              xs={{ span: 24 }}
              sm={{ span: 11 }}
              lg={{ span: 11 }}
            >
              <StyledFormItem
                label="Account Number"
                name="account_number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the account number",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter the account number" />
              </StyledFormItem>
            </StyledRightCol>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <StyledFormItem
                label="Routing Number"
                name="routing_number"
                rules={[
                  {
                    required: true,
                    message: " ",
                    whitespace: true,
                    pattern: regExp.routingNumber,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value && !regExp.routingNumber.test(value)) {
                        return Promise.reject(
                          "Please enter valid routing number"
                        );
                      } else if (value && regExp.routingNumber.test(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter your routing number"
                        );
                      }
                    },
                  }),
                ]}
              >
                <Input placeholder="Enter the routing number" />
              </StyledFormItem>
            </Col>
            <StyledRightCol
              xs={{ span: 24 }}
              sm={{ span: 11 }}
              lg={{ span: 11 }}
            >
              <StyledFormItem
                label="SWIFT/ABA Number"
                name="swift_aba_number"
                rules={[
                  {
                    required: true,
                    message: "Please enter SWIFT/ABA number",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter SWIFT/ABA number" />
              </StyledFormItem>
            </StyledRightCol>
          </Row>
          <StyledButtonContainer justify="center">
            <Col>
              <Button htmlType="submit" size="lg">
                Next
              </Button>
            </Col>
          </StyledButtonContainer>
        </Form>
      </Col>
    </Row>
  );
};

export default BankDetails;
