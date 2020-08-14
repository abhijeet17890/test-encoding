import React, { useState } from "react";
import { Row, Col, Input, Form } from "antd";
import { StyledCol, HeadingCol, StyledDivider, StyledH1 } from "./styles";
import { StyledButtonLarge } from "./Advisor Info/styles";
import UserInfoComponent from "./User Info/index";
import AdvisorInfoComponent from "./Advisor Info/index";
import { useHistory } from "react-router-dom";
import Notification from "../../sharedComponents/Notification";
import { useAuth } from "../../contextProviders/authProvider";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import { routes } from "../../constants/routes";
import Divider from "../../sharedComponents/Divider/index";
import { PageHeading } from "../../sharedComponents/Heading/index";
import { Button } from "../../sharedComponents/button/index";

const AdvisorSelection = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { updateLoggedInUserInfo } = useAuth();
    const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
    const [AdvisorDetails, setAdvisorDetails] = useState();
    const [RMDetailsConfirm, setRMDetailsConfirm] = useState();
    const [AdvisorDetailsConfirm, setAdvisorDetailsConfirm] = useState();
    const [RMDetails, setRMDetails] = useState(false);
    const [hasAdvisor, setHasAdvisor] = useState(true);

    // const [RMError, setRMError] = useState();

    const onFinish = (e) => {
        console.log(e);
        console.log(RMDetailsConfirm);
        console.log(AdvisorDetailsConfirm);

        if (!RMDetailsConfirm || !AdvisorDetailsConfirm) {
            setRMDetailsConfirm(false);
            return;
        } else {
            setAdvisorDetailsConfirm(true);
            setRMDetailsConfirm(true);

            let payload = {};
            payload.first_name = e.firstName.trim();
            payload.last_name = e.lastName.trim();

            if (e.hasAdvisor) {
                if (e.provideDetailsLater) {
                    payload.select_advisor_later = true;
                } else {
                    payload.advisor = AdvisorDetails.id;
                    payload.relationship_manager = RMDetails.id;
                }
            } else {
                payload.skip_advisor_selection = true;
            }

            console.log(payload);
            connectWithApi()
                .selectAdvisor(payload)
                .then((res) => {
                    console.log(res);
                    updateLoggedInUserInfo({
                        personal_details: {
                            first_name: payload.first_name,
                            last_name: payload.last_name,
                        },
                    });
                    history.push(routes.authRoutes.kycProcess);
                })
                .catch((error) => {
                    Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                    console.log(error);
                });
        }
    };

    const onFailedFinish = () => {
        window.scrollTo(0, 100);
        window.scrollTop = 0;
    };

    return (
        <Form
            scrollToFirstError={true}
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFailedFinish}
            hideRequiredMark>
            <Row justify="center">
                <Col span={11}>
                    <PageHeading>Advisor Selection</PageHeading>
                    <Divider />
                </Col>
            </Row>
            <UserInfoComponent />
            <AdvisorInfoComponent
                RMDetailsConfirm={RMDetailsConfirm}
                AdvisorDetailsConfirm={AdvisorDetailsConfirm}
                setAdvisorDetailsConfirm={setAdvisorDetailsConfirm}
                setRMDetailsConfirm={setRMDetailsConfirm}
                setAdvisorDetails={setAdvisorDetails}
                setRMDetails={setRMDetails}
                setHasAdvisor={setHasAdvisor}
                hasAdvisor={hasAdvisor}
                form={form}
            />
            <Row justify="center">
                <Col>
                    <Button
                        size="lg"
                        disabled={!AdvisorDetailsConfirm}
                        htmlType="submit">
                        Next
                    </Button>
                    {/* <StyledButtonLarge
                        disabled={!AdvisorDetailsConfirm}
                        // onClick={
                        //     () => console.log(formData)
                        //     //history.push(routes.authRoutes.accountTypeSelection)
                        // }
                        htmlType="submit"
                        type="primary">
                        Next
                    </StyledButtonLarge> */}
                </Col>
            </Row>
        </Form>
    );
};

export default AdvisorSelection;
