import styled from "styled-components";
import { Form } from "antd";
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
  &.select-alignment label {
    margin-bottom: 19px;
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
  @media (max-width: 480px) {
    &.select-alignment {
      margin-top: 0px;
    }
  }
  &.no-margin-bottom {
    margin-bottom: 0px;
  }
`;
