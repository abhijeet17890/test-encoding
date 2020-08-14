export const API = {
    currentEnv: "dev", //   api server environment : <dev/qa/prod>
    baseUrls: {
        dev: "https://dev.services.globalise.co/api",
        qa: "https://test.services.globalise.co/api",
        prod: "",
    },
    tokenExpTimeErrorCode: "",
    encryptionEnabled: true, // Boolean, to disable or enable encryption, default true
    passPhrase: "30348dsd50a0-3f6d-49kjffg4545b-8ab0-8c2ae2d92ae0",
    encryptionBackendParams: { is_encryption_enabled: true },
    noAuthUrls: {
        getAppConfig: "/meta_app/app_config",
        getUserRoleList: "meta_app/user_roles",
        signIn: "/users/globalise_users/verify_login_credentials",
        signInVerification:
            "/users/globalise_users/verify_login_otp?version=1.1",
        requestOTPSignIn: "/users/globalise_users/request_verify_login_otp",
        signUp: "/users/globalise_users",
        searchEmailExists: "users/globalise_users/search_email_exists",
        verifyEmail:
            "/users/globalise_users/verify_account_activation_otp?version=1.1",
        requestOTPSignUp:
            "/users/globalise_users/request_account_activation_otp",
        forgotPassword: "/users/globalise_users/forgot_password",
        verifyForgotPassword:
            "/users/globalise_users/verify_forgot_password_otp",
        resetPassword: "/users/globalise_users/reset_password",
        requestOTPResetPassword: "/users/globalise_users/reset_password", // temp
    },
    authUrls: {
        // add the new api urls here which are inside the authentication
        getPlanList: "/account_plans/plans",
        payment: "/payments/payment",
        advisorSearch:
            "/advisors/advisor_details/advisor_search?status=Active&advisor_code=",
        rmCodeSearch:
            "/relationship_managers/relationship_manager_details/fetch_advisor_rm_detail?advisor_code=",
        selectAdvisor: "users/globalise_users/advisor_selection",
        signOut: "/user_activity/logout",
        getCountryList: "/kyc_meta_data/dw_countries",
        resendCodeInPhone:
            "/user_details/personal_details/request_mobile_verification_otp",
        verifyPhone: "/user_details/personal_details/verify_mobile_otp",
        getUserDetails: "/users/globalise_users/my_details",
        storeKycSteps: "/user_kyc/kyc_steps_update",
        getAllRM: "/relationship_managers/relationship_manager_details",
        getRM: "/relationship_managers/relationship_manager_details",
        kycDocument: "/user_kyc/documents",
        getKycData: "/user_kyc/customer_kyc_details",
        storeKycData: "/user_kyc/customer_kyc_details",
        getCity: "/kyc_meta_data/city",
        getRegion: "/kyc_meta_data/region",
        getPostalCode: "/kyc_meta_data/postal_code",
        getCustomerDropdowns: "/kyc_meta_data/customer_dropdowns",
        getCustomerKycDropdowns: "/kyc_meta_data/customer_dropdowns",
        submitCustomerKycDetails:
            "/user_kyc/customer_kyc_details/submit_customer_kyc_details",
        registerSelectFunds: "/user_activity/register_preferences",
        listUserPreferences: "user_activity/list_user_preferences",
        getInvestmentProfileDetails: "/user_kyc/investment_profile",
        InstrumentsSearch: "/instruments/all_instruments",
        SectorsList: "/instruments/all_sectors",
        recommendedPortfoliosList: "/user_activity/list_user_preferences",
        registerPortfolios: "/user_activity/register_preferences",
        productDetails: "/instruments/all_instruments",
        getClientList: "/advisors/advisor_details/advisor_client_list",
        accountsOverview: "/accounts/user_accounts/get_user_account_summary",
        getAdvisorAllGlobaliseCountries:
            "/kyc_meta_data/all_globalise_countries",
        getAdvisorDropdowns: "/kyc_meta_data/advisor_dropdowns",
        advisorKycDocuments: "/user_kyc/advisor_documents",
        submitAdvisorKycDetails:
            "/user_kyc/customer_kyc_details/submit_advisor_kyc_details",
        getChartData: "instruments/instrument_historical_chart?",
        recentViewedInstruments: "/user_activity/recent_viewed_instruments",
        stockMarketInfo: "/meta_app/stock_market_info",
        getAdvisorProfile: "/users/globalise_users/my_details",
        getInstrumentsMarketData: "/instruments/instrument_15min_delayed_info",
        getOrderTypeInfo: "/accounts/order_type",
        getTrasnactionHistory: "/accounts/account_transactions",
        getCreateOrder: "/accounts/orders/create_order",
        getConsolidateQuote: "/instruments/instrument_consolidate_quote",
        getOrderHistory: "/accounts/orders",
        getOrderType: "/accounts/order_type",
        cancelOrder:"/accounts/cancel_order",
        submitClientKycDetails:"/user_kyc/customer_kyc_details/submit_client_kyc_details",
        couponSearch: "/payments/coupon_search",
        getRemittanceBankDetails: "/money_transfer/remittance_bank_details",
        getUserAccounts: "/accounts/user_accounts",
        submitAddMoneyPickup: '/money_transfer/add_money',
        addMoney: "/money_transfer/add_money",
        cancelTransfer: '/money_transfer/add_money',
        emailInstructions:'/money_transfer/send_instruction_mail',
        confirmTransfer:'/money_transfer/add_money',
        pendingTransfer:'/money_transfer/add_money?status=Pending',
        updateCustomerDataSharing:'/user_kyc/customer_kyc_details/update_data_sharing',
        changeRMPassword: "/relationship_managers/relationship_manager_details/rm_change_password"
    }
};

// For dev builds --> https://dev.services.globalise.co/api
// For test builds --> https://test.services.globalise.co/api

//old
//dev: 'http://wm-dev-alb-1939039095.us-east-2.elb.amazonaws.com/api',
