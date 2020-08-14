import styled from 'styled-components';
import { Result, Divider } from 'antd';
import 'antd/dist/antd.css';

export const PageContainer = styled.div`
    max-width: 1078px;
    margin: auto;
    width: 90%;
`;

export const StyledResult = styled(Result)`
    padding:0px;
    padding-top:50px;
    .ant-result-subtitle{
        width: 90%;
        max-width: 634px;
        // height: 22px;
        // font-family: OpenSans;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        margin-top:25px;
        text-align: center;
        color: #000000;
        margin: auto;
        margin-top: 50px;
    }
    .ant-btn-primary {
        width:25vw;
        height: 57px;
        border-radius: 10px;
        background-color: #0097ff;
        font-size:17px;
    }
    .ant-result-extra{
        margin-top:60px;
    }
    .ant-result-title{
        // font-family: OpenSans;
        font-size: 28px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.79;
        letter-spacing: normal;
        text-align: center;
        color: #011c3c;
    }
    .ant-result-icon{
        margin-bottom:10px;
        img{
            width: 90%;
            max-width: 254px;
        }
    }
`;


export const StyledDivider = styled(Divider)`
  border-top: 1px solid #cccccc;
`;

export const StyledTitle = styled.div`
    h2.ant-typography{
        font-size: 28px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.79;
        letter-spacing: normal;
        text-align: left;
        color: #011c3c;
        margin-bottom: 0px;
    }
`;
