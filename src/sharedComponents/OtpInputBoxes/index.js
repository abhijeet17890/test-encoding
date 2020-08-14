import React from 'react';
import OtpInput from 'react-otp-input';

import {defaultValues} from "../../constants/defaultValues";
import * as S from './styles';

const OtpInputBoxes = ({numberInputs, onChange, hasErrored}) => ( 

    <OtpInput
        onChange={onChange}
        numInputs={numberInputs?numberInputs:defaultValues.otpLength}
        hasErrored={hasErrored}
        separator={<S.Separator/>}
        inputStyle={S.StyleOtpBoxes}
        // focusStyle={{border:'solid 1.5px #0097ff'}}
        errorStyle={S.ErrorStyle}
        shouldAutoFocus={false}
    />
)
export default OtpInputBoxes;