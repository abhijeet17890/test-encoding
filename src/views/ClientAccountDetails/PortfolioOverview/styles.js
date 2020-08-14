import styled from 'styled-components';
import { Select } from '../../../sharedComponents/Select/index';

export const Container = styled.div`
    padding-top:20px;
    height: 324px;
    background-image: linear-gradient(67deg, #05274a 24%, #309fe9 91%);
    margin-bottom: 46px;
`;

export const PageContainer = styled.div`
    text-align: left;
    width:95%;
    margin: ${window.innerWidth > 768 ? '20px' : '64px'} auto 30px auto; 
    font-size: ${window.innerWidth > 768 ? (props) => props.theme.fontConfig.bodyTextFontSize : '12px'};
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;
export const StyledSelect = styled(Select)`
    color: #ffff;
    .ant-select-selector.ant-select-selector.ant-select-selector, .ant-select-selector.ant-select-selector.ant-select-selector:hover {
        border-color: #ffff;
        background-color: Transparent;
    }
    .ant-select-arrow {
        color:#ffff;
    }
`;
export const Text = styled.div`
    object-fit: contain;
    font-size: ${props=>props.small? '14px': '18px'};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #ffffff;
`;
export const SubTitle = styled.span`
    font-size:14px;
  
`;