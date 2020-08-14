import styled from "styled-components";
import { Row, Form, Col } from "antd";
import { CheckOutlined} from '@ant-design/icons';

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
  &.ant-form-item-has-error .react-tel-input .form-control.invalid-number:focus,
  &.ant-form-item-has-error .react-tel-input .form-control.invalid-number:hover,
  &.ant-form-item-has-error .react-tel-input .form-control.invalid-number,
  &.ant-form-item-has-error .react-tel-input .form-control:focus,
  &.ant-form-item-has-error .react-tel-input .form-control:hover,
  &.ant-form-item-has-error .react-tel-input .form-control {
    border-color: transparent;
  }
  &.ant-form-item-has-error .react-tel-input {
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    border: 1px solid ${(props) => props.theme.colors.errorInputBorder};
  }

  @media (max-width: 1551px) {
    &.fund-source-investment label {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 2039px) {
    &.past-trade-count label {
      margin-bottom: 21px;
    }
  }
  @media (max-width: 1359px) {
    &.past-trade-count label {
      margin-bottom: 0px;
    }
  }
  @media (max-width: 1079px) {
    &.past-trade-count label {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 768px) {
    &.past-trade-count label,
    &.fund-source-investment label {
      margin-bottom: 0px;
    }
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
  margin-top: 6px;
`;

export const StyledDiv = styled.div`
  margin-top: ${(props) => props.theme.elementDistances.h1DisTop};
  &.client-kyc {
    margin-top: 0px;
  }
`;

export const SubHeading = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-bottom: 0px;
`;

export const GrayLink = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextSmall};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: #6c6c6c;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 30px;
  &.disabled-click-event {
    pointer-events: none;
    opacity: 0.4;
  }
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

export const StyledCheckboxText = styled.span`
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-left: 10px;
  .disclosures-link {
    text-decoration: underline;
    cursor: pointer;
    margin-left: 7px;
  }
`;

export const StyledLoader = styled.span`
  margin-left: 22px;
  .loading-text {
    font-size: 11px;
    color: #4a4949;
    margin-left: 13px;
  }
`;

export const StyledBottomButton = styled(Row)`
  margin-bottom: ${(props) =>
    props.theme.elementDistances.formSubmitBtnVDisFooter};
  .ant-col {
    margin-bottom: ${(props) =>
      props.theme.elementDistances.formSubmitBtnVDisFooter};
  }
`;

export const Message = styled.p`
  height: 22px;
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;

export const TickIcon = styled(CheckOutlined)`
  position: absolute;
  right: 8px;
  top: 12px;
  color:#60cdb3;
`;
