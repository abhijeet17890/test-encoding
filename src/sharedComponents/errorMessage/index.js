import React from 'react';
import StyledError from './styles.js';

function ErrorMessage(props){
    return(
        <StyledError otp={props.otp} fp={props.fp}>{props.errorMsg}</StyledError>
    );
}

export default ErrorMessage;