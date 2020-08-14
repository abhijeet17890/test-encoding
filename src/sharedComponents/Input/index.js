import React from "react";
import { StyledInput, StyledNumberInput } from "./styles";

function checkNumValue(e, props){
    // debugger;
    if(props.strictNumType){
        let lastCharacterEntered;
        const allowedChars = "0123456789.";
        function contains(stringValue, charValue) {
            return stringValue.indexOf(charValue) > -1;
        }
        let invalidKey =
            (e.key.length === 1 && !contains(allowedChars, e.key)) ||
            (e.key === "." && contains(e.target.value, "."));
        if (!invalidKey) {
            if (lastCharacterEntered === "." && e.key === ".") {
                e.preventDefault();
            } else {
                lastCharacterEntered = e.key;
            }
        }else if(e.metaKey || e.ctrlKey){
            lastCharacterEntered = e.key;
        }else{
            e.preventDefault();
        }
    }

}


export function Input(props) {
    return <StyledInput
        {
            ...{
            ...(props),
            ...(props.strictNumType && { onKeyDown:(e)=>checkNumValue(e, props) }),
        }}
    />;
}

export function NumberInput(props) {
    return <StyledNumberInput
        {
            ...{
                ...(props),
                ...(props.strictNumType && { onKeyDown:(e)=>checkNumValue(e, props) }),
            }}
    />;
}
