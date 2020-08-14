import React, { useState, useEffect, Fragment } from "react";
import moment, { min } from "moment";
import momenttz from "moment-timezone";
import {
    PerformanceWrapper,
    // PerformanceData,
    PerformanceChartContent,
    // PerformanceText,
    // PerformanceTextDiv,
    // CustomeDiv,
    // CustomeText,
    PerformanceFilterSection,
    DateHeading,
    DatePickerDiv,
    FilterDiv,
    DatePickerCont,
    FilterContainer,
    StyledRow,
    StyledDatePicker,
} from "./styles";
import { Menu, Row, Col, Spin } from "antd";
import { LoadingIcon } from "./styles";
import { DatePicker } from "antd";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Chart from "./chart";
import Chart2 from "./chart2";
const FilterSection = (props) => {
    return (
        <Menu
            mode="horizontal"
            selectedKeys={props.selectedKey}
            onClick={props.handleClick}>
            <Menu.Item key="10Y">10 Y</Menu.Item>
            <Menu.Item key="1Y">1 Y</Menu.Item>
            <Menu.Item key="3M">3 M</Menu.Item>
            <Menu.Item key="1M">1 M</Menu.Item>
            <Menu.Item key="1W">1 W</Menu.Item>
            <Menu.Item key="1D">1 D</Menu.Item>
        </Menu>
    );
};

// export const getIntervalForHTticks = (selectedKey) = {

// }

const DateRangePicker = ({
    setSelectedKey,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
}) => {
    const startDatePicker = (date, dateString) => {
        // console.log(typeof dateString);
        setSelectedKey("range");
        setStartDate(dateString);
        // console.log(endDate);
        // if (dateString && dateString.length > 0 && endDate) {
        // }
    };

    const endDatePicker = (date, dateString) => {
        // console.log(dateString);
        setSelectedKey("range");
        setEndDate(dateString);
        // if (dateString && dateString.length > 0 && startDate) {
        // }
    };

    return (
        <FilterContainer>
            <DateHeading>Select a Date Range</DateHeading>
            <DatePickerDiv>
                <StyledDatePicker
                    onChange={startDatePicker}
                    placeholder="DD/MM/YYYY"
                    format="YYYY-MM-DD"
                />
                <DateHeading className="to">to</DateHeading>
                <StyledDatePicker
                    onChange={endDatePicker}
                    placeholder="DD/MM/YYYY"
                    format="YYYY-MM-DD"
                />
            </DatePickerDiv>
        </FilterContainer>
    );
};

const getHTicks = (data, selectedKey) => {
    let ticks = [];
    let interval;
    let unit;
    let startDate = momenttz
        .tz(`${data[0].split(",")[0]}`, "America/New_York")
        .format("YYYY-MM-DD");
    let endDate = momenttz
        .tz(`${data[data.length - 1].split(",")[0]}`, "America/New_York")
        .format("YYYY-MM-DD");
    let limit = moment(endDate).diff(startDate, "days");
    let diff = moment(endDate).diff(startDate, "days");
    if (selectedKey === "1D" || (selectedKey === "range" && diff === 0)) {
        interval = 1;
        unit = "hour";
        limit = 7;
    } else if (selectedKey === "1W" || (selectedKey === "range" && diff <= 7)) {
        interval = 7;
        unit = "hour";
    } else if (
        selectedKey === "1M" ||
        (selectedKey === "range" && diff <= 31)
    ) {
        interval = 4;
        unit = "day";
    } else if (
        selectedKey === "3M" ||
        (selectedKey === "range" && diff <= 92)
    ) {
        interval = 10;
        unit = "day";
    } else if (selectedKey === "1Y") {
        interval = 1;
        limit = 12;
        unit = "month";
    } else if (selectedKey === "range" && diff > 92) {
        interval = 1;
        limit = moment(endDate).diff(startDate, "months");
        unit = "month";
    }

    // console.log(selectedKey);
    // console.log(diff);
    if (selectedKey === "1D" || (selectedKey === "range" && diff === 0)) {
        for (let i = 0; i < limit; i += interval) {
            ticks.push(
                new Date(
                    momenttz
                        .tz(`${data[0].split(",")[0]}`, "America/New_York")
                        .format("YYYY-MM-DD")
                )
            );
        }
    } else {
        for (let i = 0; i <= limit; i += interval) {
            ticks.push(new Date(moment(startDate).add(i, unit)));
        }
    }

    if (
        moment(ticks[ticks.length - 1]).format("YYYY-MM-DD") !==
            moment(endDate).format("YYYY-MM-DD") &&
        !(selectedKey === "1D" || (selectedKey === "range" && diff <= 1))
    ) {
        console.log("here");
        ticks.push(
            new Date(
                momenttz
                    .tz(`${data[data.length - 1]}`, "America/New_York")
                    .format("YYYY-MM-DD")
            )
        );
    }
    console.log(ticks);
    return ticks;
};

const getVTicks = (min, max, baseline) => {
    let vTicks = [];
    let i;
    let diff = max - min;
    // console.log(diff);
    if (diff <= 5) {
        for (i = baseline; i <= max; i += 1) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else if (diff <= 10) {
        for (i = baseline; i <= max; i += 2) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else if (diff <= 20) {
        for (i = baseline; i <= max; i += 5) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else if (diff <= 60) {
        for (i = baseline; i <= max; i += 10) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else if (diff <= 120) {
        for (i = baseline; i <= max; i += 20) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else if (diff <= 250) {
        for (i = baseline; i <= max; i += 50) {
            vTicks.push(i);
        }
        vTicks.push(i);
    } else {
        for (i = baseline; i <= max; i += 100) {
            vTicks.push(i);
        }
        vTicks.push(i);
    }

    // console.log(vTicks);
    return vTicks;
};

const getVAxisBaseline = (data, min, max) => {
    let diff = max - min;
    let x = Math.floor(min / 10.0) * 10;
    if (diff <= 2) {
        return parseInt(min - 1);
    } else if (diff <= 5) {
        return parseInt(min - 1);
    } else if (diff <= 10) {
        x = x - 5;
        if (x <= 0) {
            return Math.floor(min / 10.0) * 10;
        } else {
            return x;
        }
    } else {
        x = x - 10;
        if (x <= 0) {
            return Math.floor(min / 10.0) * 10;
        } else {
            return x;
        }
    }
};
const parseChartData2 = (data, selectedKey, diffDays, diffMonths) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let interval;
    if (selectedKey === "1D") {
        interval = 1;
    } else if (
        selectedKey === "1W" ||
        (selectedKey === "range" && diffDays <= 5)
    ) {
        interval = 7;
    } else if (
        selectedKey === "1M" ||
        (selectedKey === "range" && diffDays <= 31)
    ) {
        interval = 2;
    } else if (
        selectedKey === "3M" ||
        (selectedKey === "range" && diffMonths <= 3)
    ) {
        interval = 7;
    } else if (
        selectedKey === "1Y" ||
        (selectedKey === "range" && diffMonths <= 12)
    ) {
        interval = 45;
    } else if (
        selectedKey === "10Y" ||
        (selectedKey === "range" && diffMonths > 12)
    ) {
        interval = 365;
    }

    let parsed1 = data.split("|");
    let parsed2 = [];
    let date;
    parsed1.forEach((item, index) => {
        let temp = item.split(",");
        let stockValue = parseFloat(temp[4]);
        if (stockValue < min) min = stockValue;
        if (stockValue > max) max = stockValue;
    });
    let vAxisBaseline = getVAxisBaseline(parsed1, min, max);
    parsed1.forEach((item, index) => {
        let temp = item.split(",");
        let stockValue = parseFloat(temp[4]);
        if (
            selectedKey === "1D" ||
            selectedKey === "1W" ||
            (selectedKey === "range" && diffDays <= 5)
        ) {
            date = new Date(
                momenttz
                    .tz(`${temp[0]}`, "America/New_York")
                    .format("YYYY-MM-DDTHH:mm:ss")
            );
        } else {
            date = new Date(moment(`${temp[0]}`).format("YYYY-MM-DDTHH:mm:ss"));
        }
        if (stockValue < min) min = stockValue;
        if (stockValue > max) max = stockValue;
        if (index % interval === 0)
            parsed2.push([
                `${date}`,
                stockValue,
                getTooltip(date, stockValue, selectedKey, diffMonths),
                vAxisBaseline,
                "",
            ]);
        else
            parsed2.push([
                `${date}`,
                stockValue,
                getTooltip(date, stockValue, selectedKey, diffMonths),
                null,
                null,
            ]);
    });
    if (!parsed2[parsed2.length - 1][3]) {
        parsed2[parsed2.length - 1][3] = vAxisBaseline;
        parsed2[parsed2.length - 1][4] = "";
    }

    let vTicks = getVTicks(min, max, vAxisBaseline);
    console.log(parsed1);
    return [parsed2, vTicks, vAxisBaseline];
};

const parseChartData = (data, selectedKey, start, end) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let parsed1 = data.split("|");
    let parsed2 = [];
    let hTicks = getHTicks(parsed1, selectedKey);
    let diff = moment(end).diff(start, "months");
    parsed1.forEach((item, index) => {
        let temp = item.split(",");
        let stockValue = parseFloat(temp[4]);
        let date = new Date(
            momenttz
                .tz(`${temp[0]}`, "America/New_York")
                .format("YYYY-MM-DDTHH:mm:ss")
        );
        if (stockValue < min) min = stockValue;
        if (stockValue > max) max = stockValue;
        parsed2.push([
            date,
            null,
            "",
            stockValue,
            getTooltip(date, stockValue, selectedKey, diff),
        ]);
    });
    let vAxisBaseline = getVAxisBaseline(parsed2, min, max);
    let vTicks = getVTicks(min, max, vAxisBaseline);

    hTicks.forEach((item) => {
        parsed2.push([new Date(moment(item)), vAxisBaseline, "", null, null]);
    });

    parsed2.sort(function (a, b) {
        return moment(a[0]).diff(moment(b[0]));
    });
    console.log(hTicks);
    return [parsed2, min, max, hTicks, vAxisBaseline, vTicks];
};

const getTooltip = (date, stockValue, selectedKey, diff) => {
    let tooltip;
    if (
        selectedKey == "1W" ||
        selectedKey == "1D" ||
        (selectedKey === "range" && diff < 1)
    ) {
        tooltip = `
         <div style="width:100px;">
         <center>${moment(date).format("DD-MMM, HH:mm")}</center>
         <center style="font-size:14px;font-weight:600">$${stockValue}</center>
         </div>
         `;
    } else if (
        selectedKey == "10Y" ||
        (selectedKey === "range" && diff > 365)
    ) {
        tooltip = `
         <div style="width:100px;">
         <center>${moment(date).format("DD-MMM-YYYY")}</center>
         <center style="font-size:14px;font-weight:600">$${stockValue.toFixed(
             2
         )}</center>
         </div>
         `;
    } else {
        tooltip = `
         <div style="width:100px;">
         <center>${moment(date).format("DD-MMM")}</center>
         <center style="font-size:14px;font-weight:600">$${stockValue}</center>
         </div>
         `;
    }

    return tooltip;
};

const CustomChart = (props) => {
    const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
    const [selectedKey, setSelectedKey] = useState("1M");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [chartData, setChartData] = useState();
    const [loader, setLoader] = useState(true);
    let symbol = props.symbol;
    useEffect(() => {
        let end;
        let start;
        let compression;
        let diffDays;
        let diffMonths;
        if (!selectedKey) {
            return;
        }
        if (selectedKey === "1D") {
            setLoader(true);
            console.log("One Day");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(1, "days").format("YYYY-MM-DD");
            compression = 8;
        }
        if (selectedKey === "1W") {
            setLoader(true);

            console.log("One Week");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(7, "days").format("YYYY-MM-DD");
            compression = 9;
        }
        if (selectedKey === "1M") {
            setLoader(true);
            console.log("One Month");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(1, "months").format("YYYY-MM-DD");
        }
        if (selectedKey === "3M") {
            setLoader(true);
            console.log("Three Month");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(3, "months").format("YYYY-MM-DD");
        }
        if (selectedKey === "1Y") {
            setLoader(true);
            console.log("One Year");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(1, "year").format("YYYY-MM-DD");
        }
        if (selectedKey === "10Y") {
            setLoader(true);
            console.log("10Y");
            end = moment(new Date()).format("YYYY-MM-DD");
            start = moment(end).subtract(10, "year").format("YYYY-MM-DD");
        }
        if (selectedKey === "range") {
            if (!startDate || !endDate) {
                return;
            }
            if (moment(endDate).diff(startDate, "days") < 0) {
                return;
            }
            setLoader(true);
            end = moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            start = moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            diffDays = moment(end).diff(start, "days");
            diffMonths = moment(end).diff(start, "months");
            if (diffDays === 1) compression = 8;
            else if (diffDays < 5) compression = 9;
            else compression = 0;
        }
        console.log(start + " " + end);
        connectWithApi()
            .getChartData(symbol, start, end, compression)
            .then((res) => {
                if (selectedKey === "range") {
                    setSelectedKey();
                } else {
                    setStartDate(null);
                    setEndDate(null);
                }
                let [parsed2, vTicks, vAxisBaseline] = parseChartData2(
                    res.data.data,
                    selectedKey,
                    diffDays,
                    diffMonths
                );
                setLoader(false);
                setChartData({
                    selectedKey,
                    diffDays,
                    diffMonths,
                    parsed2,
                    vTicks,
                    vAxisBaseline,
                });
            })
            .catch((error) => {
                if (selectedKey === "range") {
                    setSelectedKey();
                }
                setLoader(false);

                // setSelectedKey();

                // Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
    }, [selectedKey, startDate, endDate]);

    const handleMenu = (e) => {
        setSelectedKey(e.key);
    };
    const startDatePicker = (date, dateString) => {
        // console.log(typeof dateString);
        setSelectedKey("range");
        // console.log(dateString);

        setStartDate(dateString);
        // console.log(endDate);
        // if (dateString && dateString.length > 0 && endDate) {
        // }
    };

    const endDatePicker = (date, dateString) => {
        // console.log(dateString);
        setSelectedKey("range");
        // console.log(dateString);
        setEndDate(dateString);
        // if (dateString && dateString.length > 0 && startDate) {
        // }
    };

    return (
        <Fragment>
            <StyledRow>
                <Col span={11}>
                    <FilterSection
                        selectedKey={selectedKey}
                        handleClick={handleMenu}
                    />
                </Col>
                <Col span={11} offset={2}>
                    {/* <DateRangePicker
                        setSelectedKey={setSelectedKey}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    /> */}
                    <FilterContainer>
                        <DateHeading>Select a Date Range</DateHeading>
                        <DatePickerDiv>
                            <StyledDatePicker
                                onChange={startDatePicker}
                                placeholder="DD/MM/YYYY"
                                format="DD-MM-YYYY"
                                value={
                                    startDate
                                        ? moment(startDate, "DD-MM-YYYY")
                                        : ""
                                }
                            />
                            <DateHeading className="to">to</DateHeading>
                            <StyledDatePicker
                                onChange={endDatePicker}
                                placeholder="DD/MM/YYYY"
                                format="DD-MM-YYYY"
                                value={
                                    endDate ? moment(endDate, "DD-MM-YYYY") : ""
                                }
                            />
                        </DatePickerDiv>
                    </FilterContainer>
                </Col>
            </StyledRow>

            <StyledRow justify="center">
                <Col>
                    <Spin
                        size="large"
                        indicator={<LoadingIcon />}
                        spinning={loader}
                    />
                </Col>
            </StyledRow>
            {chartData && (
                <StyledRow>
                    <Col span={24}>
                        {/* <Chart data={chartData} /> */}
                        <Chart2 data={chartData} />
                    </Col>
                </StyledRow>
            )}
            <p>All times shown in US Eastern Standard Time (EST)</p>
        </Fragment>
    );
};

export default CustomChart;
