import React from 'react';
import { Space } from 'antd';
import {Button} from '../../../sharedComponents/button/index';
import { Input } from '../../../sharedComponents/Input/index';
import {useHistory} from "react-router-dom";
import {SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import {routes} from "../../../constants/routes";
import * as S from './styles.js';


const renderItem = (pre_title,title,link) => ({
  //  value: title,
   label: (

     <S.StyledA
      href={link}
     >
      
        <S.PreTitle>{pre_title}</S.PreTitle>
        <S.Separator>|</S.Separator>
        <Space size={550}>
          <S.Title>{title}</S.Title>
      
          <Button size={'sm-1'} outlined>+Watchlist</Button>
        </Space>
     </S.StyledA>
   ),
 });

 const options = [
   {
     options: [renderItem('AAA','AntDesign','/'), renderItem('AA','AntDesign UI','/')],
   }
 ];

const SearchBar = (props) => {
    const history = useHistory();
   return (
      <S.StyledAutoComplete
         dropdownClassName="search_dropdown"
         options={options}
      >
         <S.StyledSearch
            prefix={<SearchOutlined/>}
            onSearch={value => history.push(routes.authRoutes.stockResults)} 
            placeholder="Add a new instrument to the list" />
       
      </S.StyledAutoComplete>
   )
 }
 
 export default SearchBar;