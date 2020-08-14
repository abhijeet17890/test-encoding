import styled from 'styled-components';
import { Result } from 'antd';

export const PageContainer = styled.div`
  margin-top:1.3em
`;

export const StyledResult = styled(Result)`
    .ant-result-subtitle{
        margin: 3em auto;
        width: 50.5vw;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        margin-top:25px;
        text-align: center;
        color: #000000;
    }
    .ant-result-extra{
        margin-top:100px;
    }
    .ant-result-title{
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
    }
`;
export const Img = styled.img`
    width: 20vw;
    height: 20vw;
    objectFit: contain;
`;
