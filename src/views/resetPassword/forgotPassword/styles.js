import styled from 'styled-components';
import { Form } from 'antd';
import 'antd/dist/antd.css';

export const StyledFormItem = styled(Form.Item)`
    margin-top:45px;
    margin-bottom:${props=>props.name==='email'?'150px':'0'};
    .ant-form-item-explain{
        color:${props=>props.theme.colors.errorColor};
        text-align:left;
        font-style:oblique;
    }
`;  
export const StyledSubHeading = styled.div`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #1d1d1d;
`;


export const ContainerDiv = styled.div`
    margin-top: 4.1em;
`;
