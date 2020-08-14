import React from "react";
import { StyledPageHeading, StyledSubHeading } from "./styles";

export function PageHeading(props) {
    return <StyledPageHeading {...props}>{props.children}</StyledPageHeading>;
}
export function SubHeading(props) {
    return <StyledSubHeading {...props}>{props.children}</StyledSubHeading>;
}
