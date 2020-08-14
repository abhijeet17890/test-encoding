import styled from "styled-components";
import { Divider } from "antd";

export const StyledDivider = styled(Divider)`
    border-top-width: ${(props) => (props.thickness ? props.thickness : "1px")};
    border-top-style: solid;
    border-top-color: ${(props) => props.theme.colors.dividerLineColor};
    opacity: 0.5;
    margin: 0;
`;
