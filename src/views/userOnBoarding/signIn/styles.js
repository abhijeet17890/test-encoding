import styled from 'styled-components';
import {Form} from 'antd';
import 'antd/dist/antd.css';


export const StyleSignIn = {
    fontSize: '17px',
    color: 'gray'
};


export const ContainerDiv = styled.div`
    margin-top: 4.1em;
`;


export const StyledForm = styled(Form)`
    margin-top:47px;
`;
export const StyledFormItem = styled(Form.Item)`
label {
    font-size: 16px;
}
    margin-bottom:0px;
    margin-top:31px;
    .ant-form-item-explain {
        padding-top:4px;
        color:#fc0a0a;
        text-align:left;
        font-style:oblique;
    }
`;
export const StyledNewUser = styled.h1`
    margin-top:0px;
    // font-family: OpenSans;
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
    margin-top:25px;
`;