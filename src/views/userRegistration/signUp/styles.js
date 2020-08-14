import styled from 'styled-components';
import {Form} from 'antd';
import { Input } from '../../../sharedComponents/Input/index';
import { CheckOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

export const StyledEmail = styled(Input)`
    border: ${props=>props.error===true?`1px solid #ff4d4f`: ``};
    box-shadow:${props=>props.error===true?` 0px 0 2px 1.5px #fc0a0a26`:''}

`; 


export const StyledExistingUser = styled.div`
    margin-top:20px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #6c6c6c;
`;
export const StyledSpace = styled.div`
    padding:40px;
`;

export const StyledError = styled.div`
    color:red;
    font-style:oblique;
    margin: 0 auto;
`;


export const ContainerDiv = styled.div`
    margin-top: 4.1em;
`;

export const StyledList = styled.ul`
    list-style:none;
    padding-left:3px;
    color:black;
    padding-top:8px;
`;

export const StyledLi = styled.li`
    padding-top: 6px;
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom:0px;
    margin-top:31px;
    .ant-form-item-explain {
        display:${props=>props.bottomMargin? 'inline':'none'};
        padding-top:4px;
        color:#fc0a0a;
        text-align:left;
        font-style:oblique;
    }
`;
export const StyledForm = styled(Form)`
    margin-top:47px;
`;
export const IconContainer = styled.div`
    position:absolute;
    top:-50px;
`;

export const Info = styled.img`
    height: ${props=>props.i?'25px':'14px'};
    cursor:${props=>props.i?'pointer':'default'}
`;
export const Span = styled.span`
    padding-left: 18.5px;
`;

export const Tick = styled(CheckOutlined)`
    color:#60cdb3;
`;
