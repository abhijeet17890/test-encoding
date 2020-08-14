import React, {useEffect, useState} from "react";
import { Row, Col, Button } from "antd";
import TimerFunction from "./timerFunction";
import { defaultValues } from "../../constants/defaultValues";

const OtpTimer = ({time, enable, onTimerComplete}) => {
    const [OTPEnabling, setOTPEnabling] = useState(false);

    useEffect(() => {
        setOTPEnabling(enable);
    },[enable]);

    const onComplete = () => {
        setOTPEnabling(false);
        onTimerComplete();
    };

    return (
        <>
            {OTPEnabling ? (
                <span>
                 {" in "}
                    <TimerFunction
                        enable = {enable}
                        onComplete={onComplete}
                        time={time?time:defaultValues.otpTime}
                    />
                </span>
            ) : (
                " "
            )}
        </>
    );
};

export default OtpTimer;
