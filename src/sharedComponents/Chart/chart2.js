import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { Title, Value, HighValue, LowValue, DividerCol } from "./styles";
import Divider from "../../sharedComponents/Divider/index";

const Chart2 = (props) => {
    // console.log(props.data.parsed2);
    const getCurrentValue = () => {
        var length = props.data.parsed2.length;
        if (props.data.parsed2[length - 1][1]) {
            return props.data.parsed2[length - 1][1];
        }
    };
    const getPastData = () => {
        let data;
        let current = getCurrentValue();
        let start;
        if (props.data.parsed2[0][1]) {
            start = props.data.parsed2[0][1];
        }
        // console.log(start + " " + current);
        let percent;
        let diff = (current - start).toFixed(2);
        // console.log(diff);
        percent = ((Math.abs(diff) / start) * 100).toFixed(2);
        if (diff < 0) {
            data = `-$${Math.abs(diff)} (-${percent} %)`;
            return <LowValue>{data}</LowValue>;
        } else {
            data = `+$${Math.abs(diff)} (+${percent} %)`;
            return <HighValue>{data}</HighValue>;
        }
    };
    const google = window.google;
    function drawChart() {
        var discreteData = new google.visualization.DataTable();
        discreteData.addColumn("string", "Number");
        discreteData.addColumn("number", "Value");
        discreteData.addColumn({
            type: "string",
            role: "tooltip",
            p: { html: true },
        });
        discreteData.addColumn("number", "Ticks");
        discreteData.addColumn({ role: "annotation", type: "string" });

        discreteData.addRows(props.data.parsed2);

        var view = new google.visualization.DataView(discreteData);
        view.setColumns([
            {
                type: "number",
                label: discreteData.getColumnLabel(0),
                calc: function (dt, row) {
                    return { v: row + 1, f: dt.getFormattedValue(row, 0) };
                },
            },
            1,
            2,
            3,
            4,
        ]);

        let interval;
        if (props.data.selectedKey === "1D") {
            interval = 1;
        } else if (
            props.data.selectedKey === "1W" ||
            (props.data.selectedKey === "range" && props.data.diffDays <= 5)
        ) {
            interval = 7;
        } else if (
            props.data.selectedKey === "1M" ||
            (props.data.selectedKey === "range" && props.data.diffDays <= 31)
        ) {
            interval = 2;
        } else if (
            props.data.selectedKey === "3M" ||
            (props.data.selectedKey === "range" && props.data.diffMonths <= 3)
        ) {
            interval = 7;
        } else if (
            props.data.selectedKey === "1Y" ||
            (props.data.selectedKey === "range" && props.data.diffMonths <= 12)
        ) {
            interval = 45;
        } else if (
            props.data.selectedKey === "10Y" ||
            (props.data.selectedKey === "range" && props.data.diffMonths > 12)
        ) {
            interval = 365;
        }
        var ticks = [];
        let format;
        if (
            props.data.selectedKey === "1D" ||
            (props.data.selectedKey === "range" && props.data.diffDays <= 5)
        ) {
            format = "DD-MMM, HH:mm";
        } else if (
            props.data.selectedKey === "1W" ||
            props.data.selectedKey === "1M" ||
            props.data.selectedKey === "3M" ||
            (props.data.selectedKey === "range" && props.data.diffMonths <= 12)
        ) {
            format = "DD-MMM";
        } else if (
            props.data.selectedKey === "1Y" ||
            props.data.selectedKey === "10Y"
        ) {
            format = "DD-MMM-YYYY";
        }

        for (var i = 0; i < view.getNumberOfRows(); i += interval) {
            ticks.push({
                v: view.getValue(i, 0),
                f: moment(view.getFormattedValue(i, 0)).format(format),
            });
        }
        if (
            moment(props.data.parsed2[props.data.parsed2.length - 1][0]).format(
                "DD-MMM"
            ) != ticks[ticks.length - 1].f
        ) {
            let x = view.getNumberOfRows() - 1;
            ticks.push({
                v: view.getValue(x, 0),
                f: moment(view.getFormattedValue(x, 0)).format(format),
            });
        }

        // console.log(ticks);

        var discreteChart = new google.visualization.LineChart(
            document.getElementById("discrete_chart_div")
        );
        discreteChart.draw(view, {
            lineWidth: 4,
            interpolateNulls: true,
            annotations: { style: "line", textStyle: { fontSize: 10 } },
            tooltip: { isHtml: true },
            chartArea: { width: "75%" },
            colors: ["#1997fc", "transparent"],
            curveType: "function",
            legend: { position: "none" },
            hAxis: {
                textStyle: {
                    // fontSize: 10,
                },
                // viewWindowMode: "maximized",
                allowContainerBoundaryTextCutoff: false,
                viewWindow: {
                    max: props.data.parsed2.length,
                },
                baseline: 1,
                ticks: ticks,
                gridlines: {
                    color: "transparent",
                },
            },
            vAxis: {
                baseline: props.data.vAxisBaseline,
                ticks: props.data.vTicks,
                format: "currency",
                gridlines: {
                    color: "transparent",
                },
            },
            series: {
                // 1: {
                //     enableInteractivity: false,
                //     visibleInLegend: false,
                // },
            },
        });
    }
    google.load("visualization", "1", {
        packages: ["corechart"],
        callback: drawChart,
    });
    return (
        <>
            <Row>
                <Col span={5}>
                    <Title>Current Value</Title>
                    <Value>${getCurrentValue()}</Value>
                </Col>

                <Col span={5}>
                    <Title>
                        Past {props.data.selectedKey === "1W" ? "1 Week" : ""}
                        {props.data.selectedKey === "1M" ? "1 Month" : ""}
                        {props.data.selectedKey === "1Y" ? "1 Year" : ""}
                        {props.data.selectedKey === "3M" ? "3 Months" : ""}
                        {props.data.selectedKey === "10Y" ? "10 Years" : ""}
                        {props.data.selectedKey === "range"
                            ? props.data.diffDays <= 1
                                ? props.data.diffDays + " day"
                                : props.data.diffDays + " days"
                            : ""}
                    </Title>
                    {getPastData()}
                </Col>
            </Row>
            <DividerCol span={24}>
                <Divider thickness="3px" />
            </DividerCol>
            <div
                id="discrete_chart_div"
                style={{ width: "100%", height: "400px" }}></div>
        </>
    );
};

export default Chart2;
