import React, {useState, useEffect}from 'react';
import OverseasBankInstructions from './OverseasBankInstructions';
import OtherBanks from './OtherBanks';
import CourierBeneficiary from './GlobaliseBank/CourierBeneficiary/CourierBeneficiary';
import CourierNoAdditionalBeneficiary from './GlobaliseBank/CourierNoAdditionalBeneficiary/CourierNoAdditionalBeneficiary';
import NoPickupAdditionalBeneficiary from './GlobaliseBank/NoPickupAdditionalBeneficiary/NoPickupAdditionalBeneficiary';
import NoPickupNoAdditionalBeneficiary from './GlobaliseBank/NoPickupNoAdditionalBeneficiary/NoPickupNoAdditionalBeneficiary';
import PickupAdditionalBeneficiary from './GlobaliseBank/PickupAdditionalBeneficiary/PickupAdditionalBeneficiary';
import PickupNoAdditionalBeneficiary from './GlobaliseBank/PickupNoAdditionalBeneficiary/PickupNoAdditionalBeneficiary';
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { Row, Col, List, Space, Spin } from 'antd';
import { PageHeading, SubHeading } from '../../../sharedComponents/Heading/index';
import Divider from '../../../sharedComponents/Divider/index';


import * as S from './styles';
import 'antd/dist/antd.css'; 

export default function Instructions(
    {
        handleCancel, 
        handleConfirm, 
        payloadDetails, 
        remittanceSource, 
        pickupType, 
        beneficiary,
        otherBank,
        transferDetails,
        status,
        id
    }){
    
    const { connectWithApi } = useInsideAuthApi();

    const [emailLoading,setEmailLoading]= useState(false);
   
    const[Loader, setLoader] = useState(true);

    useEffect(() => {
        console.log(status,payloadDetails, transferDetails);
        connectWithApi()
        .pendingTransfer()
        .then((res)=>{
           setLoader(false); 
           
                       
        })
        .catch((error)=> {
            console.log('error calling pending api')
            setLoader(false);
        })
    }, []);

    const sendEmail = () => {
        setEmailLoading(true);
        let payload = {};
        if(pickupType==='Courier' && beneficiary==='yes'){
            payload.pickup_type = 'Courier';
            payload.beneficiary = 'yes';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
            
        }
        else if(pickupType==='None' && beneficiary==='no'){
            payload.pickup_type = '';
            payload.beneficiary = 'no';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
        }
        else if(pickupType==='None' && beneficiary==='yes'){
            payload.pickup_type = '';
            payload.beneficiary = 'yes';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
        }
        else if(pickupType==='Bank' && beneficiary==='yes'){
            payload.pickup_type = 'Bank';
            payload.beneficiary = 'yes';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
        }
        else if(pickupType==='Bank' && beneficiary==='no'){
            payload.pickup_type = 'Bank';
            payload.beneficiary = 'no';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
        }
        else if(pickupType==='Courier' && beneficiary==='no'){
            payload.pickup_type = 'Courier';
            payload.beneficiary = 'no';
            payload.bank_type = (status?payloadDetails.bank:transferDetails.bank);
            console.log(payload.bank_type);
        }
        else if(otherBank){
            payload.pickup_type = '';
            payload.beneficiary = '';
            payload.bank_type = 'others';
        }
        else if(remittanceSource==='Bank Overseas'){
            payload.pickup_type = '';
            payload.beneficiary = '';
            payload.bank_type = 'overseas';
        }
        console.log(payload);
        connectWithApi()
            .emailInstructions(payload)
            .then((res)=>{
                console.log('email res', res);
                
                setEmailLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setEmailLoading(false);
            })
    }
    return(
        <React.Fragment>
            {Loader?<Spin/>:<div>
            <Row justify='center' gutter={[0,25]}>
                <Col lg={{span:18}} md={{span:18}} sm={{span:24}} xs={{span:24}}>
                    <PageHeading>Add Money from Bank {remittanceSource==='Bank Overseas'?'Overseas':'in India'}</PageHeading>
                    <Divider/>
                </Col>
            </Row>
            {remittanceSource==='Bank Overseas'?
            <Row justify='center' gutter={[0,15]}>
                <Col lg={{span:17}} md={{span:17}} sm={{span:24}} xs={{span:24}}>
                    <S.Content>You can now fund your investment account online from your non-Indian bank account.</S.Content>
                </Col>
            </Row>:''}
            <Row justify='center'gutter={[0,15]}>
                <Col lg={{span:17}} md={{span:17}} sm={{span:24}} xs={{span:24}}>
                    {status?<div className='newtransfer'>
                    <S.Content>
                        Account:{payloadDetails.account_info? 
                        payloadDetails.account_info.account_type.description 
                        + '/' + payloadDetails.account_info.dw_account_number:''}
                    </S.Content>
                    <S.Content>
                        Deposit Amount: {payloadDetails.amount? payloadDetails.amount:''}
                    </S.Content>
                    <S.Content>
                        Bank Name: {remittanceSource==='Bank Overseas' || otherBank?payloadDetails.bank: payloadDetails.bank.name}
                    </S.Content>
                    </div>
                    :
                    <div className='pending'>
                        <S.Content>
                        Account:{transferDetails.account_info? 
                        transferDetails.account_info.nick_name
                        + '/' + transferDetails.account_info.dw_account_number:''}
                    </S.Content>
                    <S.Content>
                        Deposit Amount: {transferDetails.amount? transferDetails.amount:''}
                    </S.Content>
                    <S.Content>
                        Bank Name: {transferDetails.bank? transferDetails.bank:''}
                    </S.Content>
                    </div>
    }
                </Col>
            </Row>

            {remittanceSource==='Bank Overseas'? (
                <OverseasBankInstructions payloadDetails={payloadDetails} transferDetails={transferDetails} status={status}/>
            ):
            otherBank?(
                <OtherBanks payloadDetails={payloadDetails} transferDetails={transferDetails} status={status}/>
            ):
            pickupType==='Courier' && beneficiary==='yes'?
                <CourierBeneficiary/>
            :
            pickupType==='Courier' && beneficiary==='no'?(
                <CourierNoAdditionalBeneficiary/>
            ):
            pickupType==='None' && beneficiary==='yes'?(
                <NoPickupAdditionalBeneficiary/>
            ) :
            pickupType==='None' && beneficiary==='no'?(
                <NoPickupNoAdditionalBeneficiary/>
            ):
            pickupType==='Bank' && beneficiary ==='yes'? (
                <PickupAdditionalBeneficiary/>
            ):
            pickupType==='Bank' && beneficiary ==='no'? (
                <PickupNoAdditionalBeneficiary payloadDetails={payloadDetails}/>
            ):
          
            
            ''
    }
            <S.ButtonRow justify='center'>
                <Col>
                    <Space direction='horizontal' size={150} >
                        <S.StyledButton 
                            size={'md-1'}
                            onClick={()=>handleCancel(id)}>
                            Cancel Transaction
                        </S.StyledButton>
                        <S.StyledButton size={'md-1'} onClick={()=>sendEmail()} loadin={emailLoading}>Email the Instructions</S.StyledButton>
                        <S.StyledButton 
                            size={'md-1'}
                            onClick={()=>handleConfirm(id)}
                        >
                            Confirm Transaction
                        </S.StyledButton>
                    </Space>
                </Col>
            </S.ButtonRow>
    </div>}
        </React.Fragment>
    );
};