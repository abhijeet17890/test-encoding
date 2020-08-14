import styled from 'styled-components';
import 'antd/dist/antd.css';
import {  DatePicker } from 'antd';
import { Button } from '../../../../../sharedComponents/button';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

export const TextInput = styled(Input)`
font-size: 16px;
border-radius: 6px;
height: ${(props) => (props.suffix ? null : "36px")};
padding: ${(props) => (props.suffix ? 0 : "4px 11px")};
box-shadow: none;
input {
    ::placeholder {
        font-size: 16px;
        color: ${(props) => props.theme.colors.placeholderColor};
    }
}
::placeholder {
    /* line-height: 22px; */
    font-size: 16px;
    color: ${(props) => props.theme.colors.placeholderColor};
}
:hover {
    border-color: ${(props) => props.theme.colors.hoverInputBorder};
}
:focus {
    border-color: ${(props) => props.theme.colors.focusedInputBorder};
    box-shadow: none;
}
span {
    padding: 0 10px;
}
.ant-input.ant-input {
    padding: 4px 11px;
    height: 36px;
    border-radius: 6px;
}
`;
export const StyledTextArea = styled(TextArea)`
   font-size: 16px;
   border-radius: 6px;
   padding: ${(props) => (props.suffix ? 0 : "4px 11px")};
   resize:none;
`;
export const StyledInput = styled.div`
   text-align: left;
   p{
      margin-bottom: .5rem;
      min-height: 25px;
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
   .ant-picker-suffix{
      color: #2c93d9;
   }
   &.ant-picker:hover, &.ant-picker-focused {
      border-color: #000000;
  }
`;