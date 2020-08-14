import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form } from "antd";
import { StyledH2, StyledFormItem } from "../styles";
import Notification from "../../../sharedComponents/Notification";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import {
    // StyledRadio,
    RadioGroup,
    FormItem,
    ErrorMsg,
    SuccessMsg,
    StyledSelect,
    BlueArrowImage,
    // StyledCheckbox,
    StyledButtonLarge,
    StyledButtonSmall,
    StyledInput,
    Tick,
    RMConfirmErrorMsg,
    ConfirmButtonCol,
    SubHeadRow,
} from "./styles";
import BlueUpArrow from "../../../assets/blueUpArrow.png";
import BlueDownArrow from "../../../assets/blueDownArrow.png";
import { Button } from "../../../sharedComponents/button/index";
import { Input } from "../../../sharedComponents/Input/index";
import { Select, Option } from "../../../sharedComponents/Select/index";
import { SubHeading } from "../../../sharedComponents/Heading/index";
import { Checkbox } from "../../../sharedComponents/Checkbox/index";
import { RadioButton } from "../../../sharedComponents/RadioButton/index";

// const { Option } = Select;

const AdvisorInfoComponent = (props) => {
    //States
    const [advisorCodeResponse, setadvisorCodeResponse] = useState({
        error: false,
        disabled: true,
        data: null,
    });
    const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
    const [arrowImage, setArrowImage] = useState(BlueDownArrow);
    const [suffixTick, setSuffixTick] = useState(false);
    const [slectedRM, setSlectedRM] = useState();
    const [selectedRMCode, setSelectedRMCode] = useState();
    const [RmCodes, setRmCodes] = useState([]);
    const [loadingAdvisorButton, setLoadingAdvisorButton] = useState(false);
    const [confirmRMButton, setConfirmRMButton] = useState(false);
    const [RMRequired, setRMRequired] = useState(true);
    const [advisorCode, setAdvisorCode] = useState();
    // const [checked, setChecked] = useState(false);

    const [disabled, setDisabled] = useState();
    let formData;

    //Private Methods
    const confirmAdvisorCode = () => {
        if (props.form.getFieldValue("provideDetailsLater")) {
            return;
        }
        if (!advisorCode) {
            props.form.validateFields(["advisorCode"]);
            return;
        }
        setLoadingAdvisorButton(true);
        connectWithApi()
            .advisorSearch(advisorCode)
            .then((res) => {
                props.form.setFieldsValue({ RMCode: "" });
                setSlectedRM(null);
                setLoadingAdvisorButton(false);
                props.setAdvisorDetailsConfirm(true);
                setadvisorCodeResponse({
                    error: false,
                    disabled: false,
                    data: res.data,
                });
                setSuffixTick(true);
                props.setAdvisorDetails(res.data);
            })
            .catch((error) => {
                setadvisorCodeResponse({
                    error: true,
                    disabled: true,
                    data: null,
                });
                props.setAdvisorDetailsConfirm();
                setLoadingAdvisorButton(false);
                setSuffixTick(false);
                Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    };

    // useEffect(() => {
    //     console.log(disabled);
    //     props.form.validateFields(["advisorCode", "RMCode"]);
    // }, [disabled]);

    useEffect(() => {
        if (advisorCodeResponse.data) {
            console.log(advisorCodeResponse.data);
            connectWithApi()
                .rmCodeSearch(advisorCodeResponse.data.advisor_code)
                .then((res) => {
                    setRmCodes(res.data);
                })
                .catch((error) => {
                    Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                    console.log(error);
                });
        }
        if (advisorCodeResponse.error) {
            props.form.setFieldsValue({ RMCode: "" });
            setRmCodes([]);
            setSlectedRM(null);
        }
    }, [advisorCodeResponse]);

    const selectRMCode = (e) => {
        setConfirmRMButton(false);
        let rm = RmCodes.find((code) => {
            return code.rm_code === e;
        });
        props.setRMDetails(rm);
        props.setRMDetailsConfirm(false);
        props.form.setFieldsValue({ RMCode: rm.rm_code });
        setSlectedRM(
            `${rm.relationship_manager_detail.first_name} ${
                rm.relationship_manager_detail.last_name
                    ? rm.relationship_manager_detail.last_name
                    : ""
            }`
        );
    };

    const confirmRMCode = () => {
        if (slectedRM) {
            console.log(slectedRM);
            setConfirmRMButton(true);
            props.setRMDetailsConfirm(true);
        } else {
            props.form.validateFields(["RMCode"]);
            // props.setRMDetailsConfirm(false);
        }
    };

    const resetFormFields = () => {
        props.setAdvisorDetailsConfirm(false);
        setConfirmRMButton(false);
        props.form.setFieldsValue({ RMCode: "" });
        setSlectedRM(null);
        setRmCodes([]);
        setSuffixTick(false);
    };

    const selectAdvisorCode = (e) => {
        setAdvisorCode(e.target.value);
        resetFormFields();
        if (!advisorCodeResponse.disabled || advisorCodeResponse.error) {
            setadvisorCodeResponse((state) => {
                return { error: false, disabled: true, data: null };
            });
        }
    };

    const onRadioChange = (e) => {
        if (!e.target.value) {
            props.setAdvisorDetailsConfirm(true);
            props.setRMDetailsConfirm(true);
        } else {
            if (props.form.getFieldValue("provideDetailsLater")) {
                props.setAdvisorDetailsConfirm(true);
                props.setRMDetailsConfirm(true);
            } else {
                props.form.setFieldsValue({ advisorCode: "" });
                resetFormFields();
                setadvisorCodeResponse((state) => {
                    return { error: false, disabled: true, data: null };
                });
                props.setRMDetailsConfirm(false);
            }
        }
        props.setHasAdvisor(e.target.value);
    };

    const optionTemplate = () => {
        let options = [];
        RmCodes.map((value, index) => {
            options.push(<Option key={value.rm_code}>{value.rm_code}</Option>);
        });
        return options;
    };

    const onCheckboxChange = (e) => {
        setDisabled(e.target.checked);
        setRMRequired(!e.target.checked);
        props.setRMDetailsConfirm(e.target.checked);
        props.setAdvisorDetailsConfirm(e.target.checked);
        setadvisorCodeResponse((state) => {
            return { error: false, disabled: true, data: null };
        });
        setAdvisorCode();
        props.form.resetFields(["advisorCode", "RMCode"]);
        setSuffixTick(false);
        // setChecked(e.target.checked);
        //props.form.validateFields(["RMCode"]);
    };

    useEffect(() => {
        if (!advisorCodeResponse.disabled)
            props.form.validateFields(["RMCode"]);
    }, [RMRequired]);

    return (
        <React.Fragment>
            <SubHeadRow justify="center">
                <Col span={11}>
                    <SubHeading>Advisor Details</SubHeading>
                </Col>
            </SubHeadRow>
            <Row justify="center">
                <Col xs={{ span: 20 }} lg={{ span: 11 }}>
                    <Form.Item name="hasAdvisor" initialValue={true}>
                        {/* <Radio.Group></Radio.Group> */}
                        <RadioGroup onChange={onRadioChange}>
                            <Row>
                                <Col xs={{ span: 20 }} lg={{ span: 11 }}>
                                    <RadioButton value={true}>
                                        I have an advisor
                                    </RadioButton>
                                </Col>
                                <Col xs={{ span: 20 }} lg={{ span: 11 }}>
                                    <RadioButton value={false}>
                                        Skip advisor selection
                                    </RadioButton>
                                </Col>
                            </Row>
                        </RadioGroup>
                    </Form.Item>
                </Col>
            </Row>
            {props.hasAdvisor ? (
                <>
                    <Row justify="center">
                        <Col xs={{ span: 20 }} lg={{ span: 9 }}>
                            <FormItem
                                name="advisorCode"
                                label="Advisor Code"
                                rules={[
                                    {
                                        required: !disabled,
                                        message: "Advisor Code is required",
                                    },
                                ]}>
                                <Input
                                    disabled={disabled}
                                    placeholder="Advisor Code"
                                    name="advisorCodeInput"
                                    suffix={suffixTick ? <Tick /> : ""}
                                    onChange={selectAdvisorCode}
                                />
                            </FormItem>
                            <RMConfirmErrorMsg>
                                {props.AdvisorDetailsConfirm === false &&
                                props.form.getFieldValue("advisorCode")
                                    ?.length > 0 ? (
                                    <i>Please confirm Advisor Code</i>
                                ) : (
                                    " "
                                )}
                            </RMConfirmErrorMsg>
                            {advisorCodeResponse.error ? (
                                <ErrorMsg>
                                    Error: Incorrect Advisor Code
                                </ErrorMsg>
                            ) : (
                                <SuccessMsg>
                                    {advisorCodeResponse.data
                                        ? `${
                                              advisorCodeResponse.data
                                                  ?.advisor_detail?.first_name
                                          } ${
                                              advisorCodeResponse.data
                                                  ?.advisor_detail?.last_name
                                                  ? advisorCodeResponse.data
                                                        ?.advisor_detail
                                                        ?.last_name
                                                  : ""
                                          }`
                                        : " "}
                                </SuccessMsg>
                            )}
                        </Col>
                        <ConfirmButtonCol xs={{ span: 20 }} lg={{ span: 2 }}>
                            <FormItem label=" &nbsp; ">
                                <Button
                                    size="sm-2"
                                    loading={loadingAdvisorButton}
                                    type="primary"
                                    onClick={confirmAdvisorCode}
                                    disabled={!advisorCodeResponse.disabled}>
                                    Confirm
                                </Button>
                            </FormItem>
                        </ConfirmButtonCol>
                    </Row>

                    <Row justify="center">
                        <Col xs={{ span: 20 }} lg={{ span: 9 }}>
                            <FormItem
                                // initialValue={deafultRMValue}
                                name="RMCode"
                                label="Relationship Manager Code"
                                rules={[
                                    {
                                        required: !disabled,
                                        message: "RM Code is required",
                                    },
                                ]}>
                                <Select
                                    placeholder="RM Code"
                                    notFoundContent="Confirm Advisor first"
                                    disabled={disabled}
                                    suffixIcon={
                                        <BlueArrowImage
                                            src={arrowImage}
                                            alt=""></BlueArrowImage>
                                    }
                                    onDropdownVisibleChange={(open) =>
                                        open === true
                                            ? setArrowImage(BlueUpArrow)
                                            : setArrowImage(BlueDownArrow)
                                    }
                                    onChange={selectRMCode}
                                    value={selectedRMCode}>
                                    {optionTemplate()}
                                </Select>
                            </FormItem>
                            <RMConfirmErrorMsg>
                                {props.RMDetailsConfirm === false &&
                                props.form.getFieldValue("RMCode") ? (
                                    <i>Please confirm RM Code</i>
                                ) : (
                                    " "
                                )}
                            </RMConfirmErrorMsg>
                            <SuccessMsg>{slectedRM}</SuccessMsg>
                        </Col>
                        {/* <ConfirmButtonCol xs={{ span: 20 }} lg={{ span: 2 }}>
                            <FormItem label=" &nbsp; ">
                                <StyledButtonSmall
                                    disabled={confirmRMButton}
                                    type="primary"
                                    onClick={confirmRMCode}>
                                    Confirm
                                </StyledButtonSmall>
                            </FormItem>
                        </ConfirmButtonCol> */}
                        <ConfirmButtonCol xs={{ span: 20 }} lg={{ span: 2 }}>
                            <FormItem label=" &nbsp; ">
                                <Button
                                    size="sm-2"
                                    type="primary"
                                    onClick={confirmRMCode}
                                    disabled={confirmRMButton}>
                                    Confirm
                                </Button>
                            </FormItem>
                        </ConfirmButtonCol>
                    </Row>

                    <Row justify="center">
                        <Col xs={{ span: 20 }} lg={{ span: 11 }}>
                            <StyledFormItem
                                name="provideDetailsLater"
                                valuePropName="checked"
                                initialValue={false}
                                // noStyle
                            >
                                <Checkbox
                                    //checked={checked}
                                    onChange={onCheckboxChange}>
                                    I will provide the details later
                                </Checkbox>
                            </StyledFormItem>
                        </Col>
                    </Row>
                </>
            ) : (
                ""
            )}
        </React.Fragment>
    );
};

export default AdvisorInfoComponent;
