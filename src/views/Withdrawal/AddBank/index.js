import React, { useEffect } from "react";
import { Row, Col, Form } from "antd";
import { useHistory } from "react-router-dom";

import { regExp } from "../../../constants/regExp";
import { routes } from "../../../constants/routes";
import { onFinishFailed, scrollToTop } from "../../../utils/dataManipulation";

import { Input } from "../../../sharedComponents/Input";
import { Button } from "../../../sharedComponents/button";
import Heading from "../sharedComponents/pageHeadingComponent";

import {
  StyledRow,
  StyledFormItem,
  FloatRightButtonCol,
  StyledButtonContainer,
  StyledRightCol,
} from "../sharedComponents/style";

let initialValues = {};
const AddBank = () => {
  const [form] = Form.useForm();
  const history = useHistory();

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
          <Heading title="New Bank" />
          <StyledRow justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
              <StyledFormItem
                label="Name on Bank Account"
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
                label="Receiving Bank Name "
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
          </StyledRow>
          <Row justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 11 }} lg={{ span: 11 }}>
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
            </StyledRightCol>
          </Row>

          <StyledButtonContainer justify="center">
            <FloatRightButtonCol span={11}>
              <Button
                size="md-1"
                outlined={true}
                onClick={() => {
                  history.push(routes.authRoutes.withdrawMoney);
                }}
              >
                Back
              </Button>
            </FloatRightButtonCol>
            <Col span={11}>
              <Button htmlType="submit" size="md-1">
                Next
              </Button>
            </Col>
          </StyledButtonContainer>
        </Form>
      </Col>
    </Row>
  );
};

export default AddBank;
