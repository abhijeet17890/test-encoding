import styled from 'styled-components';
import Divider from '../../sharedComponents/Divider';

export const StyledParameter = styled.div`
    color:#0c0101;
`;
export const StyledValues = styled.div`
    text-align:right;
    letter-spacing:normal;
    color: #0c0101;
`;
export const MarketStatus = styled.div`
    margin-top:${prop=>prop.theme.elementDistances.h1DisTop};
    margin-bottom:${prop=>prop.theme.elementDistances.h1DisBottom};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
`;
export const StyledDivider = styled(Divider)`
border-top:  ${props=>props.colored? '2px dashed #1997fc':''}

`;