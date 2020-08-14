import React from "react";
import StyledButton from "./styles";

export function Button(props) {
    return <StyledButton {...props}>{props.children}</StyledButton>;
}
