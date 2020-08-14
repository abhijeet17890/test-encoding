import axios from 'axios';
import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';

import { API } from '../constants/api';
import { buildQuery, appendQryParamToUrl }  from '../utils/dataManipulation';



export const axiosObj =  info => {
    const { url, method, headers, data } = info;
    const enKey = getKey();
    function getKey(){
        const encryptedKey = sha256(API.passPhrase).toString();
        let seed = (encryptedKey.substring(0, (encryptedKey.length/2) ))
        return CryptoJS.enc.Utf8.parse(seed);
    }

    function encryptMessage(message, key){
        let iv  = CryptoJS.lib.WordArray.random(8);
        let cipherText = CryptoJS.AES.encrypt(iv + message, key, {
            iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return cipherText.toString();
    }

    function decryptMessage(message, key){
        let cipherText = CryptoJS.enc.Base64.parse(message);
        cipherText.words.splice(0, 4); // delete 4 words = 16 bytes
        cipherText.sigBytes -= 16;
        let decrypted = CryptoJS.AES.decrypt({ciphertext: cipherText}, key, {
            mode: CryptoJS.mode.ECB
        });
        return (decrypted.toString(CryptoJS.enc.Utf8))
    }

    const AxiosInstance = axios.create({
        baseURL: API.baseUrls[API.currentEnv],
        headers
    });

    AxiosInstance.interceptors.request.use(
        config => {
            if(API.encryptionEnabled){
                if(config.headers['Content-Type'] !== "multipart/form-data"){    //TEMP if condition , need to remove later
                    config.url =  appendQryParamToUrl(API.encryptionBackendParams,config.url);
                    config.data = {encrypted_data: encryptMessage(JSON.stringify(config.data), enKey)}
                }
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );

    AxiosInstance.interceptors.response.use(
        response =>{
            if(response.config.url.includes(buildQuery(API.encryptionBackendParams).replace("?",""))){
                let data = decryptMessage(response.data.encrypted_data,enKey)
                const parsedData = JSON.parse(data);
                return parsedData
            }else{
                return response.data
            }
        },  
        error => {
            if(error.response.config.url.includes(buildQuery(API.encryptionBackendParams).replace("?",""))){
                const decryptedErrorRes = decryptMessage(error.response.data.encrypted_data,enKey);
                const parsedErrorRes = JSON.parse(decryptedErrorRes)
                return Promise.reject(parsedErrorRes.errors[0]);
            }else{
                return Promise.reject(error.response.data.errors[0]);
            }
        }
    );

    return AxiosInstance({ url, method, headers, data });
};
