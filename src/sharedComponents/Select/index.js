import React from "react";
import { StyledSelect, Option } from "./styles";

export function Select(props) {
    return <StyledSelect {...props}>{props.children}</StyledSelect>;
}

export { Option };
