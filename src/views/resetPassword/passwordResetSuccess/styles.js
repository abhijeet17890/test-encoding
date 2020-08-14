import styled from 'styled-components';
import { Result } from 'antd';
import 'antd/dist/antd.css';

export const StyledResult = styled(Result)`
    margin-top:4.1em;
    .ant-result-subtitle{
        // width: 322px;
        // height: 22px;
        // font-family: OpenSans;
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: center;
        color: #000000;
    }
    .ant-btn-primary {
        margin-top:15px;
        width:380px;
        height: 57px;
        border-radius: 10px;
        background-color: #0097ff;
        font-size:17px;
    }
`;
export const Img = styled.img`
    width: 18vw;
    height: 18vw;
    objectFit: contain;
`;