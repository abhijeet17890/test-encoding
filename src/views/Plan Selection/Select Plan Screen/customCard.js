import React, { useEffect } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

import {
    WrapperCard,
    StyledImg,
    InnerCard,
    HeadingRow,
    BodyRow1,
    BodyRow1Col1,
    BodyRow1Col2,
    CardHeading,
    StyledDivider,
    StyledUl,
    TickDiv,
    Tick,
    StyledImgDiv,
} from "./styles";

const customCard = (props) => {
    const coverImg = props.imgSrc ? (
        <StyledImg alt="img" src={props.imgSrc} />
    ) : (
        <StyledImgDiv />
    );
    return (
        <WrapperCard
            selected={props.selected}
            name={props.plan.name}
            onClick={() => props.handleClick(props.plan)}>
            {props.selected?.name === props.plan.name ? (
                <TickDiv>
                    <Tick>&#10003;</Tick>
                </TickDiv>
            ) : null}
            <InnerCard bordered={false} cover={coverImg} />
            <HeadingRow justify="center">
                <CardHeading>
                    {props.plan.name.toUpperCase()} MEMBERSHIP
                </CardHeading>
            </HeadingRow>
            <BodyRow1>
                <BodyRow1Col1 lg={{ span: 12 }} xs={{ span: 10 }} value="vv">
                    {`₹ ${props.plan.amount}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                    )}
                </BodyRow1Col1>
                <BodyRow1Col2 lg={{ span: 12 }} xs={{ span: 14 }}>
                    {props.plan.free_trail_in_months > 1
                        ? `${props.plan.free_trail_in_months} Months Free Trial`
                        : `${props.plan.free_trail_in_months} Month Free Trial`}
                </BodyRow1Col2>
            </BodyRow1>
            <StyledDivider />
            <StyledUl>
                <li>
                    {props.plan.associated_latest_fee.account_opening_fee > 1
                        ? `₹${props.plan.associated_latest_fee.account_opening_fee}
                    account opening fees`
                        : `₹${props.plan.associated_latest_fee.account_opening_fee}
                    account opening fee`}
                </li>
                <li>
                    ${props.plan.associated_latest_fee.rate}{" "}
                    {props.plan.associated_latest_fee.fee_type === "Share"
                        ? "per share per trade"
                        : "per trade"}
                </li>
            </StyledUl>
        </WrapperCard>
    );
};

export default customCard;
