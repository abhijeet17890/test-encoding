import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {routes} from "../../constants/routes";

import { useAuth } from "../../contextProviders/authProvider";
import Notification from "../../sharedComponents/Notification";

const AfterAuthRoot = (props) => {
    const { loggedInUser } = useAuth();
    const history = useHistory();

    // if(loggedInUser && loggedInUser.groups){
        let userType = loggedInUser.groups[0].name.toLowerCase()
        let transitionInfo = loggedInUser[`${userType}_transition_info`]

        // const redirectAfterUserAuth = (res,token, tokenExpiration, userType, transitionInfo,history) =>{
        const {
            advisor_selection_completed,
            plan_purchased,
            kyc_submitted,
            kyc_status,
            kyc_initiated
        } = transitionInfo;

        const kycFlowRedirection = () =>{
            if(kyc_initiated){
                if(kyc_submitted){
                    if(kyc_status.toUpperCase() ==='PENDING' ){
                        history.push(routes.authRoutes.kycThankYou)
                    }else{
                        if(userType === 'customer'){
                            history.push(routes.authRoutes.customerDashboard)
                        }else if(userType === 'advisor'){
                            history.push(routes.authRoutes.advisorDashboard)
                        }
                        history.push(routes.authRoutes.dashboard);
                    }
                }else{
                    history.push(routes.authRoutes.kycProcess)
                }
            }else{
                history.push(routes.authRoutes.kycProcess)
            }
        }

    useEffect(() => {
        if(plan_purchased){
            if(advisor_selection_completed){
                kycFlowRedirection();
            }else{
                history.push(routes.authRoutes.advisorSelection)
            }
        }else{
            if(userType === 'customer'){
                history.push(routes.authRoutes.planSelection)
            }else if(userType === 'advisor'){
                kycFlowRedirection();
            }

        }
    }, []);

    // }

        // updateLoggedInUserInfo({...res, token, tokenExpiration, userType, pendingAuth:false });
    // }
    return <React.Fragment>''</React.Fragment>
};
export default AfterAuthRoot;