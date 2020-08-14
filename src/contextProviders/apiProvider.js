import React from "react";

import {useAuth} from "./authProvider";
const ApiContext = React.createContext({});

export default function ApiProvider({ insideAuthApi, onSignOut = () => {}, children }) {
    const { loggedInUser } = useAuth();
    const accessToken = loggedInUser && loggedInUser.token;
    const handleJSON = React.useMemo(() => createJSONHandler(onSignOut), [onSignOut]);

    const AdditionalCommonHeaders = React.useMemo(
        () =>
            ({
                ...(accessToken ? { Authorization: `JWT ${accessToken}` } : {})
            }),
        [accessToken]
    );

    const inSideAuthAPIEndpoints = React.useMemo(
        () => {
            return insideAuthApi(AdditionalCommonHeaders, handleJSON)
        },
        [insideAuthApi, AdditionalCommonHeaders, handleJSON]
    );

    const connectWithApi = () => inSideAuthAPIEndpoints
    return <ApiContext.Provider value={{connectWithApi}}>{children}</ApiContext.Provider>;
}

export const useInsideAuthApi = () => React.useContext(ApiContext);

function createJSONHandler(signOutCallback) { // might need later
    return async res => {
        // await handleErrorIfNeeded(signOutCallback, res); /// TO DO WHEN ERROR RESPONSE STRUCTURE IS DECIDED
        return res.data;  //res.json()
    };
}

async function handleErrorIfNeeded(signOutCallback, res) { // might need later
    if (res.status === 401) {
        signOutCallback();
    }

    if (res.status >= 400) {
        const message = await res.text();
        throw new ApiError(res.status, message);
    }
}

export class ApiError extends Error { // might need later
    constructor(code, originalMessage) {
        let message = originalMessage;
        let validationErrors = [];
        try {
            const parsedMessage = JSON.parse(originalMessage);
            if (parsedMessage.validationErrors) {

                // validationErrors = parseValidationErrors(parsedMessage.validationErrors);
                message = "Invalid request";
            }
        } catch (e) {
            // nothing to do
        }
        super(message);
        this.code = code;
        this.validationErrors = validationErrors;
    }
}

function parseValidationErrors(validationErrors) { // might need later
    let acc = [];
    for (const error of validationErrors) {
        acc = [...acc, ...Object.values(error.constraints || {})];
        if (error.children.length) {
            acc = acc.concat(parseValidationErrors(error.children));
        }
    }
    return acc;
}

