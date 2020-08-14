import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import Notification from "../../../sharedComponents/Notification";
import { Row, Col, Form } from "antd";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis

import {
    StyledRow,
    StyledFormItem,
    ReferralFormItem,
    StyleOtpBoxes,
    MarginedCol,
    SeperatorSpan,
    StyledApplyButton,
    CouponSuccess,
    CouponError,
    RightCol,
} from "./styles";
import { routes } from "../../../constants/routes";
import GrayLinks from "../../../sharedComponents/grayLinks";
import { useHistory } from "react-router-dom";
import Divider from "../../../sharedComponents/Divider/index";
import { Button } from "../../../sharedComponents/button/index";
import { Input, NumberInput } from "../../../sharedComponents/Input/index";
import {
    PageHeading,
    SubHeading,
} from "../../../sharedComponents/Heading/index";

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const PaymentScreen = (props) => {
    const [form] = Form.useForm();
    const location = useLocation();
    const plan = location.state.selectedPlan;
    const history = useHistory();
    const { connectWithApi } = useInsideAuthApi();
    const [loader, setLodaer] = useState();
    const [applyLoader, setApplyLodaer] = useState();
    const [error, setError] = useState(false);
    const [couponRes, setCouponRes] = useState(); // 0 - initial, 1 - success, 2 - error
    const [otp, setOtp] = useState();
    const [amountPayable, setAmountPayable] = useState();
    const [couponId, setCouponId] = useState();

    useEffect(() => {}, [location]);
    useEffect(() => {
        form.setFieldsValue({
            remember: true,
            typeOfPlan: plan.name,
            amount: plan.amount,
            amountPayable: plan.amount,
        });
    }, []);

    const paymentApi = () => {
        setLodaer(true);
        const payload = {
            payment_choice: "Cusomter account plan purchase",
            plan_info: plan.plan_fee_relationship,
            coupon_info: couponId,
        };
        connectWithApi()
            .payment(payload)
            .then((res) => {
                console.log("plan response->", res);
                setLodaer(false);
                history.push({
                    pathname: routes.authRoutes.planPurchaseSuccess,
                    state: { paymentResponse: res.data },
                });
            })
            .catch((error) => {
                Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    };

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // function lengthValidation(e) {
    //     var x = e.target.value;
    //     if (x.length > 1 || !(e.keyCode >= 97 && e.keyCode <= 105)) {
    //         e.target.value = "";
    //         return false;
    //     }
    //     return true;
    // }

    const validateReferralCode = () => {
        setApplyLodaer(true);
        console.log(otp);
        connectWithApi()
            .coupon(otp)
            .then((res) => {
                console.log("plan response->", res);
                setApplyLodaer(false);
                let discountAmount =
                    plan.amount -
                    (plan.amount * res.data.discount_percentage) / 100;
                form.setFieldsValue({ amountPayable: discountAmount });
                setCouponRes(
                    <CouponSuccess>
                        Coupon code applied sucessfully
                    </CouponSuccess>
                );
                setCouponId(res.data.id);
            })
            .catch((error) => {
                form.setFieldsValue({ amountPayable: plan.amount });
                setApplyLodaer(false);
                setCouponRes(<CouponError>Wrong coupon code</CouponError>);
                setCouponId();
                //Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    };

    const onChange = (val) => {
        console.log("This is value of amount" + val);
        //setAmountValue((val) => val);
    };

    const handleOtp = (otp) => {
        setOtp(otp);
    };

    return (
        <div>
            <Row justify="center">
                <Col span={11}>
                    <PageHeading>Payment Details</PageHeading>
                    {/* <StyledDivider></StyledDivider> */}
                    <Divider />
                </Col>
            </Row>
            <StyledRow justify="center">
                <Col span={10}>
                    <Form
                        form={form}
                        hideRequiredMark="false"
                        layout="vertical"
                        name="basic"
                        // initialValues={{
                        //     remember: true,
                        //     typeOfPlan: plan.name,
                        //     amount: plan.amount,
                        // }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Row justify="center">
                            <Col span={11}>
                                <StyledFormItem
                                    label="First Name"
                                    name="first-name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your First Name",
                                        },
                                    ]}>
                                    <Input />
                                </StyledFormItem>
                            </Col>
                            <RightCol span={12}>
                                <StyledFormItem
                                    label="Last Name"
                                    name="last-name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your Last Name",
                                        },
                                    ]}>
                                    <Input />
                                </StyledFormItem>
                            </RightCol>
                        </Row>

                        <StyledFormItem
                            label="Type of Plan"
                            name="typeOfPlan"
                            rules={[{ required: true }]}>
                            <Input disabled />
                        </StyledFormItem>

                        <StyledFormItem
                            label="Amount"
                            name="amount"
                            rules={[{ required: true }]}>
                            <NumberInput
                                formatter={(value) =>
                                    `₹ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) =>
                                    value.replace(/\₹\s?|(,*)/g, "")
                                }
                                onChange={onChange}
                                disabled
                            />
                        </StyledFormItem>

                        <ReferralFormItem label="Referral Code">
                            <OtpInput
                                onChange={(e) => handleOtp(e)}
                                value={otp}
                                numInputs={5}
                                separator={<SeperatorSpan></SeperatorSpan>}
                                inputStyle={StyleOtpBoxes}
                                hasErrored={error ? true : false}
                            />
                            <StyledApplyButton
                                loading={applyLoader}
                                size="sm-2"
                                onClick={validateReferralCode}>
                                Apply
                            </StyledApplyButton>
                        </ReferralFormItem>
                        {/* {couponRes === 1 ? "" : ""} */}
                        <span>{couponRes}</span>

                        <StyledFormItem
                            label="Amount Payable"
                            name="amountPayable">
                            <NumberInput
                                formatter={(value) =>
                                    `₹ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) =>
                                    value.replace(/\₹\s?|(,*)/g, "")
                                }
                                value={amountPayable}
                                onChange={onChange}
                                disabled
                            />
                        </StyledFormItem>

                        <StyledFormItem>
                            <Row justify="center">
                                <MarginedCol>
                                    <Button
                                        size="lg"
                                        onClick={paymentApi}
                                        loading={loader}>
                                        Payment
                                    </Button>
                                </MarginedCol>
                            </Row>
                        </StyledFormItem>

                        <Row justify="center">
                            <Col>
                                <GrayLinks
                                    link={routes.authRoutes.planSelection}>
                                    Change Plan
                                </GrayLinks>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </StyledRow>
        </div>
    );
};

export default PaymentScreen;
