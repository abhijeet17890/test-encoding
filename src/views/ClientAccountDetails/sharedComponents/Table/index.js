import React from 'react';
import * as S from './styles.js';

const Table = (props)=>{
    return(
        <S.StyledTable columns={props.columns} dataSource={props.dataSource} />
    );
} 
export default Table;