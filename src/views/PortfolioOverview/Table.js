import React from 'react';
import * as S from './styles';
import ButtonWrape from './ButtonWrape';
import {defaultValues} from '../../constants/defaultValues';
import {applyAmountCommaMask, formatPercentage} from '../../utils/dataManipulation';
import Filter from '../../assets/filter.png';
import {routes} from '../../constants/routes'
import { useHistory } from "react-router-dom";


 function onChange(pagination, filters, sorter, extra) {
   console.log('params', pagination, filters, sorter, extra);
 }

function Table({info,loading}){
  const scroll = { y: 2067 };
  const history = useHistory();

  const columns = [
  {
      title:'Instrument',
      key:1,
      dataIndex: 'instrument',                  
      filterMultiple: false,
      width: '23%',
    
    },
    {
      title: () => {
      
        return (
          <div style={{textAlign:'right'}}>
            Holdings 
            <br /> 
            <S.SubTitle className='new'>
              Total Change
            </S.SubTitle>
          </div>
        );
      },
      dataIndex: 'holdings',
      key:2,
      width: '23%',
    },
    {
      title: () => {
      
        return (
          <div style={{textAlign:'right'}}>
            Price 
            <br /> 
            <S.SubTitle className='new'>
            Day Change
            </S.SubTitle>
          </div>
        );
      },

      dataIndex: 'price',
      key:3,      
      width: '17%',
    },
    {
      title: () => {
      
        return (
          <div style={{textAlign:'right'}}>
            Total Cost 
            <br /> 
            <S.SubTitle className='new'>
            Units
            </S.SubTitle>
          </div>
        );
      },
      dataIndex: 'cost',
      key:4,      
      width: '17%',
    },
    {
      title: () => {
      
        return (
          <div style={{textAlign:'right'}}>
          <img src={Filter} alt='fliter'/>
            </div>
        );
      },

      dataIndex: 'buttons',
      key:5,
      render: ()=>{
        return(
          <ButtonWrape/>
        );
      },
      filterMultiple: false,
      width: '20%',
    },
   
  ];
 
  const dataSource = [];
  if(info.length>0){
    console.log(info);
    info.map((x,index)=>(
      dataSource.push(
        {
          key:index,
          instrument: <div onClick={()=>history.push({pathname:routes.authRoutes.productDetails+'/'+ x.instrumentID})} >
                        <div>
                          {x.name}
                        </div>
                        <div>
                        {x.symbol?x.symbol:''}
                        </div>
                      </div>,
          
          holdings: <div>
                      <div>
                        {x.marketValue?defaultValues.defaultCurrency + applyAmountCommaMask(x.marketValue):''}
                      </div>
                      <S.TableValue className={x.instrument_summary.total_change_percent > 0 ? "green" : "red"}>
                        {x.instrument_summary.total_change_percent >= 0
                          ? '+'+defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_summary.total_change)+"(+" + formatPercentage(x.instrument_summary.total_change_percent)+')'
                          : '-'+defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_summary.total_change).slice(1,)+"(" + formatPercentage(x.instrument_summary.total_change_percent)+')'}
                          
                      </S.TableValue>
                    </div>,
          
          price: <div>
                  <div>
                    {x.mktPrice?x.mktPrice:''}
                  </div>
                  <S.TableValue className={x.instrument_summary.day_change_percent > 0 ? "green" : "red"}>
                    {x.instrument_summary.day_change_percent >= 0
                      ? '+'+defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_summary.day_change)+"(+" + formatPercentage(x.instrument_summary.day_change_percent)+')'
                      : '-'+defaultValues.defaultCurrency + applyAmountCommaMask(x.instrument_summary.day_change).slice(1,)+"(" + formatPercentage(x.instrument_summary.day_change_percent)+')'}
                  </S.TableValue>
                </div>,
          
          cost: <div>
                  <div>
                    {x.costBasis?defaultValues.defaultCurrency + applyAmountCommaMask(x.costBasis):''}
                  </div>
                  <div>
                    {x.openQty?applyAmountCommaMask(x.openQty):''}
                  </div>
                </div>,
          
          buttons: <ButtonWrape id={x.instrumentID?x.instrumentID:''} symbol={x.symbol?x.symbol:''} name={x.name?x.name:''}/>
        }
      )
    ))
  }

   return (
      <S.StyledTable 
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        // loading={tableLoading}
        scroll={info.length > 25 ? scroll : ""}
        loading={loading}
      />

   )
 }
 
 export default Table;