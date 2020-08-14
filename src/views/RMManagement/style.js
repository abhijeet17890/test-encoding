import styled from "styled-components";
import { Form } from "antd";

export const RMWrapper = styled.div`
  margin: 0% 15%;

  @media (max-width: 1280px) {
    margin-left: 196px;
    margin-right: 197px;
  }

  @media (max-width: 1024px) {
    margin: 0% 5%;
  }

  @media (max-width: 768px) {
    margin: 10% 5%;
  }
`;

export const ModalText = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  padding: 0px 47px;
  text-align: center;
  color: ${(props) => props.theme.colors.h2Color};
`;



export const LabelComponent = styled(Form.Item)`
  label {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize}
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
  .ant-form-item-label > label.ant-form-item-required::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: ${(props)=>props.theme.fontConfig.formErrFontSize};
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
  }

  .ant-form-item-label > label::after {
    display: none;
  }

  .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }


  &.select-alignment label {
    margin-bottom: 19px;
  }
  &.ant-form-item-has-error .ant-form-item-explain {
    font-size: ${(props)=>props.theme.fontConfig.formErrFontSize};
    font-style: italic;
    line-height: 1.36;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.errorColor};
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .phone-input .arrow::after {
    display: none;
  }

  .phone-input .flag-dropdown {
    padding-right: 7px;
    border: 1px solid ${(props) => props.theme.colors.normalInputBorder};
  }

  .phone-input .form-control.invalid-number,
  .phone-input .form-control.invalid-number:focus {
    background-color: transparent;
  }
  .phone-input .flag-dropdown.invalid-number {
    border-color: ${(props) => props.theme.colors.normalInputBorder};
  }

  .phone-input .form-control.invalid-number:hover {
    border-color: ${(props) => props.theme.colors.hoverInputBorder};
  }
  .phone-input .form-control.invalid-number:focus {
    border-color: ${(props) => props.theme.colors.focusedInputBorder};
    box-shadow: none;
  }

  .phone-input .form-control.invalid-number {
    height: ${(props) => (props.suffix ? null : "36px")};
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    border: 1px solid ${(props) => props.theme.colors.normalInputBorder};
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    line-height: 1.38;
    letter-spacing: normal;
    width: 100%;
  }
  &.ant-form-item-has-error .phone-input {
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

  .react-tel-input .form-control{
    width:100%;
    height:36px;
  }
`;
