import styled from "styled-components";

export const StyledPhoneInput = styled.div`
  .react-tel-input .arrow::after {
    display: none;
  }

  .react-tel-input .flag-dropdown {
    padding-right: 7px;
    border: 1px solid ${(props) => props.theme.colors.normalInputBorder};
  }

  .react-tel-input .form-control.invalid-number,
  .react-tel-input .form-control.invalid-number:focus,
  .react-tel-input .form-control,
  .react-tel-input .form-control:focus {
    background-color: transparent;
  }
  .react-tel-input .flag-dropdown.invalid-number,
  .react-tel-input .flag-dropdown {
    border-color: ${(props) => props.theme.colors.normalInputBorder};
  }

  .react-tel-input .form-control.invalid-number:hover,
  .react-tel-input .form-control:hover {
    border-color: ${(props) => props.theme.colors.hoverInputBorder};
  }
  .react-tel-input .form-control.invalid-number:focus,
  .react-tel-input .form-control:focus {
    border-color: ${(props) => props.theme.colors.focusedInputBorder};
    box-shadow: none;
  }
  .ant-form-item-has-error .react-tel-input .form-control.invalid-number:focus,
  .ant-form-item-has-error .react-tel-input .form-control.invalid-number:hover,
  .ant-form-item-has-error .react-tel-input .form-control.invalid-number,
  .ant-form-item-has-error .react-tel-input .form-control:focus,
  .ant-form-item-has-error .react-tel-input .form-control:hover,
  .ant-form-item-has-error .react-tel-input .form-control {
    border-color: transparent;
  }

  .react-tel-input .form-control.invalid-number,
  .react-tel-input .form-control {
    height: ${(props) => (props.suffix ? null : "36px")};
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    border: 1px solid ${(props) => props.theme.colors.normalInputBorder};
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    line-height: 1.38;
    letter-spacing: normal;
    width: 100%;
  }

  .react-tel-input {
    font-family: ${(props) => props.theme.fontConfig.fontFamily};
  }

  .ant-form-item-has-error .react-tel-input {
    border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
    border: 1px solid ${(props) => props.theme.colors.errorInputBorder};
  }
`;
