import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "antd";
import { useHistory } from "react-router-dom";

import { routes } from "../../../constants/routes";
import { defaultValues } from "../../../constants/defaultValues";
import { applyAmountCommaMask } from "../../../utils/dataManipulation";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";

import { Input } from "../../../sharedComponents/Input";
import { Button } from "../../../sharedComponents/button";
import Notification from "../../../sharedComponents/Notification";
import Loader from "../../../sharedComponents/Loader";

import SelectComponent from "../sharedComponents/selectComponent";
import Heading from "../sharedComponents/pageHeadingComponent";

import {
  StyledRow,
  StyledText,
  StyledMoneyText,
  StyledBottomButton,
  StyledFormItem,
  ErrorMessage,
  Withdrawalfees,
} from "../sharedComponents/style";

let initialValues = {};
let selectedAccountDetails;

const getSelectedAccountDetails = (obj, key) => {
  const data = obj.find((item) => {
    const accountDetails = item.accountSummary;
    return (
      accountDetails.details.nick_name +
        " / " +
        accountDetails.details.dw_account_number ===
      key
    );
  });
  return data ? data : null;
};

const getWithdrawalMoney = (
  connectWithApi,
  setAccountsOverview,
  setLoader,
  params
) => {
  connectWithApi()
    .getWithdrawalMoney(params)
    .then((res) => {
      const response = res.data;
      setAccountsOverview(response);
      const accountDetails = response[0].accountSummary;
      const selectedBank =
        accountDetails.details.nick_name +
        " / " +
        accountDetails.details.dw_account_number;

      initialValues = { ...initialValues, account: selectedBank };
      setLoader(false);
    })
    .catch((error) => {
      setLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

const WithdrawMoney = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { connectWithApi } = useInsideAuthApi();

  const [cashAvailable, setCashAvailable] = useState();
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loader, setLoader] = useState(true);
  const [accountsOverview, setAccountsOverview] = useState();

  const changedAccountHandler = (accountName) => {
    selectedAccountDetails = getSelectedAccountDetails(
      accountsOverview,
      accountName
    );
    form.setFieldsValue({
      withdrawal_amount: null,
    });
    setButtonDisabled(true);
    setCashAvailable(
      selectedAccountDetails.accountSummary.cash.cashAvailableForWithdrawal
    );
  };

  const withdrawalAmountChangedHandler = (event) => {
    const withDrawalAmount = event.target.value;

    if (
      withDrawalAmount &&
      (parseFloat(withDrawalAmount) >=
        parseFloat(cashAvailable) - parseFloat(defaultValues.withdrawalFees) ||
        parseFloat(withDrawalAmount) < 0)
    ) {
      setError(true);
      setButtonDisabled(true);
    } else if (!withDrawalAmount) {
      setButtonDisabled(true);
    } else if (parseInt(withDrawalAmount) === 0) {
      setButtonDisabled(true);
    } else {
      setError(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    const params = `?calculate_total=false`;
    getWithdrawalMoney(connectWithApi, setAccountsOverview, setLoader, params);
  }, []);

  useEffect(() => {
    if (accountsOverview) {
      selectedAccountDetails = getSelectedAccountDetails(
        accountsOverview,
        initialValues.account
      );
      form.setFieldsValue({
        account: selectedAccountDetails.accountSummary.accountName,
      });
      setCashAvailable(
        selectedAccountDetails.accountSummary.cash.cashAvailableForWithdrawal
      );
    }
  }, [accountsOverview]);

  return (
    <Form
      layout="vertical"
      // onFinish={submitUserForm}
      initialValues={initialValues}
      hideRequiredMark
      form={form}
    >
      {loader ? (
        <Row justify="center">
          <Col>
            <Loader size="large" spinning={loader} />
          </Col>
        </Row>
      ) : (
        <React.Fragment>
          <Row justify="center">
            <Col span={14}>
              <Heading title="Withdraw Money" />
            </Col>
          </Row>
          <StyledRow justify="center">
            <Col span={13}>
              <SelectComponent
                placeholder="Select an account"
                name="account"
                label="Account"
                list={[accountsOverview]}
                rules={[
                  {
                    required: true,
                    message: `Please select account`,
                  },
                ]}
                changedHandler={changedAccountHandler}
              />
            </Col>
          </StyledRow>
          <Row justify="center">
            <Col span={13}>
              <StyledText>
                <span>Cash Available for Withdrawals</span>
                <StyledMoneyText>
                  {defaultValues.defaultCurrency}
                  {applyAmountCommaMask(cashAvailable)}
                </StyledMoneyText>
              </StyledText>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={13}>
              <Row>
                <Col span={10}>
                  <StyledText className="withdrawal-amount">
                    Withdrawal Amount
                  </StyledText>
                </Col>
                <Col span={1}>
                  <StyledText className="withdrawal-amount">
                    {defaultValues.defaultCurrency}
                  </StyledText>
                </Col>
                <Col span={13}>
                  <StyledFormItem
                    name="withdrawal_amount"
                    label="&nbsp;"
                    className="no-label"
                    onChange={withdrawalAmountChangedHandler}
                  >
                    <Input
                      type="number"
                      placeholder="Enter withdrawal amount"
                    />
                  </StyledFormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          {error ? (
            <Row justify="center">
              <Col span={13}>
                <ErrorMessage>
                  Error: You do not have sufficient funds in your account
                </ErrorMessage>
              </Col>
            </Row>
          ) : null}
          <Row justify="center">
            <Col span={13}>
              <Withdrawalfees>
                Note: There is a withdrawal fee of{" "}
                {defaultValues.defaultCurrency}
                {defaultValues.withdrawalFees}
              </Withdrawalfees>
            </Col>
          </Row>

          <StyledBottomButton justify="center">
            <Col>
              <Button
                disabled={buttonDisabled}
                htmlType="submit"
                size="lg"
                onClick={() => {
                  history.push(routes.authRoutes.addBank);
                }}
              >
                Next
              </Button>
            </Col>
          </StyledBottomButton>
        </React.Fragment>
      )}
    </Form>
  );
};

export default WithdrawMoney;
