import styled from 'styled-components';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Button} from '../../sharedComponents/button/index';
import 'antd/dist/antd.css';


export const StyledList = styled.li`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    list-style:none;
    border-bottom: 1px solid #efeeee;
    // font-family: OpenSans;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #1d1d1d;
    padding:20px 60px 20px 30px;
`;

export const StyledIconContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;


export const StyledIcon = styled.div`
    cursor:pointer;
    width:37px;
    height:37px;
    background-color:${props=>props.theme.colors.primaryThemeColor};
    border-radius:6px;
    text-align:center;
    line-height:37px;
`;

export const StyledEyeOutlined= styled(EyeOutlined)`
    color:white;
    width:24px;
`;
export const StyledEditOutlined= styled(EditOutlined)`
    color:white;
    width:24px;
`;
export const StyledDeleteOutlined=styled(DeleteOutlined)`
    color:white;
    width:24px;
`;
export const StyledButton = styled(Button)`                             //update common component
    width:${props=>props.modalbutton===true?'202.9px':'133px'};
    height:${props=>props.modalbutton===true?'42px':'36px'};
    font-weight:normal;
`;