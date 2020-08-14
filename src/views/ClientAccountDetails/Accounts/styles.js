import styled from 'styled-components';
import { PageHeading } from '../../../sharedComponents/Heading';
import {Row, Col} from 'antd';

export const StyledSpace = styled.div`
    margin-bottom:64px;
`;
export const StyledPageHeading = styled(PageHeading)`
    font-size: 20px;
    margin-top:0;
    margin-bottom:20px;
`;
export const container = styled.div`
   text-align: left;
   width:95%;
   max-width: 1280px;
   margin: ${window.innerWidth > 768 ? '10px' : '64px'} auto 30px auto; 
   font-size: ${window.innerWidth > 768 ? (props) => props.theme.fontConfig.bodyTextFontSize : '12px'};
   color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;
