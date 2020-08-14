import React from "react";
import Chart from "../../../sharedComponents/Chart/index";

const PerformanceSection = (props) => {
    return <Chart symbol={props.header_data?.symbol} />;
};

export default PerformanceSection;
