import React, { useState } from "react";
import { Row, Col, Input, Select, Button } from "antd";
import BlueDownArrow from "../../assets/blueDownArrow.png";
import BlueUpArrow from "../../assets/blueUpArrow.png";
import { useHistory } from "react-router-dom";
import {
    StyledSelect,
    StyledP,
    StyledDivider,
    StyledCol,
    StyledOptions,
    BlueArrowImage,
    StyledButton,
} from "./styles";
import { routes } from "../../constants/routes";

const accountTypes = [
    { name: "Individual" },
    { name: "Joint" },
    { name: "Custodial" },
];

function optionTemplate() {
    let options = [];
    accountTypes.map((value, index) => {
        options.push(
            <StyledOptions key={value.name} value={value.name}>
                {value.name}
            </StyledOptions>
        );
    });
    return options;
}

const AccountTypeSelection = (props) => {
    const history = useHistory();
    const [type, setType] = useState("disabled");
    const [disabled, setDisabled] = useState(true);
    const [arrowImage, setArrowImage] = useState(BlueDownArrow);
    function handleChange(value) {
        console.log(`selected ${value}`);
        setType("primary");
        setDisabled(false);
    }
    return (
        <div>
            <Row justify="center">
                <StyledCol>
                    <StyledP>Select your Account</StyledP>
                    <StyledDivider />
                </StyledCol>
            </Row>
            <Row justify="center">
                <StyledCol>
                    <StyledSelect
                        placeholder="Select from option"
                        onChange={handleChange}
                        suffixIcon={
                            <BlueArrowImage
                                src={arrowImage}
                                alt=""></BlueArrowImage>
                        }
                        onDropdownVisibleChange={(open) =>
                            open === true
                                ? setArrowImage(BlueUpArrow)
                                : setArrowImage(BlueDownArrow)
                        }>
                        {optionTemplate()}
                    </StyledSelect>
                </StyledCol>
            </Row>
            <StyledButton
                onClick={() => history.push(routes.authRoutes.kycProcess)}
                type={type}
                disabled={disabled}>
                Next
            </StyledButton>
        </div>
    );
};

export default AccountTypeSelection;
