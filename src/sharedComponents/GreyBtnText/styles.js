import styled from 'styled-components';

export const StyledBtnText = styled.span`
    font-size:${prop=>prop.theme.fontConfig.bodyTextFontSize};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: 0.5px;
    text-align: center;
    color: #6c6c6c;
    padding-left:4px;
    cursor:pointer;
    pointer-events:${props=>props.disabled===true?'none':'auto'};
    opacity:${props=>props.disabled===true?'0.4':'default'};
    &:hover{
     text-decoration:underline;
    }
`;