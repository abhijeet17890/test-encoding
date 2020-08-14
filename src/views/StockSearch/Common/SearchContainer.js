import React, {useState, useEffect} from 'react';
import {Col, Button, Tooltip, Row} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { StyledDivider, StyledButton, StyledSmallDivider} from '../Style';
import 'antd/dist/antd.css'
import SearchBar from "./SearchBar";
import SelectBox from "./Select";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { defaultValues } from "../../../constants/defaultValues";
import Loader from "../../../sharedComponents/Loader";
import { buildQuery } from '../../../utils/dataManipulation';
import {routes} from "../../../constants/routes";
import {useHistory} from "react-router-dom";

const getSectorData = (connectWithApi, setLoader,setSectorData) =>{
  connectWithApi()
  .SectorsList()
  .then((res) => {
    setSectorData(res.data);
    setLoader(false);
  })
  .catch((error) => {
    setLoader(false);
    // Notification({ type: "error", content: error.message });
  });
}

const getSearchData = (connectWithApi, setLoader, SectorSelectData,data,type,callback) =>{
  console.log(SectorSelectData,data,type);
  let  varData = {
    ordering:'name',
    status:'ACTIVE',
  };
  if(data!==''&&data!==null){
    varData = { ...varData, search: data}
  }
  if(SectorSelectData!==''&&SectorSelectData!==null){
    varData = { ...varData, instrument_details__sector_id: SectorSelectData}
  }
  if(type!==''&&type!==null){
    varData = { ...varData, instrument_details__instrument_type: type}
  }
  setLoader(true)

  connectWithApi()
  .InstrumentsSearch(
    buildQuery(varData)
  )
  .then((res) => {

    callback(res.data,data)
    setLoader(false);
  })
  .catch((error) => {
    setLoader(false);
    // Notification({ type: "error", content: error.message });
  });
}


const SearchContainer = (props) => {
    const history = useHistory();
    const [size, setSize] = useState('large');
    const [counter, setCounter] = useState(0);
    const { connectWithApi } = useInsideAuthApi();
    const [loader, setLoader] = useState(true);
    const [SectorData, setSectorData] = useState('');
    const [SectorSelectData, setSectorSelectData] = useState('');
    const [SearchData, setSearchData] = useState('');
    const [searchResultData, setSearchResultData] = useState('');
    const [searchString, setSearchString] = useState('');
    const [searchType, setSearchType] = useState('');
  
    const sectorValue = (data) => {
      setSectorSelectData(data);
      getSearchData(connectWithApi, setLoader, data,searchString,searchType,(data,string)=>{
        setSearchData(data);
        setSearchResultData(data);
        setSearchString(string);
      });
    }

    const onType = (data) => {
      if(props.val==='etf'){
        setSearchType('ETF');
      }else if(props.val==='shares'){
        setSearchType('ADR,EQUITY');
      }

      if(data.length >= defaultValues.searchAfterChar){
        getSearchData(connectWithApi, setLoader, SectorSelectData,data,searchType,(data,string)=>{
          setSearchData(data);
          setSearchResultData(data);
          setSearchString(string);
        });
      }else{
        setSearchData('')
      }
    }

    useEffect(() => {
      let data = ''
      if(props.val==='etf'){
        setSearchType('ETF');
        data = 'ETF';
      }else if(props.val==='shares'){
        setSearchType('ADR,EQUITY');
        data = 'ADR,EQUITY'
      }
      console.log(props.prefixData)
      setSectorSelectData(props.prefixData!== undefined?props.prefixData.sector_id:null);
      getSectorData(connectWithApi,setLoader,setSectorData);
    
      getSearchData(connectWithApi, setLoader,props.prefixData!==undefined?props.prefixData.sector_id:'',props.prefixData!== undefined?props.prefixData.search_data:'',props.prefixData !== undefined?props.prefixData.instrument_type:data,(data,string)=>{
        setSearchData(data);
        setSearchResultData(data);
        setSearchString(string);
        props.stockData(data,string);
      });
    }, [counter]);

   return (

        <Row type="flex" gutter={[8, 40]}>
            <Col xs={24} sm={24} md={9} lg={9} xl={9} offset={window.innerWidth > 768 ?1:0}>
                <SelectBox data={SectorData} onSelect={sectorValue} defaultVal={props.prefixData!==undefined?props.prefixData.sector_id:null}/>
            </Col>
            <Col xs={24} sm={24} md={13} lg={13} xl={13}>
                <SearchBar ontype={onType} data={SearchData} preSearch={props.prefixData!== undefined?props.prefixData.search_data:null}/>
            </Col>
            <Col xs={24} sm={24} md={1} lg={1} xl={1} >
              <Tooltip title="search">
                <StyledButton type="primary" customcornertype='round-corner' loading={loader} onClick={() => !props.resultPage?history.push({
                  pathname: routes.authRoutes.stockResults+'/'+props.val,
                  state: {
                    sector_id: SectorSelectData,
                    search_data: searchString,
                    instrument_type:searchType
                  }
                  }):props.stockData(searchResultData,searchString)} icon={<SearchOutlined />} />
              </Tooltip>
            </Col>
        </Row>

   )
 }
 
 export default SearchContainer;