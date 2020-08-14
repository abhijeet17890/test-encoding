import styled from 'styled-components';


export const StyledDetails = styled.div`
    font-size: ${props=>props.theme.fontConfig.bodyTextFontSize};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
    text-transform: capitalize;
    &.disclosure-link {
        color: #11a1e9;
        cursor: pointer;
      }
`;
 