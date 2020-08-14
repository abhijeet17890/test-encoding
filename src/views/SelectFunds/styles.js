import styled from 'styled-components';
import { Result } from 'antd';
import 'antd/dist/antd.css';


export const StyledResult = styled(Result)`
    .ant-result-subtitle{
        width: 44vw;
        font-size: 17px;            
        letter-spacing: normal;
        text-align: center;
        color: #000000;
        margin-top:60px;
    }
    .ant-result-icon{
        margin-bottom:10px;
    }
`;
export const StyledImg = styled.img`
    width: 20vw;
    height: 20vw;
    object-fit: contain;
`;
