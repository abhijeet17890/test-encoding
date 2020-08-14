import { API } from "../constants/api";
import { axiosObj } from "./axiosConfig";

const s = JSON.stringify;

const insideAuthApi = (AdditionalCommonHeaders, handlers) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };
    const formDataHeaders = {
        "Content-Type": "multipart/form-data",
    };
    return {
        getPlanList() {
            return axiosObj({
                //   example get api
                url: API.authUrls.getPlanList, // from api constants
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                // add or replace any extra header you can add above if you want (for ex in upload image: content type might be changed)
                // token and application/json will be added as default automatically for all inside authentication related api calls
            });
        },
        payment(payload) {
            return axiosObj({
                url: API.authUrls.payment, // from api constants
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        advisorSearch(advisorCode) {
            return axiosObj({
                url: API.authUrls.advisorSearch + `${advisorCode}`,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        rmCodeSearch(advisorCode) {
            return axiosObj({
                url: API.authUrls.rmCodeSearch + `${advisorCode}`,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        selectAdvisor(payload) {
            return axiosObj({
                url: API.authUrls.selectAdvisor,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        signOut() {
            return axiosObj({
                url: API.authUrls.signOut,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: {activity: "Logout"},
            });
        },
        getCountryList() {
            return axiosObj({
                url: API.authUrls.getCountryList + "?ordering=name",
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        resendCodeInPhone(values) {
            return axiosObj({
                url: API.authUrls.resendCodeInPhone,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        verifyPhone(values) {
            return axiosObj({
                url: API.authUrls.verifyPhone,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        getUserDetails(id, token) {
            if (id) {
                return axiosObj({
                    url: API.authUrls.getUserDetails + '?client_id=' + id,
                    method: "GET",
                    headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                });
            } else {
                return axiosObj({
                    url: API.authUrls.getUserDetails,
                    method: "GET",
                    headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                });
            }
        },

        getKycData(params) {
            return axiosObj({
                url: API.authUrls.getKycData + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        storeKycData(values) {
            return axiosObj({
                url: API.authUrls.storeKycData,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        updateKycData(values, params) {
            return axiosObj({
                url: API.authUrls.storeKycData + "/" + params,
                method: "PATCH",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        storeKycDocument(values) {
            return axiosObj({
                url: API.authUrls.kycDocument,
                method: "POST",
                headers: {...formDataHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        getKycDocument(params) {
            return axiosObj({
                url: API.authUrls.kycDocument + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        deleteKycDocument(id) {
            return axiosObj({
                url: API.authUrls.kycDocument + "/" + id,
                method: "DELETE",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getCity(params) {
            return axiosObj({
                url: API.authUrls.getCity + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getRegion(params) {
            return axiosObj({
                url: API.authUrls.getRegion + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getPostalCode(params) {
            return axiosObj({
                url: API.authUrls.getPostalCode + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        submitCustomerKycDetails(payload) {
            return axiosObj({
                url: API.authUrls.submitCustomerKycDetails,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        getCustomerKycDropdowns() {
            return axiosObj({
                url: API.authUrls.getCustomerKycDropdowns,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        InstrumentsSearch(data) {
            return axiosObj({
                url: API.authUrls.InstrumentsSearch + data,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        SectorsList() {
            return axiosObj({
                url: API.authUrls.SectorsList + "?ordering=name",
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getInvestmentProfileDetails(id) {
            if(id){
                return axiosObj({
                    url: API.authUrls.getInvestmentProfileDetails+'?client_id='+id,
                    method: "GET",
                    headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
                });
            }else{
            return axiosObj({
                url: API.authUrls.getInvestmentProfileDetails,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        }
        },
        recommendedPortfoliosList() { 
            return axiosObj({
                url: API.authUrls.recommendedPortfoliosList,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getRMList(params) {
            return axiosObj({
                url: API.authUrls.getAllRM + "?"+ params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getRM(id) {
            return axiosObj({
                url: API.authUrls.getAllRM + "/" + id,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        deactivateRM(id, payload) {
            return axiosObj({
                url: API.authUrls.getAllRM + "/" + id,
                method: "PATCH",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        deleteRM(id) {
            return axiosObj({
                url: API.authUrls.getAllRM + "/" + id + "/delete_rm",
                method: "PATCH",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        addRM(payload) {
            return axiosObj({
                url: API.authUrls.getAllRM,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        updateRM(id, payload) {
            return axiosObj({
                url: API.authUrls.getAllRM + "/" + id,
                method: "PATCH",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        registerPortfolios(data) {
            return axiosObj({
                url: API.authUrls.registerPortfolios,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: data,
            });
        },
        getClientList() {
            return axiosObj({
                url: API.authUrls.getClientList,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },

        registerSelectFunds(payload) {
            return axiosObj({
                url: API.authUrls.registerSelectFunds,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        getUserPreferences() {
            return axiosObj({
                url: API.authUrls.listUserPreferences,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getProductDetails(id) {
            return axiosObj({
                url: API.authUrls.productDetails + "/" + id,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },

        getAccountOverview() {
            return axiosObj({
                url: API.authUrls.accountsOverview + "?calculate_total=true",
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getChartData(symbol, start_date, end_date, compression = 0) {
            return axiosObj({
                url:
                    API.authUrls.getChartData +
                    `symbol=${symbol}&start_date=${start_date}&end_date=${end_date}&compression=${compression}`,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getAdvisorAllGlobaliseCountries(params) {
            return axiosObj({
                url:
                    API.authUrls.getAdvisorAllGlobaliseCountries + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getAdvisorDropdowns() {
            return axiosObj({
                url: API.authUrls.getAdvisorDropdowns,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        uploadAdvisorKycDocuments(values) {
            return axiosObj({
                url: API.authUrls.advisorKycDocuments,
                method: "POST",
                headers: {...formDataHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        getAdvisorKycDocument(params) {
            return axiosObj({
                url: API.authUrls.advisorKycDocuments + "?" + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        deleteAdvisorKycDocument(id) {
            return axiosObj({
                url: API.authUrls.advisorKycDocuments + "/" + id,
                method: "DELETE",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        submitAdvisorKycDetails(payload) {
            return axiosObj({
                url: API.authUrls.submitAdvisorKycDetails,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        showRecentViewed(type) {
            return axiosObj({
                url:
                    API.authUrls.recentViewedInstruments +
                    "?instrument_type=" +
                    type,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        showStockMarketInfo() {
            return axiosObj({
                url: API.authUrls.stockMarketInfo,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getAdvisorProfile() {
            return axiosObj({
                url: API.authUrls.getAdvisorProfile,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        ClientSearch(data) {
            return axiosObj({
                url: API.authUrls.getClientList + data,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getBuySellInfo() {
            return axiosObj({
                url: API.authUrls.accountsOverview + "?calculate_total=false",
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getTradeInfo(id) {
            return axiosObj({
                url: API.authUrls.getInstrumentsMarketData + "?symbols=" + id,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getClientDashboard(id) {
            return axiosObj({
                url:
                    API.authUrls.accountsOverview +
                    "?calculate_total=true&client_id=" +
                    id,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getOrderTypeInfo() {
            return axiosObj({
                url: API.authUrls.getOrderTypeInfo,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getTransactionHistory(id, data) {
            return axiosObj({
                url: API.authUrls.getTrasnactionHistory + "/" + id + data,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        coupon(otp) {
            return axiosObj({
                url: API.authUrls.couponSearch + `?coupon_code=${otp}`,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        createOrder(data) {
            return axiosObj({
                url: API.authUrls.getCreateOrder,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: data,
            });
        },
        getConsolidateQuote(data) {
            return axiosObj({
                url: API.authUrls.getConsolidateQuote + "?symbols=" + data,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getOrderHistory(params) {
            // '?g_status=PENDING'
            return axiosObj({
                url: API.authUrls.getOrderHistory + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getOrderType() {
            return axiosObj({
                url: API.authUrls.getOrderType,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        cancelOrder(id, payload) {
            return axiosObj({
                url: API.authUrls.getOrderHistory + "/" + id + "/cancel_order",
                method: "PUT",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        submitClientKycDetails(payload, params) {
            return axiosObj({
                url: API.authUrls.submitClientKycDetails + "?client_id=" + params,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        storeClientKycDocument(values, params) {
            return axiosObj({
                url: API.authUrls.kycDocument + "?client_id=" + params,
                method: "POST",
                headers: {...formDataHeaders, ...AdditionalCommonHeaders},
                data: values,
            });
        },
        calculateFeesApi(id, val) {
            return axiosObj({
                url: API.authUrls.calculateFees + "/" + id + '/calculate_fees_and_taxes?total_units=' + val,
                method: "GET",
                headers: {...formDataHeaders, ...AdditionalCommonHeaders},
            })
        },
        getClientOrderHistory(params) {
            return axiosObj({
                url: API.authUrls.getOrderHistory + params,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        getRemittanceBankDetails() {
            return axiosObj({
                url: API.authUrls.getRemittanceBankDetails,
                method: "GET",
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        getUserAccounts() {
            return axiosObj({
                url: API.authUrls.getUserAccounts,
                method: "GET",
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        getPortolioOverview(id){
            return axiosObj({
                url:API.authUrls.getUserAccounts+'/'+id+'/account_portfolio',
                method:'GET',
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        submitAddMoneyPickup(payload) {
            return axiosObj({
                url: API.authUrls.submitAddMoneyPickup,
                method: "POST",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
                data: payload,
            });
        },
        addMoney(payload) {
            return axiosObj({
                url: API.authUrls.addMoney,
                method: "POST",
                data: payload,
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        cancelTransfer(id,payload){
            return axiosObj({
                url:API.authUrls.cancelTransfer+'/'+id,
                method:'PATCH',
                data:payload,
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        emailInstructions(payload){
            return axiosObj({
                url:API.authUrls.emailInstructions,
                method:'POST',
                data:payload,
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        confirmTransfer(id, payload){
            return axiosObj({
                url:API.authUrls.confirmTransfer+'/'+id,
                method:'PATCH',
                data:payload,
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        pendingTransfer() {
            return axiosObj({
                url: API.authUrls.pendingTransfer,
                method: 'GET',
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        getClientTransactionHistory(id,data) {
            return axiosObj({
                url: API.authUrls.getTrasnactionHistory +"/"+id+ data,
                method: "GET",
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        getAccountDetails(params) {
            return axiosObj({
                url: API.authUrls.getUserAccounts + params,
                method: "GET",
                headers: { ...defaultHeaders, ...AdditionalCommonHeaders },
            });
        },
        getRMProfile() {
            return axiosObj({
                url: API.authUrls.getAdvisorProfile,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
        updateCustomerDataSharing(payload){
            return axiosObj({
                url:API.authUrls.updateCustomerDataSharing,
                method:'POST',
                data:payload,
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        changePasswordForRM(payload){
            return axiosObj({
                url:API.authUrls.changeRMPassword,
                method:'POST',
                data:payload,
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            })
        },
        getWithdrawalMoney(params) {
            return axiosObj({
                url: API.authUrls.accountsOverview,
                method: "GET",
                headers: {...defaultHeaders, ...AdditionalCommonHeaders},
            });
        },
    };
};
export default insideAuthApi;
