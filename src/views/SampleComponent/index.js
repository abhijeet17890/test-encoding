import React, { useState } from "react";
// import { Chart } from "react-google-charts";
// import Chartkick, { LineChart, PieChart } from 'react-chartkick'
import {
    Row,
    Col,
    Radio,
    Switch,
    Space,
    Button as AntdBtn,
    Form,
    Tabs,
} from "antd";
// import { Divider } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Checkbox } from "../../sharedComponents/Checkbox";
import { RadioButton } from "../../sharedComponents/RadioButton";
import { SwitchButton } from "../../sharedComponents/SwitchButton";
import { Modal } from "../../sharedComponents/Modal";
import { Button } from "../../sharedComponents/button";
import Divider from "../../sharedComponents/Divider";
import { Select, Option } from "../../sharedComponents/Select/index";
import { Input, NumberInput } from "../../sharedComponents/Input/index";
import { PageHeading, SubHeading } from "../../sharedComponents/Heading/index";
import { CustomDiv } from "./style";
// import Form from "antd/lib/form/Form";
// import CanvasJSReact from "../../canvasjs.react";
// //var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { TabPane } = Tabs;

const SampleComponent = () => {
    function callback(key) {
        setRange(key);
    }
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(3);
    const [switchValue, setSwitchValue] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [range, setRange] = useState(1);

    const handleModalOk = () => {
        setModalVisible(false);
    };
    const handleModalCancel = () => {
        setModalVisible(false);
    };

    return (
        <CustomDiv>
            <Row>
                <Col span={6} style={{ marginBottom: "50px" }}>
                    <Select
                        placeholder="Select"
                        dropdownStyle={{ overflow: "hidden" }}
                        listHeight={300}>
                        {/* <Option key="1">
                            {" "}
                            This is a very long option which dosent fit in one
                            row
                        </Option> */}
                        <Option key="2">
                            Windows <br /> ABC
                        </Option>
                        <Option key="3">
                            {" "}
                            Ubuntu <br /> ABC{" "}
                        </Option>
                        <Option key="4">
                            {" "}
                            Fedora <br /> ABC
                        </Option>
                        <Option key="74">
                            {" "}
                            Fedora <br /> ABC
                        </Option>
                        <Option key="5"> Kali </Option>
                        <Option key="6"> Debian </Option>
                        <Option key="7"> Mac </Option>
                        <Option key="8"> Mac 2</Option>
                        <Option key="9"> Mac 3</Option>
                        <Option key="10"> Mac 4</Option>
                        <Option key="11"> Mac 5</Option>
                        <Option key="12"> Mac 6</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input />
                    <NumberInput />
                </Col>
            </Row>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Row>
                <Col>
                    <PageHeading>This is a heading</PageHeading>
                </Col>
            </Row>
            <br />
            <br />
            {/*<Divider />*/}
            <Row>
                <Col>
                    <SubHeading>This is SubHeading</SubHeading>
                </Col>
            </Row>
            <Divider />
            <br />
            <br />
            {/*<Divider />*/}
            <Row justify="start">
                <Col span={12}>
                    <Row>
                        <Checkbox
                            checked={checked}
                            onChange={() => setChecked(!checked)}>
                            {" "}
                            {checked ? "" : "Not"} Checked{" "}
                        </Checkbox>
                    </Row>
                    <br />
                    <br />
                    {/*<Divider />*/}
                    <Row>
                        <Radio.Group
                            onChange={(e) => setRadioValue(e.target.value)}
                            value={radioValue}>
                            <RadioButton value={1}> Option 1 </RadioButton>
                            <RadioButton value={2}> Option 2 </RadioButton>
                            <RadioButton value={3}> Option 3 </RadioButton>
                            <RadioButton value={4}> Option 4 </RadioButton>
                        </Radio.Group>
                    </Row>
                    <br />
                    <br />
                    {/*<Divider />*/}
                    <Row>
                        <SwitchButton
                            defaultChecked
                            onChange={(checked) => setSwitchValue(checked)}
                        />{" "}
                        {/*defaultChecked*/}
                    </Row>
                    <br />
                    <br />
                    {/*<Divider />*/}
                    <Row>
                        <Col span={4}>
                            <Button shape="circle" icon={<EyeOutlined />} />
                        </Col>
                        <Col span={4}>
                            <Button
                                customcornertype="round-corner" // custom rounder corner
                                icon={<SearchOutlined />}
                            />
                        </Col>
                        <Col span={4}>
                            <Button
                                customcornertype="round-corner"
                                icon={<DeleteOutlined />}
                            />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    {/*<Divider />*/}
                    <Row>
                        <Button
                            size="md-2"
                            onClick={() => setModalVisible(true)}>
                            {" "}
                            Open modal{" "}
                        </Button>
                    </Row>
                </Col>
                <Col span={12}></Col>
            </Row>
            <Modal
                title="Basic Modal"
                visible={modalVisible}
                onOk={() => handleModalOk()}
                onCancel={() => handleModalCancel()}
                footer={[
                    <Button
                        key="back"
                        size="md-2"
                        outlined={true}
                        onClick={() => handleModalCancel()}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        size="md-2"
                        onClick={() => handleModalOk()}>
                        OK
                    </Button>,
                ]}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Divider />
            <br />
            <br />
            {/*<Divider />*/}

            <Row>
                <Col flex="322px">
                    <Input
                        placeholder="First Name"
                        suffix="M"
                        className="suffixInput"
                    />
                </Col>
                <Col flex="322px" style={{ padding: "0 12px" }}>
                    <Input placeholder="Last Name" />
                </Col>
            </Row>
            <Row>
                <Col flex="544px">
                    <Input placeholder="Advisor Code" />
                </Col>
                <Col flex="19px" style={{ padding: "0 12px" }}>
                    <Button size="sm-1">Confirm</Button>
                </Col>
            </Row>
            <Divider />

            <Row justify="space-between">
                <Col>
                    <p>size="lg"</p>
                    <Button size="lg">Text</Button>
                </Col>
                <Col offset={1}>
                    <p>size="md-1"</p>
                    <Button size="md-1">Text</Button>
                </Col>
                <Col offset={1}>
                    <p>size="md-2"</p>
                    <Button size="md-2">Text</Button>
                </Col>
                <Col offset={1}>
                    <p>size="sm-1"</p>
                    <Button size="sm-1">Text</Button>
                </Col>
                <Col offset={1}>
                    <p>size="sm-2"</p>
                    <Button size="sm-2">Text</Button>
                </Col>
            </Row>
            <br></br>
            <Row justify="space-between">
                <Col>
                    <p>size="lg"</p>
                    <Button size="lg">Text</Button>
                </Col>
                <Col offset={1}>
                    <p>
                        size="md-1" oulined={"{"}true{"}"}
                    </p>
                    <Button size="md-1" outlined={true}>
                        Text
                    </Button>
                </Col>
                <Col offset={1}>
                    <p>
                        size="md-2" oulined={"{"}true{"}"}
                    </p>
                    <Button size="md-2" outlined={true}>
                        Text
                    </Button>
                </Col>
                <Col offset={1}>
                    <p>
                        size="sm-1" oulined={"{"}true{"}"}
                    </p>
                    <Button size="sm-1" outlined={true}>
                        Text
                    </Button>
                </Col>
                <Col offset={1}>
                    <p>
                        size="sm-2" oulined={"{"}true{"}"}
                    </p>
                    <Button size="sm-2" outlined={true}>
                        Text
                    </Button>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <p>
                        size="lg" disabled={"{"}true{"}"}
                    </p>
                    <Button size="lg" disabled={true}>
                        Text
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>{/*<CanvasJSChart options={options} />*/}</Col>
            </Row>
            <br />
            <br />
            <Row>
                {/*<LineChart data={googleChartData} colors={["#000"]}  library={googleChartOptions} />*/}
            </Row>

            <Row>
                <SubHeading subheading="google charts" />
                <div
                    id="piechart_div"
                    style={{ width: "400px", height: "200px" }}></div>{" "}
                //GOOGLE CHART div
                <br />
                <br />
                <div
                    id="chart2_div"
                    style={{ width: "400px", height: "300px" }}></div>{" "}
                //GOOGLE CHART div
            </Row>
        </CustomDiv>
    );
};

export default SampleComponent;
