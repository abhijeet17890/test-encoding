import styled from 'styled-components';

export const PageHeading = styled.h1`
font-weight: 600;
font-size: 22px;
color: ${(props) => props.theme.colors.h1Color};
margin: 17.5px 0;
`;
export const StyledQuestion = styled.div`
    // font-family: OpenSans;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    color: #6c6c6c;
    padding-bottom:8px;
`;
export const StyledAns = styled.div`
    text-transform:capitalize;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;=
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    color: #1d1d1d;
`;