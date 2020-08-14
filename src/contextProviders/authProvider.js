import React, { useState } from 'react';
import Notification from "../sharedComponents/Notification";
export const AuthContext = React.createContext({})


const getSavedUserFromStorage = () => {
    if(localStorage.getItem('loggedInUser')){
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }else{
        return null
    }
}
const savedLoggedInUser  = getSavedUserFromStorage();

export default function AuthProvider({ outsideAuthApi, insideAuthApi, children, routes }) {
    const [loggedInUser, setLoggedInUser] = useState(savedLoggedInUser)
    const [isLoading, setIsLoading] = useState(true)
    const handleJSON = React.useMemo(() => createJSONHandler(), []);

    const redirectAfterUserAuth = (userType, transitionInfo,history) =>{
        const  {
                   advisor_selection_completed,
                   plan_purchased,
                    kyc_submitted,
                    kyc_status,
                    kyc_initiated
               } = transitionInfo || {};

        const kycFlowRedirection = () =>{
            if(kyc_initiated){
                if(kyc_submitted){

                    if(userType === 'customer'){
                        history.push(routes.authRoutes.customerDashboard)
                    }else if(userType === 'advisor'){
                        if(!kyc_status ||  (kyc_status && kyc_status.toUpperCase() ==='PENDING')  ){
                            history.push(routes.authRoutes.advisorHome)
                        }else{
                            history.push(routes.authRoutes.advisorDashboard)
                        }

                    }

                }else{
                    if(userType === 'advisor'){  //TEMP CHANGE FOR DEMO
                        history.push(routes.authRoutes.advisorKyc)
                    }
                    if(userType === 'customer'){
                        history.push(routes.authRoutes.kycProcess)
                    }
                }
            }else{
                if(userType === 'advisor'){
                    history.push(routes.authRoutes.advisorKyc)
                }
                if(userType === 'customer'){
                    history.push(routes.authRoutes.kycProcess)
                }

            }
        }

        if(userType === "relationship_manager"){
            if(transitionInfo.status && transitionInfo.status.toLowerCase() === 'pending'){
                history.push(routes.authRoutes.rmNewPassword)
            }else{
                history.push(routes.authRoutes.rmDashboard)
            }

        }else{
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
        }
    }

    const outsideAuthApiEndpoints = React.useMemo(
        () => outsideAuthApi(),
        [outsideAuthApi, handleJSON]
    );

    const getUserDetails = (token, tokenExpiration, history) => {
        let transitionInfo = null;
        insideAuthApi({ Authorization: `JWT ${token}` }).getUserDetails()
            .then(res=>{
                setIsLoading(false)
                const userType = res.groups[0].name.toLowerCase().replace(/ /g,"_");
                if(userType !== "relationship_manager"){
                    transitionInfo = res[`${userType}_transition_info`]
                }else if(userType === "relationship_manager"){
                    transitionInfo = res["relationship_manager_details"];
                }
                updateLoggedInUserInfo({...res, token, tokenExpiration, userType, pendingAuth:false });
                redirectAfterUserAuth(userType,transitionInfo,history);

            })
            .catch((error)=>{
                Notification({type:'error',content:error.message})
                setIsLoading(false)
            })
    }


    const signIn = (payload,history) => outsideAuthApiEndpoints.signIn(payload)
        .then(res=>{
            const newUser = {email: payload.email, pendingAuth:true}
            localStorage.setItem('loggedInUser',JSON.stringify(newUser));
            //need of async await
            setLoggedInUser(newUser);
            history.push(routes.noAuthRoutes.signInVerification);
            setIsLoading(false)
        })

    const signInVerification = (payload,history) => outsideAuthApiEndpoints.signInVerification(payload)
        .then(res=>{
            getUserDetails(res.token, res['token_expiration'],history)
        })


    const signUp = (payload,history) => outsideAuthApiEndpoints.signUp(payload)
            .then(res=>{
                const user = {...res.data, pendingAuth:true}
                localStorage.setItem('loggedInUser',JSON.stringify(user));
                //need of async await
                setLoggedInUser(user);
                history.push(routes.noAuthRoutes.emailVerification);
                setIsLoading(false)
            })

    const verifyEmailAfterSignUp = (payload,history) => outsideAuthApiEndpoints.verifyEmail(payload)
        .then(res=>{
            getUserDetails(res.token, res['token_expiration'],history)
        })

    const updateLoggedInUserInfo = (updatedProps, appHistory) => { //accept only those key value pairs in object which need to be changed not whole
        if(updatedProps){
            let user = getSavedUserFromStorage();
            let updatedUser = {...user, ...updatedProps};
            setLoggedInUser(updatedUser);
            localStorage.setItem('loggedInUser',JSON.stringify(updatedUser));
        }
    }

    const clearLoggedInUserInfo = (appHistory) => { // Logout case
        setLoggedInUser(null);
        let rememberMeUser = localStorage.getItem("rememberMeUser");
        localStorage.clear();
        if(rememberMeUser){
            localStorage.setItem("rememberMeUser", rememberMeUser);
        }
        if(appHistory){  // for redirecting to logout
            appHistory.push(routes.noAuthRoutes.signIn);//need of async await
        }
    }


    const checkIfEmailRegistered = (emailParam) => outsideAuthApiEndpoints.checkIfEmailExists(emailParam)
    const forgotPassword = (payload) => outsideAuthApiEndpoints.forgotPassword(payload)
    const verifyForgotPassword = (payload) => outsideAuthApiEndpoints.verifyForgotPassword(payload)
    const resetPassword = (payload) => outsideAuthApiEndpoints.resetPassword(payload)
    const requestOTPSignIn = (payload) => outsideAuthApiEndpoints.requestOTPSignIn(payload)
    const requestOTPSignUp = (payload) => outsideAuthApiEndpoints.requestOTPSignUp(payload)
    const requestOTPResetPassword = (payload) => outsideAuthApiEndpoints.forgotPassword(payload)

    // const getAppConfig = () => outsideAuthApiEndpoints.getAppConfig()  //on hold
    //     .then((res)=>{
    //         console.log(res);
    //     }).catch((error)=>{
    //         console.log(error);
    //     })


    return (
        <AuthContext.Provider value={{
            loggedInUser,
            updateLoggedInUserInfo,
            clearLoggedInUserInfo,
            checkIfEmailRegistered,
            isLoading,
            signIn,
            signUp,
            verifyEmailAfterSignUp,
            signInVerification,
            forgotPassword,
            verifyForgotPassword,
            resetPassword,
            requestOTPSignIn,
            requestOTPSignUp,
            requestOTPResetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function createJSONHandler() {
    return async res => {
        // await handleErrorIfNeeded(signOutCallback, res); /// TO DO WHEN ERROR RESPONSE STRUCTURE IS DECIDED
        return res.data;  //res.json()
    };
}

// AuthProvider.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.array,
//
//     ])
// }

export const useAuth = () => React.useContext(AuthContext);
