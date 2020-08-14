import { API } from "../constants/api";
import { axiosObj } from "../services/axiosConfig";

const outsideAuthApi = (handlers) => {
    const defaultHeaders ={
        'Content-Type': 'application/json'
    }

    return {
        getAppConfig(){
            return axiosObj({
                url: API.noAuthUrls.getAppConfig,
                method: "GET",
                headers: {...defaultHeaders},
            });
        },
        getUserRoleList(){
            return axiosObj({
                url: API.noAuthUrls.getUserRoleList,
                method: "GET",
                headers: {...defaultHeaders},
            });
        },
        signUp(values) {
            return axiosObj({
                url: API.noAuthUrls.signUp,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        verifyEmail(values) {
            return axiosObj({
                url: API.noAuthUrls.verifyEmail,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        signIn(values) {
            return axiosObj({
                url: API.noAuthUrls.signIn,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        signInVerification(values) {
            return axiosObj({
                url: API.noAuthUrls.signInVerification,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        checkIfEmailExists(values){
            return axiosObj({
                url: API.noAuthUrls.searchEmailExists+values,
                method: "GET",
                headers: {...defaultHeaders}
            });
        },
        forgotPassword(values){
            return axiosObj({
                url: API.noAuthUrls.forgotPassword,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        verifyForgotPassword(values){
            return axiosObj({
                url: API.noAuthUrls.verifyForgotPassword,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        resetPassword(values){
            return axiosObj({
                url: API.noAuthUrls.resetPassword,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },

        requestOTPSignIn(values){
            return axiosObj({
                url: API.noAuthUrls.requestOTPSignIn,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        requestOTPSignUp(values){
            return axiosObj({
                url: API.noAuthUrls.requestOTPSignUp,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },
        requestOTPResetPassword(values){
            return axiosObj({
                url: API.noAuthUrls.requestOTPResetPassword,
                method: "POST",
                headers: {...defaultHeaders},
                data: values
            });
        },


    }
}

export default outsideAuthApi