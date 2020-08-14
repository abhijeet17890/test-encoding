import React, {useState, useEffect} from 'react';
import {Row, Col} from 'antd';
import ViewList from './ViewList';
// import { StyledDivider , StyledSmallDivider} from '../Style';
import ProgressBar from './ProgressBar';
import NewsSection from '../NewsSection/index';
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { defaultValues } from "../../../constants/defaultValues";
import Loader from "../../../sharedComponents/Loader";
import { applyAmountCommaMask } from '../../../utils/dataManipulation';
import 'antd/dist/antd.css';


const getViewedShares = (connectWithApi, setLoader, getType,setRecentView) =>{
   setLoader(true);
   let type = ''
      if(getType==='etf'){
        type='ETF';
      }else if(getType==='shares'){
        type='EQUITY';
      }
   connectWithApi()
   .showRecentViewed(type)
   .then((res) => {
      let data = [];
      res.data.map(x=>(
         data.push(
            [x.name,defaultValues.defaultCurrency+applyAmountCommaMask(x.price),x.price_change_percentage>0?true:false,x.price_change_percentage>0?'+'+applyAmountCommaMask(x.price_change_percentage)+'%':applyAmountCommaMask(x.price_change_percentage)+'%',x.id]
         )
      ));
      setRecentView(data)
     setLoader(false);
   })
   .catch((error) => {
     setLoader(false);
     // Notification({ type: "error", content: error.message });
   });
 }

 const getMarketInformation = (connectWithApi, setLoader, getType,setMarketInformation) =>{
   setLoader(true);
   let type = ''
      if(getType==='etf'){
        type='ETF';
      }else if(getType==='shares'){
        type='EQUITY';
      }
   connectWithApi()
   .showStockMarketInfo()
   .then((res) => {
      console.log(res.data)
      let data = [];
      res.data.map(x=>(
         data.push(
            [x.name,defaultValues.defaultCurrency+applyAmountCommaMask(x.price),x.price_change_percentage>0?true:false,x.price_change_percentage>0?'+'+applyAmountCommaMask(x.price_change_percentage)+'%':applyAmountCommaMask(x.price_change_percentage)+'%']
         )
      ));
      console.log(data);
      setMarketInformation(data)
     setLoader(false);
   })
   .catch((error) => {
     setLoader(false);
   });
 }

const AllResult = (props) => {
   const { connectWithApi } = useInsideAuthApi();
   const [loader, setLoader] = useState(true);
   const [recentView, setRecentView] = useState([]);
   const [marketInformation, setMarketInformation] = useState([]);
   const [currentPage, setCurrentPage] = useState('');

   useEffect(() => {
      if(props.val !== currentPage){
         getViewedShares(connectWithApi,setLoader,props.val,setRecentView);
         getMarketInformation(connectWithApi,setLoader,props.val,setMarketInformation);
         setCurrentPage(props.val);
      }
    });
   return (
      <>
         <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <ViewList TitleUnderline={true} Title={props.val==='shares'?'Recently Viewed Shares':props.val==='etf'?'Recently Viewed ETFs':'Recently Viewed'} data={recentView}/>
            </Col>
         </Row>
         <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <ViewList Title={'Stock Market Information'} TitleUnderline={true} data={marketInformation}/>
            </Col>
         </Row>
         {/* <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <ViewList Title={'Top 5 Risers'} data={[['Apple Inc','$633.75',true,'+3.53%'],['Apple Inc','$633.75',false,'+3.53%'],['Apple Inc','$633.75',true,'+3.53%'],['Apple Inc','$633.75',false,'+3.53%']]}/>
            </Col>
         </Row >
         <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <ViewList Title={'Top 5 Fallers'} data={[['Apple Inc','$633.75',true,'+3.53%'],['Apple Inc','$633.75',false,'+3.53%'],['Apple Inc','$633.75',true,'+3.53%'],['Apple Inc','$633.75',false,'+3.53%']]}/>
            </Col>
         </Row>
         <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <ProgressBar Title='Buy/Sell Ratio' data= {[{heading:'Microsoft Corporation',width:'50%'},{heading:'Microsoft Corporation',width:'60%'}]}
               />
            </Col>
         </Row>
         <Row gutter={[0, 30]}>
            <Col span={23} offset={1}>
               <NewsSection />
            </Col>
         </Row> */}
   </>
   )
 }
 
 export default AllResult;