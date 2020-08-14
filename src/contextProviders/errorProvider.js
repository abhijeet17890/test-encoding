import React from "react";

export const ErrorContext = React.createContext();
export const ErrorDispatchContext = React.createContext();

export default function ErrorProvider(props) {
    const [errors, setError] = React.useState([]);

    const errorDispatch = React.useCallback(
        message =>
            message === null
                ? setError([])
                : setError(state => [
                    ...state.slice(0, 4),
                    {
                        message,
                        timestamp: Date.now()
                    }
                ]),
        [setError]
    );

    return (
        <ErrorDispatchContext.Provider value={errorDispatch}>
            <ErrorContext.Provider value={errors}>{props.children}</ErrorContext.Provider>
        </ErrorDispatchContext.Provider>
    );
}

export const useErrorState = () => React.useContext(ErrorContext);
export const useErrorDispatch = () => React.useContext(ErrorDispatchContext);
export const useError = () => {
    const errorContext = React.useContext(ErrorContext);
    const errorDispatchContext = React.useContext(ErrorDispatchContext);
    return [errorContext, errorDispatchContext];
};
