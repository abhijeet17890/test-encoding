import React from 'react';
import * as S from './styles';
import Filter from '../../assets/filter.png';
const columns = [
    {
        title: 'Instrument',
        dataIndex: 'name',
        filterMultiple: false,
        width: '30%',
        // specify the condition of filtering result
        // here is that finding the name started with `value`
      },
      {
        title: () => {
        
          return (
            <div>
              Holdings 
              <br /> 
              <S.SubTitle className='new'>
                Total Change
              </S.SubTitle>
            </div>
          );
        },
        dataIndex: 'no',
        width: '20%',
      },
      {
        title: () => {
        
          return (
            <div>
              Price 
              <br /> 
              <S.SubTitle className='new'>
              Day Change
              </S.SubTitle>
            </div>
          );
        },

        dataIndex: 'sval',
        width: '15%',
      },
      {
        title: () => {
        
          return (
            <div>
              Total Cost 
              <br /> 
              <S.SubTitle className='new'>
              Units
              </S.SubTitle>
            </div>
          );
        },
        dataIndex: 'Csell',
        width: '15%',
      },
      {
        title: () => {
        
          return (
            <div style={{textAlign:'right'}}>
            <img src={Filter} alt='fliter'/>
              </div>
          );
        },

        dataIndex: 'Gl',
        filterMultiple: false,
        width: '20%',
      },
     
    ];
   
export default columns;