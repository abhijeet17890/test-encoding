import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Notification from "../../../sharedComponents/Notification";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import { Row, Col, Spin } from "antd";
import { Button } from "../../../sharedComponents/button/index";
import "antd/dist/antd.css";
import { PageHeading } from "../../../sharedComponents/Heading/index";
import CustomCard from "./customCard";

import { MarginedRow, LoadingIcon } from "./styles";
import { routes } from "../../../constants/routes";

const PlanSelectionScreen = () => {
    const history = useHistory();
    const [selectedPlan, setSelectedPlan] = useState();
    const [loader, setLoader] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [plans, setPlan] = useState([]);

    const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis

    useEffect(() => {
        window.scrollTo(0, 0);
        window.scrollTop = 0;
        // step 3:  function calls for related api functions written in services -> insideAuthApis.js
        connectWithApi()
            .getPlanList()
            .then((res) => {
                console.log("plan response->", res);

                setLoader(false);
                setPlan(res.data);
            })
            .catch((error) => {
                Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    }, [connectWithApi]);

    const renderPlans = (plans) => {
        function planSorter(a, b) {
            var x = a.amount;
            var y = b.amount;
            return x < y ? -1 : x > y ? 1 : 0;
        }
        const listOfPlans = [];

        plans.sort(planSorter).map((plan) => {
            listOfPlans.push(
                <Col>
                    <CustomCard
                        selected={selectedPlan}
                        handleClick={selectPlan}
                        imgSrc={plan.image}
                        plan={plan}
                    />
                </Col>
            );
        });

        return listOfPlans;
    };

    const selectPlan = (plan) => {
        setDisabled(false);
        setSelectedPlan(plan);
    };

    return (
        <div>
            <Row justify="center">
                <Col>
                    <PageHeading>Choose Your Plan</PageHeading>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Spin
                        size="large"
                        indicator={<LoadingIcon />}
                        spinning={loader}
                    />
                </Col>
            </Row>
            <MarginedRow justify="center">{renderPlans(plans)}</MarginedRow>
            <Row justify="center">
                <Col>
                    <Button
                        size="lg"
                        disabled={disabled}
                        type="primary"
                        onClick={() =>
                            history.push({
                                pathname: routes.authRoutes.planPurchase,
                                state: { selectedPlan },
                            })
                        }>
                        Continue
                    </Button>
                    {/* <StyledButton
                        type="primary"
                        disabled={disabled}
                        onClick={() =>
                            history.push({
                                pathname: routes.authRoutes.planPurchase,
                                state: { selectedPlan },
                            })
                        }>
                        Continue
                    </StyledButton> */}
                </Col>
            </Row>
        </div>
    );
};

export default PlanSelectionScreen;
