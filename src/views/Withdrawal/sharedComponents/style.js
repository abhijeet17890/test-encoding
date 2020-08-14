import styled from "styled-components";
import { Row, Form, Col } from "antd";

export const StyledFormItem = styled(Form.Item)`
  label {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    line-height: 1.38;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  &.no-label {
    margin-bottom: 0px;
    .ant-form-item-label {
      padding: 0px;
    }
    label {
      display: none;
      padding-bottom: 0px;
    }
    .ant-form-item {
      margin-bottom: 0px;
    }
  }
  &.ant-form-item-has-error .ant-form-item-explain {
    font-size: 14px;
    font-style: italic;
    line-height: 1.36;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.errorColor};
    margin-top: 10px;
    margin-bottom: 10px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 480px) {
    &.select-alignment {
      margin-top: 0px;
    }
  }
  &.no-margin-bottom {
    margin-bottom: 0px;
  }
`;

export const StyledRightCol = styled(Col)`
  margin-left: ${(props) => props.theme.elementDistances.inlineInputsHDis};
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

export const StyledButtonContainer = styled(Row)`
  margin-top: ${(props) => props.theme.elementDistances.inputVDisFormSubmitBtn};
  margin-bottom: ${(props) =>
    props.theme.elementDistances.formSubmitBtnVDisFooter};
  .ant-col {
    margin-bottom: ${(props) =>
      props.theme.elementDistances.formSubmitBtnVDisFooter};
  }
`;

export const FloatRightButtonCol = styled(Col)`
  text-align: right;
  margin-right: 20px;
  @media (max-width: 576px) {
    text-align: initial;
    margin-right: 0px;
  }
`;
export const StyledRow = styled(Row)`
  margin-top: ${(props) => props.theme.elementDistances.h1DisTop};
`;

export const StyledText = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  &.withdrawal-amount {
    margin-top: 8px;
  }
`;

export const StyledMoneyText = styled.span`
  float: right;
`;

export const StyledBottomButton = styled(Row)`
  margin-bottom: ${(props) =>
    props.theme.elementDistances.formSubmitBtnVDisFooter};
  margin-top: ${(props) => props.theme.elementDistances.inputVDisFormSubmitBtn};
`;

export const ErrorMessage = styled.span`
  font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
  font-style: italic;
  line-height: 1.36;
  color: ${(props) => props.theme.colors.errorColor};
  margin-bottom: 10px;
  display: inline-block;
  &.agreement-error {
    margin-top: 10px;
    display: block;
  }
`;

export const Withdrawalfees = styled.p`
  font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
  font-style: italic;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-top: 12px;
`;

export const NewBankDiv = styled.div`
  margin: 21.5px 0;
  float: right;
`;
