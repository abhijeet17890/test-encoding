import styled from 'styled-components';
import { Form } from 'antd';
import 'antd/dist/antd.css';

export const ContainerDiv = styled.div`
    margin-top:4.1em;
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

export const StyledFormItem = styled(Form.Item)`
    margin-top:10px;
    margin-bottom:50px;
    .ant-form-item-explain{
        color:#fc0a0a;
        text-align:left;
        font-style:oblique;
        max-width: 295px;
    }
    .ant-col-16{

        max-width:100%;
    }
`;   
export const StyledSpace = styled.div`
    margin-top:25px;
`;
export const ResendMessage = styled.div`
    color:#6c6c6c;
    margin-bottom:30px;
`;