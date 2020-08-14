import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { Title, Value, HighValue, LowValue } from "./styles";
import { SubHeading } from "../Heading/index";
const Chart = (props) => {
    // console.log(props.data.vAxisBaseline);
    // console.log(props.data.vTicks);
    const getCurrentValue = () => {
        // console.log(props.data.parsedData);
        var length = props.data.parsedData.length;
        if (props.data.parsedData[length - 1][3]) {
            return props.data.parsedData[length - 1][3];
        } else if (props.data.parsedData[length - 2][3]) {
            return props.data.parsedData[length - 2][3];
        } else {
            return props.data.parsedData[length - 3][3];
        }
    };

    const getPastData = () => {
        let data;
        let current = getCurrentValue();
        let start;
        if (props.data.parsedData[0][3]) {
            start = props.data.parsedData[0][3];
        } else {
            start = props.data.parsedData[1][3];
        }
        // console.log(start + " " + current);
        let percent;
        let diff = (current - start).toFixed(2);
        // console.log(diff);
        percent = ((Math.abs(diff) / start) * 100).toFixed(2);
        if (diff < 0) {
            data = `-$${Math.abs(diff)} (- ${percent} %)`;
            return <LowValue>{data}</LowValue>;
        } else {
            data = `+$${Math.abs(diff)} (+ ${percent} %)`;
            return <HighValue>{data}</HighValue>;
        }
    };

    // const getTicks = () => {
    //     var ticks;
    //     if (range == 1) {
    //         ticks = [new Date(2020, 3, 1), new Date(2020, 3, 7)];
    //         return ticks;
    //     } else {
    //         ticks = [new Date(2020, 2, 31), new Date(2020, 3, 13)];
    //         return ticks;
    //     }
    // };
    const google = window.google;
    google.charts.load("current", { packages: ["corechart", "line"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        // var data = getData();
        // var ticks = getTicks();
        // var baseline = getHAxisBaseline();
        var data2 = new google.visualization.DataTable();
        data2.addColumn("datetime", "Date");
        data2.addColumn("number", "ticks");
        data2.addColumn({ role: "annotation", type: "string" });
        data2.addColumn("number", "Stocks");
        data2.addColumn({ type: "string", role: "tooltip", p: { html: true } });

        data2.addRows(props.data.parsedData);
        // console.log(props.data.parsedData);

        var data2Options = {
            crosshair: { orientation: "vertical", trigger: "both" },
            interpolateNulls: true,
            annotations: { style: "line", textStyle: { fontSize: 10 } },
            lineWidth: 4,
            chartArea: { width: "80%" },
            curveType: "function",
            legend: { position: "none" },
            tooltip: { isHtml: true },
            hAxis: {
                textStyle: {
                    color: "#707070",
                    fontSize: 13,
                },
                // slantedText: true,
                // slantedTextAngle: 90,
                baseline: props.data.hTicks[0], // new Date("2020-07-16"), //,
                ticks: props.data.hTicks,
                format:
                    props.data.selectedKey === "1D" ||
                    (props.data.selectedKey === "range" &&
                        props.data.diffDays <= 1)
                        ? "dd-MMM, HH:mm"
                        : "dd-MMM",
                gridlines: {
                    color: "transparent",
                    minspacing: 50,
                    // count: 0,
                    // multiple: 1000,
                    // interval: [5],
                },
                minorGridlines: {
                    count: 0,
                },
            },
            vAxis: {
                baseline: props.data.vAxisBaseline,
                ticks: props.data.vTicks,
                format: "currency",
                textStyle: {
                    color: "#707070",
                    fontSize: 13,
                },
                gridlines: {
                    color: "transparent",
                },
            },
            // series: {
            //     1: { curveType: "function" },
            // },
            series: {
                0: {
                    enableInteractivity: false,
                    visibleInLegend: false,
                },
            },
            colors: ["transparent", "#1997fc"],
            // pointSize: 5,
        };

        var chart2 = new google.visualization.LineChart(
            document.getElementById("chart")
        ); //GOOGLE CHART div id
        chart2.draw(data2, data2Options);
    }
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
                        {props.data.selectedKey === "3M" ? "1 Month" : ""}
                        {props.data.selectedKey === "range"
                            ? props.data.diffDays <= 1
                                ? props.data.diffDays + " day"
                                : props.data.diffDays + " days"
                            : ""}
                    </Title>
                    {getPastData()}
                    {/* {getPastData() > 0 ? (
                        <HighValue>{getPastData()}</HighValue>
                    ) : (
                        <LowValue>{getPastData()}</LowValue>
                    )} */}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div
                        id="chart"
                        style={{ width: "100%", height: "350px" }}></div>
                </Col>
            </Row>
        </>
    );
};

export default Chart;
