import React from 'react';
import TopSection from './TopSection';
import columns from './columns';
import Table from '../sharedComponents/Table/index';

import * as S from './styles';

export default function PortfolioOverview(){
    return(
        <S.PageContainer>
            <TopSection/>
            <Table columns={columns}/>
        </S.PageContainer>
    );

}