import React, { useState, useEffect } from "react";
import { defaultValues } from "../../constants/defaultValues";
import { Row, Col, List, Form, Spin } from "antd";
import { PageHeading } from "../../sharedComponents/Heading/index";
import Divider from "../../sharedComponents/Divider/index";
import { Select, Option } from "../../sharedComponents/Select";
import { Button } from "../../sharedComponents/button";
import { Input } from "../../sharedComponents/Input";
import { routes } from "../../constants/routes";
import { useHistory } from "react-router-dom";

import LrsLogisticDetails from "./LrsLogisticDetails";
import OutsideLrs from "./OutsideLrs";
import ConfirmTransfer from "./ConfirmTransfer";
import Instructions from './Instructions/index';
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import { LoadingOutlined } from '@ant-design/icons';

import "antd/dist/antd.css";
import * as S from "./styles";


export default function AddMoney() {

    const { connectWithApi } = useInsideAuthApi();
  

    const [selectedBank, setSelectedBank] = useState();
    const [remittanceSource, setRemittanceSource] = useState();
    const [pickupCourier, setPickupCourier] = useState();
    const [beneficiary, setBeneficiary] = useState('');
    const [otherBank, setOtherBank] = useState(false);
    const [lrs, setLrs] = useState();

    const[pageLoading, setPageLoading] = useState(true);
    const [cancelTransfer, setCancelTransfer] = useState(true);
    const[payloadDetails, setPayloadDetails] = useState();
    const [showInstructions, setShowInstructions] = useState(false);
    const [disableButton, setButtonDisable] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmTransfer, setConfirmTransfer] = useState(false);
    const [bankDetails, setBankDetails] = useState([]);
    const [userAccounts, setUserAccounts] = useState([]);
    const[status, setStatus] = useState(true);
    const [transferDetails, setTransferDetails] = useState();
    const[confirm_id, setId] = useState();
    const[confirmAmount, setConfirmAmount] = useState();
    const[confirmBankName, setConfirmBankName] = useState();
    const[new_id, setNewId] = useState();
    const handleSelectAccount = (value) => {
    
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const handleSelectRemittanceSource = (value) => {
        setRemittanceSource(value);
        setButtonDisable(false);
        if (value === "Bank In India") {
            connectWithApi()
                .getRemittanceBankDetails()
                .then((res) => {
                    console.log("plan response->", res);
                    setBankDetails(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleSelectLrs = (value) => {
        setLrs(value);
    };

    const handleSelectBank = (value) => {
        setSelectedBank(value);
    };

    const closeOutsideLrs = () => {
        setModalVisible(false);
    };
    const handleCancel=(id)=>{
        let payload ={};
        payload.status = 'Cancelled';
        connectWithApi(id)
            .cancelTransfer(id, payload)
            .then((res)=> {
                console.log('cancelled')
            })
            .catch((error)=>{
                console.log('error in cancel')
            })

        setCancelTransfer(true);
    };
    const openConfirm = (id)=>{
        setId(id);
        setConfirmTransfer(true);
    };
    const closeConfirm = (id, confirmAmount, confirmBankName)=>{
        console.log('id', confirm_id);
        let payload = {};
        payload.status = 'Confirmed';
        payload.confirmation_amount = confirmAmount;
        payload.confirmation_bank_name = confirmBankName;
        console.log(payload);
        connectWithApi()
            .confirmTransfer(confirm_id, payload)
            .then((res)=> {
                console.log('Confirmed!')
                setConfirmTransfer(false);
                setShowInstructions(false);
            })
            .catch((error)=>{
                console.log('error in confirm')
            })
        
    };
    const onFinish = (values) => {
        if (lrs === "No") {
            setModalVisible(true);
        }
        else{
        setStatus(true);
        setCancelTransfer(false);
        let info = {};
        let bank = bankDetails.find((currentBank) => {
            return currentBank.name === values.remittanceBank;
        });
        values.remittanceBank = bank ? bank : "Other";
        let account = userAccounts.find((currentAccount) => {
            return currentAccount.dw_account_number === values.account;
        });
        values.account = account;
        console.log(values);

        let payload = {};

        payload.amount = values.remittanceAmount;
        payload.account_info = values.account.id;
        
        info.amount= values.remittanceAmount;
        info.account_info = values.account;
        info.bank = (values.remittanceBank==='Other' || values.remittanceSource==='Bank Overseas'?values.remittanceBankName: values.remittanceBank);
        setPayloadDetails(info);
        setShowInstructions(true);
        if (lrs === "No") {
            setModalVisible(true);
        } else {
            if (
                values.remittanceFrom === "Bank In India" &&
                values.remittanceBank.pickup_info?.pickup_type === "Courier"
            ) {
                
                setPickupCourier('Courier');
                setBeneficiary(values.remittanceBank.additional_beneficiary?'yes':'no');
                setCancelTransfer(false)
               
            }
            if (
                values.remittanceFrom === "Bank In India" &&
                values.remittanceBank !== "Other"
            ) {
              
                setBeneficiary(values.remittanceBank.additional_beneficiary?'yes':'no');
                setPickupCourier(values.remittanceBank.pickup_info? values.remittanceBank.pickup_info:'')
                payload.bank = values.remittanceBank.id;
                connectWithApi()
                    .addMoney(payload)
                    .then((res) => {
                        console.log("plan response->", res);
                     
                        setCancelTransfer(false);
                        setShowInstructions(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (
                values.remittanceFrom === "Bank In India" &&
                values.remittanceBank === "Other"
            ) {
                setOtherBank(true);
                payload.other_bank_name = values.remittanceBankName;
                payload.is_overseas_bank = false;
                connectWithApi()
                    .addMoney(payload)
                    .then((res) => {
                        console.log("plan response->", res);

                        setCancelTransfer(false);
                        setShowInstructions(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (remittanceSource === "Bank Overseas") {
                payload.other_bank_name = values.remittanceBankName;
                payload.is_overseas_bank = true;

                connectWithApi()
                    .addMoney(payload)
                    .then((res) => {
                        console.log("plan response->", res);
                       
                        setCancelTransfer(false);
                        setShowInstructions(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        setConfirmAmount(info.amount);
        setConfirmBankName(values.remittanceBank==='Other' || values.remittanceSource==='Bank Overseas'?values.remittanceBankName: values.remittanceBank.name);
        connectWithApi()
        .pendingTransfer()
        .then((res)=>{
            setPageLoading(false);
            let payload = {};
            setShowInstructions(res.data[0].status==='Pending'?true:false);
            if(res.data[0].status==='Pending'){
                setNewId(res.data[0].id)
                setConfirmAmount(res.data[0].amount);
                setCancelTransfer(false);
                
                payload.account_info = res.data[0].account_info ;
                payload.amount = res.data[0].amount;
                if(res.data[0].is_overseas_bank){
                    setRemittanceSource('Bank Overseas')
                    payload.bank = res.data[0].other_bank_name;
                   
                }
                else if(!res.data[0].is_overseas_bank && res.data[0].other_bank_name){
                    setRemittanceSource('Bank in India')
                    setOtherBank(true);
                    payload.bank = res.data[0].other_bank_name;
                   
                }
                else{
                    setBeneficiary(res.data[0].bank.additional_beneficiary_details?'yes':'no');
                    setPickupCourier(res.data[0].bank.pickup_info.pickup_type?res.data[0].bank.pickup_info.pickup_type:'' );
                    payload.bank = res.data[0].bank.name;
                   
                }
              
                setTransferDetails(payload);
              
            }
            
            
        })
        .catch((error)=> {
            console.log('error calling pending api')
            setPageLoading(false);
        })
    }
    };

    const 
    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const renderRemittanceBankOptions = () => {
        let options = [];
        bankDetails.map((value, index) => {
            options.push(<Option key={value.name}>{value.name}</Option>);
        });
        options.push(<Option key="Other">Other Bank</Option>);

        return options;
    };
    const renderUserAccountOptions = () => {
        let options = [];
        userAccounts.map((value, index) => {
            options.push(
                <Option key={value.dw_account_number}>
                    {value.nick_name} / {value.dw_account_number}
                </Option>
            );
        });
        return options;
    };

    const handleNext = () => {
        setShowInstructions(true);
        setPickupCourier();
    }
    const handleBack = () => {
        setPickupCourier();
    }

    useEffect(() => {
        connectWithApi()
        .pendingTransfer()
        .then((res)=>{
            setPageLoading(false);
            let payload = {};
            setShowInstructions(res.data[0].status==='Pending'?true:false);
            if(res.data[0].status==='Pending'){
                setNewId(res.data[0].id)
                setConfirmAmount(res.data[0].amount);
                setStatus(false);
                setCancelTransfer(false);
                
                payload.account_info = res.data[0].account_info ;
                payload.amount = res.data[0].amount;
                if(res.data[0].is_overseas_bank){
                    setRemittanceSource('Bank Overseas')
                    payload.bank = res.data[0].other_bank_name;
                    setConfirmBankName(payload.bank);
                }
                else if(!res.data[0].is_overseas_bank && res.data[0].other_bank_name){
                    setRemittanceSource('Bank in India')
                    setOtherBank(true);
                    payload.bank = res.data[0].other_bank_name;
                    setConfirmBankName(payload.bank);
                }
                else{
                    setBeneficiary(res.data[0].bank.additional_beneficiary_details?'yes':'no');
                    setPickupCourier(res.data[0].bank.pickup_info.pickup_type?res.data[0].bank.pickup_info.pickup_type:'' );
                    payload.bank = res.data[0].bank.name;
                    setConfirmBankName(payload.bank);
                }
                
                setTransferDetails(payload);
            }
            
            
        })
        .catch((error)=> {
            console.log('error calling pending api')
            setPageLoading(false);
        })
        connectWithApi()
            .getUserAccounts()
            .then((res) => {
                console.log("plan response->", res);
                setUserAccounts(res.data);
            })
            .catch((error) => {
                // Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
                console.log(error);
            });
        
    }, []);
    return (
        <React.Fragment>
            {pageLoading? <Row justify='center'><Spin indicator={antIcon}/></Row>:
            showInstructions && (!cancelTransfer)? 
            <Instructions
                   handleCancel={handleCancel}
                   handleConfirm = {openConfirm}
                   payloadDetails={payloadDetails}
                   remittanceSource={remittanceSource}
                   pickupType ={pickupCourier}
                    beneficiary={beneficiary}
                    otherBank={otherBank}
                    status={status}
                    transferDetails={transferDetails}
                   id={new_id}
            />: pickupCourier==='Courier' && (!cancelTransfer)?
            <LrsLogisticDetails
                handleNext={handleNext}
                handleBack = {handleBack}
                res={payloadDetails}
            />:
                <div className="landingPage">
                    <Row justify="center" gutter={[0, 25]}>
                        <Col lg={{ span: 14 }}>
                            <PageHeading>Add Money</PageHeading>
                            <Divider />
                        </Col>
                    </Row>
                    <Form
                        name="addMoney"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Row justify="center" gutter={[0, 0]}>
                            <Col span={6}>
                                <S.Labels>Select your Account</S.Labels>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    name="account"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select an account!",
                                        },
                                    ]}>
                                    <Select
                                        placeholder="Select"
                                        onChange={handleSelectAccount}>
                                        {renderUserAccountOptions()}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={[0, 0]}>
                            <Col span={6}>
                                <S.Labels>Remittance Amount</S.Labels>
                            </Col>
                            <Col span={7}>
                                <Form.Item name="remittanceAmount">
                                    <Input placeholder="Enter the amount" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={[0, 0]}>
                            <Col span={6}>
                                <S.Labels>Remittance From</S.Labels>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    name="remittanceFrom"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select remittance source!",
                                        },
                                    ]}>
                                    <Select
                                        placeholder="Select"
                                        onChange={handleSelectRemittanceSource}>
                                        <Option value="Bank In India">
                                            Bank In India
                                        </Option>
                                        <Option value="Bank Overseas">
                                            Bank Overseas
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {remittanceSource === "Bank In India" ? (
                            <div>
                                <Row justify="center" gutter={[0, 0]}>
                                    <Col span={6}>
                                        <S.Labels>LRS Remittance</S.Labels>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            name="lrsRemittance"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Select Lrs Remittance!",
                                                },
                                            ]}>
                                            <Select
                                                placeholder={"Select"}
                                                onChange={handleSelectLrs}>
                                                <Option value="Yes">Yes</Option>
                                                <Option value="No">No</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {lrs==='Yes'?
                                <Row justify="center" gutter={[0, 0]}>
                                    <Col span={6}>
                                        <S.Labels>Remittance Bank</S.Labels>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            name="remittanceBank"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please select your Bank!",
                                                },
                                            ]}>
                                            <Select
                                                placeholder={"Select"}
                                                onChange={handleSelectBank}>
                                                {renderRemittanceBankOptions()}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                :''}
                            </div>
                        ) : (
                            ""
                        )}

                        {pickupCourier==='Courier' &&
                        remittanceSource !== "Bank Overseas" ? (
                            <div>
                                <Row justify="center" gutter={[0, 0]}>
                                    <Col span={6}>
                                        <S.Labels>
                                            LRS form pickup by Globalise?
                                        </S.Labels>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            name="lrsFormPickup"
                                            rules={[
                                                { required: true, message: "" },
                                            ]}>
                                            <Select
                                                placeholder={"Select"}
                                                onChange={handleSelectBank}>
                                                <Option value="Yes">Yes</Option>
                                                <Option value="No">No</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            ""
                        )}
                        {selectedBank === "Other" ||
                        remittanceSource === "Bank Overseas" ? (
                            <div>
                                <Row justify="center" gutter={[0, 0]}>
                                    <Col span={6}>
                                        <S.Labels>
                                            Remittance Bank Name
                                        </S.Labels>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            name="remittanceBankName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your bank name!",
                                                },
                                            ]}>
                                            <Input
                                                placeholder={
                                                    "Enter the bank name"
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            ""
                        )}

                        <S.ButtonRow justify="center">
                            <Col span={6}>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        disabled={disableButton}
                                        size={"lg"}>
                                        Next
                                    </Button>
                                </Form.Item>
                            </Col>
                        </S.ButtonRow>

                    </Form>
                </div>
            }

            <OutsideLrs
                visible={modalVisible}
                closeOutsideLrs={closeOutsideLrs}
            />
            <ConfirmTransfer
                visible={confirmTransfer}
                closeConfirm = {closeConfirm}
                id ={confirm_id}
                confirmAmount={confirmAmount}
                confirmBankName={confirmBankName}
                cancel={()=>setConfirmTransfer(false)}
            />
        </React.Fragment>
    );
}
