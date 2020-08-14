import React, { useState,useEffect } from "react";
import { Row, Col} from "antd";
import SelectAccount from "./SharedComponents/SelectAccount";
import InvestTitle from "./SharedComponents/InvestTitle";
import {Button} from '../../sharedComponents/button';
import {StyledDiv,StyledForm, StyledCenterDiv,MarketStatus,StyledDotedDivider,ModalText} from './style';
import { applyAmountCommaMask,capitaliseFirstChar } from '../../utils/dataManipulation';
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import {routes} from '../../constants/routes';
import {useHistory} from "react-router-dom";
import {defaultValues} from '../../constants/defaultValues';
import { Link } from 'react-router-dom';
import Notification from '../../sharedComponents/Notification';
import { Modal } from "../../sharedComponents/Modal";


function onChange(checked) {
  
}

const postData = (connectWithApi,details,setPage,setConfirmationData) => {
  let data = {};
  data.accountNo = details.Account_no;
  data.orderType = details.OrderType;
  data.instrument = {
          "id":details.id,
          "symbol": details.Symbol
        }
  if(!details.Qunt){
    data.amountCash = details.EstimatedValue;
  }else{
    data.quantity= details.NumberofUnits;
  }
  data.side = details.buy_sell.toUpperCase();
  if(details.OrderType !== 'MARKET'){
    data.price = details.OrderVal;
  }

  connectWithApi()
  .createOrder(data)
  .then((res) => {
    setConfirmationData(res);
      setPage(1)
   })
   .catch((error)=>{
    Notification({type:'error',content:error.message});
  })
}

const currentPrice = (connectWithApi,setDetails,details,Symbol,id,unit,setGetFee) => {
  connectWithApi()
  .calculateFeesApi(id,unit)
  .then((res) => {
    setGetFee(res.data.taxes_and_fee)
   })
   .catch((error)=>{
      Notification({type:'error',content:error.message})
  })

  connectWithApi()
 .getConsolidateQuote(Symbol)
 .then((res) => {
   if(details === 'Buy'){
    setDetails(res.data[0].ask)
   }else{
    setDetails(res.data[0].bid)
   }
  })
  .catch((error)=>{
      Notification({type:'error',content:error.message})
  })
}


function OrderDetails(props) {
  const history = useHistory();
  const [size, setSize] = useState('large');
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
   const [details, setDetails] = useState('');
   const [orderDetails, setOrderDetails] = useState('');
   const [getFee, setGetFee] = useState(0);
   const [confirmationData, setConfirmationData] = useState('');
   const { connectWithApi } = useInsideAuthApi();
  const [popup, setPopup] = useState(false);
  const [order_id, setOrderId] = useState('');
   useEffect(() => {
     console.log(props)
     if(props.location.redirect === 'TradeOrderReview'){
      currentPrice(connectWithApi,setDetails,props.location.details.buy_sell,props.location.details.Symbol,props.location.details.accountId,props.location.details.NumberofUnits,setGetFee)
     }else if(props.location.redirect === 'OrderDetails'){
      setOrderDetails(props.location.details);
     }
   }, [counter]);
  
  const handlePopup = (id) => {
    setOrderId(id)
    setPopup(true)
  }
  const handleClose = () => {
    setPopup(false)
  }

  const handleCancel = () => {
    let id=order_id
    let payload = {
      method: "CANCEL",
    };
    connectWithApi()
      .cancelOrder(id, payload)
      .then((res) => {
        // console.log(res.data);
        handlePopup(false);
        history.push({
          pathname: routes.authRoutes.orderHistory,
        });

      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }
  return (
    props.location.redirect === 'TradeOrderReview' && page === 0?<StyledForm onFinish={()=>postData(connectWithApi,props.location.details,setPage,setConfirmationData,Notification)}>
      <InvestTitle title="Order Review"/>
      <SelectAccount title="Account" select={false} text={props.location.details.Account}/>
      <SelectAccount title="Instrument:" select={false} text={props.location.details.Instrument}/>
      <SelectAccount title="Buy/Sell" select={false} text={capitaliseFirstChar(props.location.details.buy_sell.toLowerCase())}/>
      <SelectAccount title="Order Type:" select={false} text={capitaliseFirstChar(props.location.details.OrderType.toLowerCase()) + ' Order'}/>
      <SelectAccount title="Current Price" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(Number(details))}/>
      <SelectAccount title="Number of Units" select={false} text={props.location.details.NumberofUnits.toFixed(8)}/>
      <SelectAccount title="Estimated Value" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(props.location.details.EstimatedValue)}/>
      <SelectAccount title="Fees & Taxes" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(getFee)}/>
      <StyledDotedDivider />
      <SelectAccount title="Total Cost" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(props.location.details.EstimatedValue + getFee)}/>
      <StyledDiv>
        <Button size="md-1" outlined onClick={()=>{
          history.push({
            pathname: routes.authRoutes.invest,
            state: {
              symbol: props.location.details.Symbol,
              name: props.location.details.name,
              id: props.location.details.id
            }
            })
        }}>Back</Button>
        {/* <Link to={routes.authRoutes.orderConfirmation}><Button size="md-1" htmlType="submit">Submit for Approval</Button></Link> */}
        <Button size="md-1" htmlType="submit">Submit</Button>
      </StyledDiv>
  </StyledForm>:
   props.location.redirect === 'TradeOrderReview' && page === 1?
            <StyledForm>
                <InvestTitle title="Order Confirmation"/>
                <Row >
                  <Col lg={23} xs={23} sm={23}>
                      <MarketStatus>{confirmationData.message}</MarketStatus>
                  </Col>
              </Row>
                <SelectAccount title="Order Number" select={false} text={confirmationData.data.dw_order_number}/>
                <SelectAccount title="Order Status" select={false} text={confirmationData.data.dw_status === 'NEW'?'Submitted':confirmationData.data.dw_status === 'PARTIAL_FILL'?'Partially Filled':confirmationData.data.dw_status === 'PENDING_CANCEL'?'Pending Cancel':capitaliseFirstChar(confirmationData.data.dw_status.toLowerCase())}/>
                <SelectAccount title="Account" select={false} text={confirmationData.data.account_number}/>
                <SelectAccount title="Instrument:" select={false} text={confirmationData.data.instrument.name+' ('+confirmationData.data.instrument.symbol+' )'}/>
                <SelectAccount title="Buy/Sell" select={false} text={capitaliseFirstChar(confirmationData.data.buy_sell.toLowerCase())}/>
                <SelectAccount title="Order Type: " select={false} text={capitaliseFirstChar(confirmationData.data.order_type.toLowerCase()) + ' Order'}/>
                <SelectAccount title="Current Price" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(details)}/>
                <SelectAccount title="Number of Units" select={false} text={confirmationData.data.unit}/>
                <SelectAccount title="Value" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(confirmationData.data.value)}/>
                <SelectAccount title="Fees & Taxes" select={false} text={confirmationData.data.tax_fee !== null?defaultValues.defaultCurrency+applyAmountCommaMask(Number(confirmationData.data.tax_fee)):applyAmountCommaMask(0)}/>
                <StyledDotedDivider />
                <SelectAccount title="Total Cost" select={false} text={defaultValues.defaultCurrency+applyAmountCommaMask(confirmationData.data.value)}/>
                <StyledDiv>
                  <Button size="md-1" outlined onClick={()=>history.push(routes.authRoutes.orderHistory)}>View Orders</Button>
                  <Button size="md-1" onClick={()=>{}}>Account Summary</Button>
                </StyledDiv>
            </StyledForm> : 
        props.location.redirect === 'OrderDetails' ?
          <>
            <StyledForm>
            <InvestTitle title="Order Details"/>
            <Row >
              <Col lg={23} xs={23} sm={23}>
                  <MarketStatus>{confirmationData.message}</MarketStatus>
              </Col>
          </Row>
            <SelectAccount title="Order Number" select={false} text={orderDetails.dw_order_number?orderDetails.dw_order_number:''}/>
            {/* <SelectAccount title="Order ID" select={false} text={orderDetails.dw_order_id?orderDetails.dw_order_id:''}/> */}
            <SelectAccount title="Order Status" select={false} text={orderDetails.dw_status !== undefined?orderDetails.dw_status === 'NEW'?'Submitted':orderDetails.dw_status === 'PARTIAL_FILL'?'Partially Filled':orderDetails.dw_status === 'PENDING_CANCEL'?'Pending Cancel':capitaliseFirstChar(orderDetails.dw_status.toLowerCase()):''}/>
            <SelectAccount title="Instrument:" select={false} text={orderDetails.instrument?orderDetails.instrument.name +' ('+orderDetails.instrument.symbol+' )':''}/>
            <SelectAccount title="Buy/Sell" select={false} text={orderDetails.buy_sell?capitaliseFirstChar(orderDetails.buy_sell.toLowerCase()):''}/>
            <SelectAccount title="Order Type: " select={false} text={orderDetails.order_type?capitaliseFirstChar(orderDetails.order_type.toLowerCase())+' Order':''}/>
            <SelectAccount title="Order Date" select={false} text={orderDetails.order_date?orderDetails.order_date:''}/>
            <SelectAccount title="Number of Units" select={false} text={orderDetails.unit?orderDetails.unit:''}/>
            <SelectAccount title="Value" select={false} text={orderDetails.value?defaultValues.defaultCurrency+applyAmountCommaMask(orderDetails.value):''}/>
            <SelectAccount title="Fees & Taxes" select={false} text={orderDetails.tax_fee !== null?defaultValues.defaultCurrency+applyAmountCommaMask(Number(orderDetails.tax_fee)):defaultValues.defaultCurrency+applyAmountCommaMask(0)}/>
            <StyledDotedDivider />
            <SelectAccount title="Total Cost" select={false} text={orderDetails.value?defaultValues.defaultCurrency+applyAmountCommaMask(orderDetails.value):''}/>
            <StyledDiv>
            {orderDetails.dw_status === 'Submitted'?<>
            <Button size="md-1" outlined={orderDetails.dw_status === 'Submitted'?true:false} onClick={()=>history.push(routes.authRoutes.orderHistory)}>Back</Button>
                  <Button size="md-1" onClick={()=>handlePopup(props.location.details.id)}>Cancel</Button>
            </>:<StyledCenterDiv><Button size="md-1" onClick={()=>history.push(routes.authRoutes.orderHistory)}>Back</Button></StyledCenterDiv>}

            </StyledDiv>
            </StyledForm>

            <Modal title="Message" visible={popup}
        // onOk={handleDeleteOk}
        onCancel={handleClose}
        footer={[
          <Button key="back" size="md-2" outlined={true} onClick={handleClose}>
            No
          </Button>,
          <Button key="submit" size="md-2"
            onClick={handleCancel}
          >
            Yes
          </Button>,
        ]}
      >
              <ModalText>
                {`Are you sure you want to cancel order`}
              </ModalText>
            </Modal>
            </>
        :null
  )
}


export default OrderDetails;