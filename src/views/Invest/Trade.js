import React, {useState, useEffect} from 'react';
import { Space , Form} from "antd";
import SelectAccount from "./SharedComponents/SelectAccount";
import InvestTitle from "./SharedComponents/InvestTitle";
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import ShowAmount from "./SharedComponents/ShowAmount";
import {Button} from '../../sharedComponents/button';
import {Checkbox} from '../../sharedComponents/Checkbox';
import {StyledSwitch, StyledFormMain, StyledSmallDivider, StyledDivider} from './style';
import { applyAmountCommaMask,capitaliseFirstChar } from '../../utils/dataManipulation';
import Loader from "../../sharedComponents/Loader";
import {defaultValues} from '../../constants/defaultValues';
import {routes} from '../../constants/routes';
import {useHistory} from "react-router-dom";
import Notification from '../../sharedComponents/Notification';

const getBuySellData = (connectWithApi,setAccountDetails,setShowData,setLoader) => {
  connectWithApi()
  .getBuySellInfo()
  .then((res) => {
    let data = [];
    setShowData(res.data);
    res.data.map((x)=>(
      x.accountSummary !== undefined || x.accountSummary !== null?
      data.push({val:(x.accountSummary.accountName !== null? x.accountSummary.accountName : '')+' / '+x.accountSummary.accountNo,text:(x.accountSummary.accountName !== null? x.accountSummary.accountName : '')+' / '+x.accountSummary.accountNo,id:x.accountSummary.accountID})
      :null
    ))
    setAccountDetails(data);
    setLoader(false);
   })
   .catch((error)=>{
      Notification({type:'error',content:error.message})
      setLoader(false)
    })
}

const getOrderTypeInfo = (connectWithApi,setShowOrderTypeData,setLoader) => {
  connectWithApi()
  .getOrderTypeInfo()
  .then((res) => {
    let data = [];
     res.data.map((x)=>(
      data.push({val:x.value,text:x.name})
     ));
     setShowOrderTypeData(data)
     setLoader(false);
   })
   .catch((error)=>{
      Notification({type:'error',content:error.message})
      setLoader(false)
  })
}
const getTradeInfo = (connectWithApi,symbol,setShowBuyAmount,setLoader) => {
  connectWithApi()
  .getTradeInfo(symbol)
  .then((res) => {
     setShowBuyAmount({buy:res.data[0].ask,sell:res.data[0].bid})
     setLoader(false);
   })
   .catch((error)=>{
      Notification({type:'error',content:error.message})
      setLoader(false)
  })
}

function Invest(props) {
  const history = useHistory();
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(0);
  const [showbuyAmount, setShowBuyAmount] = useState([]);
  const { connectWithApi } = useInsideAuthApi();
  const [loader, setLoader] = useState(true);
  const [accountDetails, setAccountDetails] = useState([])
  const [showData, setShowData] = useState([]);
  const [showInvestData,setShowInvestData] = useState();
  const [showOrderTypeData,setShowOrderTypeData] = useState([]);
  const [showAvailabevalue,setShowAvailabevalue] = useState(0);
  const [showEstimatedvalue,setShowEstimatedvalue] = useState();
  const [showEstimatedUnit,setShowEstimatedUnit] = useState();
  const [showMaxValue,setShowMaxValue] = useState(null);
  const [showXvalue,setShowXvalue] = useState();
  const [accountId,setAccountId] = useState();
  const [accountCounter,setAccountCounter] = useState(0);

  const [showDataString,setShowDataString] = useState({
    buySell: {
      val: "Buy",
    },
    selected:{
      val: false,
    },
    estimated: {
        val: false,
    },
    order_price: {
      val: 0,
    },
    amount: {
      val: 0,
    }
  });

  useEffect(() => {
    getTradeInfo(connectWithApi,props.data.symbol,setShowBuyAmount,setLoader);
    getOrderTypeInfo(connectWithApi,setShowOrderTypeData,setLoader);
    getBuySellData(connectWithApi,setAccountDetails,setShowData,setLoader);
    setShowBuyAmount({buy:'--',sell:'--'});
    setShowXvalue(0.05)
    // setShowBuyAmount({buy:20.56,sell:50.45});
    formRef.current.setFieldsValue({
        buySell: props.data.buySell !== undefined?props.data.buySell:'Buy',
      });
  }, [counter]);

  useEffect(() => {
    if(showData.length>0 && accountCounter===0){
      setAccountCounter(1);
      formRef.current.setFieldsValue({
        account: (showData[0].accountSummary.accountName !== null? showData[0].accountSummary.accountName : '')+' / '+showData[0].accountSummary.accountNo,
      });
      changeAccount(showData[0].accountSummary.accountNo)
    }
  })

  function onCalculate(checked) {
    setShowDataString((prevState) => ({
      ...prevState,
      estimated: {
        val: checked,
      },}
    ));
    resetingInput()

  }
  function onChecked(e) {
    setShowDataString((prevState) => ({
      ...prevState,
      selected: {
        val: e.target.checked,
      },}
    ));
    if(e.target.checked){
        formRef.current.setFieldsValue({
            amount: showInvestData!== undefined?showInvestData.unitsOwned: 0
          });
        const data = showInvestData!== undefined?showInvestData.unitsOwned: 0;

        setShowEstimatedUnit(showInvestData!== undefined?showInvestData.unitsOwned: 0)
        setShowEstimatedvalue(formRef.current.getFieldValue('order_price') * formRef.current.getFieldValue('account'));
    }else{
        setShowEstimatedUnit(showInvestData!== undefined?showInvestData.unitsOwned: 0);
        setShowEstimatedvalue(formRef.current.getFieldValue('order_price') * formRef.current.getFieldValue('account'));
    }
    calculateTotal();
  }

  const changeAccount = (val) => {
    setShowDataString((prevState) => ({
      ...prevState,
      account: {
        val: val,
      },
  }
    ));
    if(showData.length>0){
      showData.map((x)=>(
        x.accountSummary.accountNo === val?x.accountSummary.cash!==undefined?setShowAvailabevalue(x.accountSummary.cash.cashAvailableForTrade):null:setShowAvailabevalue(0),
        setAccountId(x.accountSummary.details.id),
        x.accountSummary.accountNo === val?x.accountSummary.equity.equityPositions.length?
          x.accountSummary.equity.equityPositions.map((y)=>(
            y.symbol === props.data.symbol?setShowInvestData({unitsOwned: y.openQty,currentValue:applyAmountCommaMask(y.marketValue)}):null
          ))
        :null:setShowInvestData({unitsOwned: 0,currentValue:0})
      ))
    }
  }

  const onChange = (val,keys) =>{
    if(keys === 'account'){
      changeAccount(val)
    }
    if(keys === 'buySell'){
      setShowDataString((prevState) => ({
        ...prevState,
        buySell: {
          val: val,
        },}
      ));
      resetingInput();
    }
    if(keys === 'type'){
      setShowDataString((prevState) => ({
        ...prevState,
        type: {
          val: val,
        }
      }));
      resetingInput();
      formRef.current.setFieldsValue({
        order_price: val === 'MARKET'?formRef.current.getFieldValue('buySell')==='Buy'?showbuyAmount.buy:showbuyAmount.sell:null,
      });
      if(val === 'LIMIT'){
        setShowDataString((prevState) => ({
          ...prevState,
          estimated: {
            val: true,
          }
        })); 
      }
    }
    if(keys === 'amount'){
      setShowDataString((prevState) => ({
        ...prevState,
        amount: {
          val: parseFloat(val),
        },
    }
      ));
    }
    if(keys === 'order_price'){
      setShowDataString((prevState) => ({
        ...prevState,
        order_price: {
          val: parseFloat(val),
        },
    }
      ));
    }
    calculateTotal();
  }
  const resetingInput = () => {
    formRef.current.setFieldsValue({
      amount: 0,
      order_price: formRef.current.getFieldValue('type') === 'MARKET'?formRef.current.getFieldValue('buySell')==='Buy'?showbuyAmount.buy:showbuyAmount.sell:0
    });
    setShowEstimatedvalue(formRef.current.getFieldValue('type') === 'MARKET'?formRef.current.getFieldValue('buySell')==='Buy'?showbuyAmount.buy:showbuyAmount.sell:0);
    setShowEstimatedUnit(0)
  }
  const calculateTotal = () =>{
    setShowMaxValue(null)
    setShowEstimatedvalue(0);
    if(formRef.current.getFieldValue('buySell') === 'Buy' && !showDataString.estimated.val){
        const data = showAvailabevalue!== undefined?Number(showAvailabevalue): 0;
        if(formRef.current.getFieldValue('type') === 'STOP'){
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient funds to place this order',
                    max_value: data,
                },
                order_price:{
                    errors: 'The stop price must be higher than '+applyAmountCommaMask(showbuyAmount.buy + showXvalue)+'. Please increase your stop price for the order to be accepted',
                    min_value: showbuyAmount.buy + showXvalue,
                }
            }));

        }else{
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient funds to place this order',
                    max_value: data,
                },
                order_price: null
            }));
        }
        setShowEstimatedvalue(formRef.current.getFieldValue('amount'));
        setShowEstimatedUnit(applyAmountCommaMask((formRef.current.getFieldValue('amount') !== undefined?formRef.current.getFieldValue('amount'):0) / (showbuyAmount.buy !== undefined?showbuyAmount.buy: 0)) !== 'Infinity'?((formRef.current.getFieldValue('amount') !== undefined?formRef.current.getFieldValue('amount'):0) / (showbuyAmount.buy !== undefined?showbuyAmount.buy: 0)):0)
    }else if(formRef.current.getFieldValue('buySell') === 'Buy' && showDataString.estimated.val){
        // debugger;
        const data = showAvailabevalue!== undefined?Number(showAvailabevalue): 0;
        if(formRef.current.getFieldValue('type') === 'STOP'){
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient funds to place this order',
                    max_value: data,
                    total: true
                },
                order_price:{
                    errors: 'The stop price must be higher than '+applyAmountCommaMask(showbuyAmount.buy + showXvalue)+'. Please increase your stop price for the order to be accepted',
                    min_value: showbuyAmount.buy + showXvalue,
                }
            }));

        }else{
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient funds to place this order',
                    max_value: data,
                    total: true
                },
                order_price: {
                  errors: 'You do not have sufficient funds to place this order',
                  max_value: data,
                  total: true
              }
            }));
        }
        setShowEstimatedvalue(formRef.current.getFieldValue('amount') * formRef.current.getFieldValue('order_price'));
        setShowEstimatedUnit(formRef.current.getFieldValue('amount'))
    }else if(formRef.current.getFieldValue('buySell') === 'Sell' && showDataString.estimated.val){
        const data = showInvestData!== undefined?Number(showInvestData.unitsOwned): 0;
        const data1 = showInvestData!== undefined?Number(showInvestData.currentValue): 0;
        if(formRef.current.getFieldValue('type') === 'STOP'){
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient units',
                    max_value: data,
                },
                order_price:{
                    errors: 'The stop price must be lower than '+applyAmountCommaMask(showbuyAmount.sell - showXvalue)+'. Please decrease your stop price for the order to be accepted.',
                    min_value: showbuyAmount.sell - showXvalue,
                }
            }));

        }else{
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient units',
                    max_value: data,
                },
                order_price: {
                    errors: 'this value is higher than current value',
                    max_value: data1,
                }
            }));
        }

        setShowEstimatedvalue(formRef.current.getFieldValue('amount') * formRef.current.getFieldValue('order_price'));
        setShowEstimatedUnit(formRef.current.getFieldValue('amount'))
  
    }else if(formRef.current.getFieldValue('buySell') === 'Sell' && !showDataString.estimated.val){
        const data = showInvestData!== undefined?Number(showInvestData.currentValue): 0;
        if(formRef.current.getFieldValue('type') === 'STOP'){
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient funds',
                    max_value: data,
                },
                order_price:{
                    errors: 'The stop price must be lower than '+applyAmountCommaMask(showbuyAmount.sell - showXvalue)+'. Please decrease your stop price for the order to be accepted.',
                    min_value: showbuyAmount.sell - showXvalue,
                }
            }));

        }else{
            setShowMaxValue((prevState) => ({
                ...prevState,
                amount:{
                    errors: 'You do not have sufficient units',
                    max_value: data,
                },
                order_price: null
            }));
        }
        setShowEstimatedvalue(formRef.current.getFieldValue('amount'));
        setShowEstimatedUnit(applyAmountCommaMask((formRef.current.getFieldValue('amount') !== undefined?formRef.current.getFieldValue('amount'):0) / (showbuyAmount.sell !== undefined?showbuyAmount.sell: 0)) !== 'Infinity'?((formRef.current.getFieldValue('amount') !== undefined?formRef.current.getFieldValue('amount'):0) / (showbuyAmount.sell !== undefined?showbuyAmount.sell: 0) ):0)
    }
    else if(formRef.current.getFieldValue('buySell') === 'Sell' && showDataString.selected.val){
        setShowMaxValue((prevState) => ({
            ...prevState,
            amount:null,
            order_price: null
        }));
        setShowEstimatedvalue(formRef.current.getFieldValue('amount') * formRef.current.getFieldValue('order_price'));
        setShowEstimatedUnit(applyAmountCommaMask((showEstimatedvalue !== undefined?showEstimatedvalue:0) / (showbuyAmount.sell !== undefined?showbuyAmount.sell: 0)) !== 'Infinity'?((showEstimatedvalue !== undefined?showEstimatedvalue:0) / (showbuyAmount.sell !== undefined?showbuyAmount.sell: 0) ):0)
    }
  }
  const onSubmit = () =>{

    const data = {
        id: props.data.id,
        name: props.data.name,
        Symbol: props.data.symbol,
        Qunt: showDataString.estimated.val,
        Account_no: showDataString.account!== undefined?showDataString.account.val:accountDetails[0].val,
        Account: formRef.current.getFieldValue('account'),
        Instrument: props.data.name+" ( "+ props.data.symbol +" )",
        OrderVal:  Number(formRef.current.getFieldValue('order_price')),
        buy_sell: formRef.current.getFieldValue('buySell'),
        OrderType: formRef.current.getFieldValue('type'),
        CurrentPrice: showInvestData!==undefined?showInvestData.currentValue:defaultValues.defaultCurrency+0,
        NumberofUnits: showEstimatedUnit !== undefined?Number(showEstimatedUnit): 0,
        EstimatedValue: showEstimatedvalue !== undefined?Number(showEstimatedvalue):0,
        accountId:accountId
    }
    history.push({
        pathname: routes.authRoutes.orderConfirmation,
        details: data,
        redirect:'TradeOrderReview',
      }
    )
  }
  return (
   <StyledFormMain form={form} ref={formRef} onFinish={onSubmit}>
      <InvestTitle title={ props.data.name+" ( "+ props.data.symbol +" )"}/>
      <ShowAmount text={true} data={showbuyAmount}/>
      <StyledDivider />
        {accountDetails.length?<SelectAccount change={onChange} placeholder={'Select Account'} keys={'account'} title="Select Account" select={true} default={true} data={accountDetails}/>:null}
      <SelectAccount title="Units Owned" text={true} text={showInvestData!==undefined?showInvestData.unitsOwned.toString():'0'}/>
      <SelectAccount title="Current Value" text={true} text={showInvestData!==undefined?defaultValues.defaultCurrency+applyAmountCommaMask(showInvestData.currentValue):defaultValues.defaultCurrency+applyAmountCommaMask(0)}/>
      <SelectAccount title="Available to Invest" text={true} text={showAvailabevalue!==undefined?defaultValues.defaultCurrency+applyAmountCommaMask(showAvailabevalue):'--'}/>
      <StyledSmallDivider />
        <SelectAccount title="Buy/Sell" change={onChange} select={true} keys={'buySell'} data={[{val: 'Buy',text:'Buy'},{val: 'Sell',text:'Sell'}]}/>
        {showOrderTypeData.length?<SelectAccount title="Order type" change={onChange} keys={'type'} select={true} placeholder='Enter the Order Type' data={showOrderTypeData}/>:null}
      {showDataString.type?<SelectAccount title={capitaliseFirstChar(showDataString.type.val.toLowerCase())+" Price"} estimated={showEstimatedvalue} input={true} validation={showMaxValue} keys={'order_price'} disable={showDataString.type.val === 'MARKET'?true:false} type={onChange} placeholder={'Enter the '+showDataString.type.val.toLowerCase() +' price'}/>:null}
        <SelectAccount title={<Space size={'small'} >Value ($) <StyledSwitch onChange={onCalculate} disabled={showDataString.type !== undefined?showDataString.type.val === 'LIMIT'?true:false:false} checked={showDataString.estimated.val} /> Quantity </Space>} checked={showDataString.estimated.val} estimated={showEstimatedvalue} type={onChange} keys={'amount'} input={true} validation={showMaxValue} placeholder={showDataString.selected.val?'Enter the quantity':'Enter the amount'} />
      {showDataString.estimated.val?<SelectAccount title="Estimated Value" text={true} validation={showMaxValue} text={showEstimatedvalue!== 'NaN'?defaultValues.defaultCurrency+applyAmountCommaMask(showEstimatedvalue):defaultValues.defaultCurrency+'0'}/>:null}
      {showDataString.buySell.val==='Sell' && showDataString.estimated.val?<SelectAccount title={<Checkbox onChange={onChecked}>Sell All</Checkbox>} text={true} text=""/>:null}
      <Button size="lg" htmlType="submit">Review Order</Button>
   </StyledFormMain>
  );
}

export default Invest;