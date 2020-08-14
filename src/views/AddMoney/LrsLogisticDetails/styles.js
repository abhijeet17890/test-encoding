import styled from 'styled-components';
import {SubHeading} from '../../../sharedComponents/Heading';
import {Row, Col, Form, Radio} from 'antd';
import {Button } from '../../../sharedComponents/button';

export const StyledSubHeading = styled(SubHeading)`
    font-size:20px;
`;

export const Label = styled.p`
    ::after{
        content:'*';
        color:${props=>props.req?'red':'white'};
    }
    font-size:16px;
    color:#1d1d1d;
    margin-block-start: 7px;
    margin-block-end: 7px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`;
export const StyledCol = styled(Col)`
    margin-left:19px;
`;
export const FormItem = styled(Form.Item)`
    margin-bottom:5px;
`;
export const Title = styled.div`
    font-weight:600;
    color:#1d1d1d;
    font-size:16px;
`;
export const Note = styled.div`
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #484848;
`;

export const Details = styled.div`
font-size: 16px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: normal;
text-align: left;
color: #1d1d1d;
`;

export const StyledButton = styled(Button)`
    width:180px;
    height:57px;
`;

export const ButtonCol = styled(Col)`
    margin-left:12.5px;
`;
export const CustomizedRadioGroup = styled(Radio.Group)`
    display:flex;
    justify-content:space-around ;
    
`;
