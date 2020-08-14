import styled from "styled-components";

export const StyledPageHeading = styled.h1`
    font-weight: 600;
    font-size: ${(props) => props.theme.fontConfig.h1FontSize};
    color: ${(props) => props.theme.colors.h1Color};
    margin: 17.5px 0;
`;
export const StyledSubHeading = styled.h2`
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    font-size: ${(props) => props.theme.fontConfig.h2FontSize};
    color: ${(props) => props.theme.colors.h2Color};
`;
