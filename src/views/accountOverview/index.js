import React from 'react';

import ResultImg from '../../assets/account-overview.png';
import { useAuth } from "../../contextProviders/authProvider";
import AccountMainSection from './Const/accountMainSection';
import * as S from './styles.js';

function AccountOverview(){

    const { loggedInUser } = useAuth();
    const transitionInfo = loggedInUser && loggedInUser[`customer_transition_info`] ? loggedInUser[`customer_transition_info`] :''

    return(
        transitionInfo && transitionInfo['kyc_status'] ==='PENDING'?
        <S.PageContainer>
            <S.StyledResult
                status='success'
                icon={<S.Img src={ResultImg} alt={'result-screen'} />}
                subTitle="Your KYC is in progress. We will notify you once it has been approved. In the meantime,
                you can browse the market and create your watchlists"
            />

        </S.PageContainer> :
        <AccountMainSection />
    );
}

export default AccountOverview;
