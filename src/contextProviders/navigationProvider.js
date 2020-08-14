import React, {useState} from "react";
export const NavigationContext = React.createContext();



export default function NavigationProvider({ routes, history, children }) {
    
     const restrictBackBtnAuthRoutes = [
        routes.authRoutes.planSelection,
        routes.authRoutes.planPurchaseSuccess,
        routes.authRoutes.advisorSelection,
        routes.authRoutes.kycProcess,
        routes.authRoutes.advisorKyc,
        routes.authRoutes.kycThankYou
    ];
    const restrictBackBtnNoAuthRoutes = [
        routes.noAuthRoutes.emailVerification,
        routes.noAuthRoutes.signInVerification,
        routes.noAuthRoutes.forgotPassword,
        routes.noAuthRoutes.resetPassVerification,
    ];

    const restrictBack = (authStatus,location, appHistory,eventListener) =>{
        if(!authStatus || (authStatus && !authStatus.loggedIn )){
            window.removeEventListener('popstate', eventListener);
            if (restrictBackBtnNoAuthRoutes.includes(location.pathname)) {
                // window.removeEventListener('popstate', eventListener);
                appHistory.go(1);
                // callback
            }
            // else{
            //     window.removeEventListener('popstate', eventListener);
            // }
        }else if(authStatus && authStatus.loggedIn ){
            window.removeEventListener('popstate', eventListener);
            if (restrictBackBtnAuthRoutes.includes(location.pathname)) {
                // window.removeEventListener('popstate', eventListener);
                appHistory.go(1);
                // callback
            }
            // else{
            //     window.removeEventListener('popstate', eventListener);
            // }
        }
    }
    function backBtnEvenListener(location, appHistory){

        let savedUser = localStorage.getItem("loggedInUser");
        if (savedUser) {
            savedUser = JSON.parse(savedUser);
            restrictBack({loggedIn:savedUser && savedUser.token},location, appHistory,backBtnEvenListener)
            // if (savedUser && savedUser.token) {
            //     restrictBack({loggedIn:true},location, appHistory,backBtnEvenListener)
            // }else{
            //     restrictBack({loggedIn:false},location, appHistory,backBtnEvenListener)
            // }
        }else{
            restrictBack(null,location, appHistory,backBtnEvenListener)
        }


    }
    const neutralizeOnClickBack = (location, appHistory,callback) => {
        window.addEventListener("popstate",()=> backBtnEvenListener(location, appHistory,callback));
    };


    return (
        <NavigationContext.Provider value={{ routes, history,neutralizeOnClickBack }}>{children}</NavigationContext.Provider>
    );
}

export const useNav = () => React.useContext(NavigationContext);
