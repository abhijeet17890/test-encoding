import styled from "styled-components";
import { Switch } from "antd";

export const CustomSwitch = styled(Switch)`
    &.ant-switch{
        background-color: ${props=>props.theme.colors.switchBtnBaseBackground}; 
        min-width: 40px;
        height: 20px;
         .ant-switch-handle {
            top: -1px;
            width: 21px;
            height: 21px;
            &::before{
                background-color: ${props => props.theme.colors.switchBtnCloseCircleBackground}; 
                border-radius: 50%;
            }
         }   
    }
    &.ant-switch.ant-switch-checked{
        .ant-switch-handle {
          &::before{
            background-color: ${props=>props.theme.colors.switchBtnOpenCircleBackground}; 
          }
        }
    }
`;
