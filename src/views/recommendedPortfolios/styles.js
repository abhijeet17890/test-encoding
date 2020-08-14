import styled from 'styled-components';
import { Result, Divider } from 'antd';
import 'antd/dist/antd.css';

export const PageContainer = styled.div`
    max-width: 1078px;
    margin: auto;
    width: 90%;
    .ant-divider{
        margin-top: 0px;
    }
`;

export const StyledResult = styled(Result)`
    padding:0px;
    padding-top:50px;
    .ant-result-subtitle{
        width: 90%;
        max-width: 634px;
        font-size: ${props=>props.theme.fontConfig.bodyTextFontSize};
        margin-top:25px;
        text-align: center;
        color: ${props=>props.theme.colors.footerBackground};
        margin: auto;
        margin-top: 50px;
    }
    .ant-result-extra{
        margin-top:60px;
    }
    .ant-result-title{
        font-size: ${props=>props.theme.fontConfig.h1FontSize};
        font-weight: ${props=>props.theme.fontConfig.fontWeight2};
        text-align: center;
        color: ${props=>props.theme.colors.h2Color};
    }
    .ant-result-icon{
        margin-bottom:10px;
        img{
            width: 90%;
            max-width: 254px;
        }
    }
`;