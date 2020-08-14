import styled from "styled-components";
import { Row, DatePicker } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export const PerformanceWrapper = styled.div`
    // width: 887px;
    margin: 0 auto;
    padding: 20px 0px;
`;

export const PerformanceData = styled.p`
    border-bottom: 1px solid grey;
    display: flex;
`;
export const PerformanceChartContent = styled.div`
    // width: 849px;
`;

export const PerformanceText = styled.p`
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    line-height: 1.38;
    text-align: left;
    color: ${(props) => props.theme.colors.h2Color};

    &.value {
        font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    }

    &.past1week {
        font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
        color: ${(props) => props.theme.colors.stockMarketUp};
    }
`;

export const PerformanceTextDiv = styled.div`
    width: 200px;
`;

export const CustomeDiv = styled.div`
    width: 100px;
    background-color: white;
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.12);
`;

export const CustomeText = styled.p`
    margin-bottom: 0px;
    color: ${(props) => props.theme.colors.btnLgBackground};
`;

export const PerformanceFilterSection = styled.div`
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
`;
export const DateHeading = styled.p`
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    line-height: 1.38;
    text-align: left;
    color: ${(props) => props.theme.colors.footerBackground};

    &.to {
        align-self: center;
        margin-bottom: 0px;
        padding: 0px 10px;
    }
`;

export const DatePickerDiv = styled.div`
    display: flex;
    .ant-picker {
        height: 36px;
        border-radius: ${(props) =>
            props.theme.generalConfig.inputBorderRadius};

        .ant-picker-input > input {
            font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
        }
    }
`;

export const FilterDiv = styled.div`
    width: 45%;
`;
export const DatePickerCont = styled.div`
    width: 45%;
    display: flex;
    justify-content: flex-end;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledRow = styled(Row)`
    margin-top: 31px;
    align-items: flex-end;
`;

export const LoadingIcon = styled(LoadingOutlined)`
    font-size: 30px;
`;

export const StyledDatePicker = styled(DatePicker)`
    div {
        input {
            ::placeholder {
                font-size: 16px;
            }
        }
    }
`;

export const Title = styled.p`
    margin-bottom: 7px;
    font-size: ${(props) => props.theme.fontConfig.chartFontSize};
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;

export const Value = styled.p`
    margin-bottom: 7px;
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    font-size: ${(props) => props.theme.fontConfig.chartFontSize};
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;

export const HighValue = styled.p`
    margin-bottom: 7px;
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    font-size: ${(props) => props.theme.fontConfig.chartFontSize};
    color: ${(props) => props.theme.colors.successColor};
`;

export const LowValue = styled.p`
    margin-bottom: 7px;
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    font-size: ${(props) => props.theme.fontConfig.chartFontSize};
    color: ${(props) => props.theme.colors.errorColor};
`;

export const DividerCol = styled.p`
    margin-top: 12px;
`;
