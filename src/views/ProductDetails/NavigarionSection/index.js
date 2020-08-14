import React from "react";
import { NavWrapper, ProductDetailsTab } from "./style";
import SummarySection from "../SummarySection";
import InformationSection from "../InformationSection";
import PerformanceSection from "../PerformanceSection";
import News from "../NewsSection";
const { TabPane } = ProductDetailsTab;

const NavContent = ({ header_data, other_data, summaryValue }) => (
    <ProductDetailsTab defaultActiveKey="1">
        <TabPane tab="Summary" key="1">
            <SummarySection
                header_data={header_data}
                other_data={other_data}
                summaryValue={summaryValue}
            />
        </TabPane>
        <TabPane tab="Performance" key="2">
            <PerformanceSection header_data={header_data} />
        </TabPane>
        <TabPane tab="Information" key="3">
            <InformationSection
                header_data={header_data}
                other_data={other_data}
            />
        </TabPane>
        {/* <TabPane tab="News" key="4">
            <News />
        </TabPane> */}
    </ProductDetailsTab>
);

const ProductDetailsNavigation = ({
    header_data,
    other_data,
    summaryValue,
}) => {
    const content = NavContent({ header_data, other_data, summaryValue });
    return <NavWrapper>{content}</NavWrapper>;
};

export default ProductDetailsNavigation;
