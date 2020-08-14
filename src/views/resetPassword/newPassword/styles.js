import styled from 'styled-components';
import { Form } from 'antd';
import 'antd/dist/antd.css';

export const ContainerDiv = styled.div`
    margin-top: 4.1em;
`;
export const StyledForm = styled(Form)`
    margin-top:47px;
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom:${props=> props.name==='confirm'?'49px':'0'};
    margin-top:31px;
    .ant-form-item-explain {
        padding-top:4px;
        color:#fc0a0a;
        text-align:left;
        font-style:oblique;
    }
`; 
export const Tick = styled.img`
    height: ${props=>props.i?'25px':'14px'};
    cursor:${props=>props.i?'pointer':'default'}
`;

export const StyledError = styled.div`
    color:red;
    font-style:oblique;
    text-align:left;
    padding-top:8px;
    padding-left:1px;
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
export const Span = styled.span`
    padding-left:18.5px;
`;