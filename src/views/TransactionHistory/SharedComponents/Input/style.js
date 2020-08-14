import styled from "styled-components";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { Button } from "../../../../sharedComponents/button";

export const StyledInput = styled.div`
  text-align: left;
  p {
    margin-bottom: 0.5rem;
    min-height: 25px;
  }

  .ant-select-selection-item {
    font-size: 16px;
  }
`;
export const StyledButton = styled(Button)`
  min-height: 36px;
  width: 100%;
`;

export const Styleddatepicker = styled(DatePicker)`
  border: solid 1px #d9d9d9;
  border-radius: 6px;
  min-height: 36px;
  width: 100%;
  .ant-picker-suffix {
    color: #2c93d9;
  }
  &.ant-picker:hover,
  &.ant-picker-focused {
    border-color: #000000;
  }

  .ant-picker-input > input {
    font-size: 16px;
  }
`;
