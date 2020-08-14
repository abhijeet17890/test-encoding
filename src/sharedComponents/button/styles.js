import styled from "styled-components";
import { Button } from "antd";

// import "antd/dist/antd.css";
const StyledButton = styled(Button)`
    padding: 0;
    width: ${({ size }) =>
        (size === "lg" && "380px") ||
        (size === "md-1" && "186px") ||
        (size === "md-2" && "181px") ||
        (size === "sm-1" && "114px") ||
        (size === "sm-2" && "95px")};

    height: ${({ size }) =>
        (size === "lg" && "57px") ||
        (size === "md-1" && "57px") ||
        (size === "md-2" && "42px") ||
        (size === "sm-1" && "36px") ||
        (size === "sm-2" && "36px")};

    background-color: ${({ outlined, theme }) =>
        (outlined && theme.colors.btnOutlinedBackgroundColor) ||
        theme.colors.btnLgBackground};

    color: ${({ outlined, size, theme }) =>
        outlined
            ? size === "md-1" || size === "md-2"
                ? `${theme.colors.btnOutlinedMdTextColor}`
                : `${theme.colors.btnOutlinedSmTextColor}`
            : `${theme.colors.btnTextColor}`};

    font-weight: 600;

    border: ${({ outlined, size, theme }) =>
        outlined
            ? size === "md-1" || size === "md-2"
                ? `2px solid ${theme.colors.btnMdBorder}`
                : `2px solid ${theme.colors.btnSmBorder}`
            : "none"};

    border-radius: ${({ size }) =>
        ((size === "lg" || size == "md-1") && "10px") ||
        (size === "md-2" && "6px") ||
        ((size === "sm-1" || size == "sm-2") && "5px")};

    font-size: ${({ size }) =>
        ((size === "lg" || size === "md-1") && "16px") ||
        ((size === "sm-1" || size === "sm-2" || size == "md-2") && "14px")};

    :disabled {
        background-color: ${(props) => props.theme.colors.btnDisableBackground};
        color: ${(props) => props.theme.colors.btnTextColor};
        border: none;
        :hover {
            background-color: ${(props) =>
                props.theme.colors.btnDisableBackground};
            color: ${(props) => props.theme.colors.btnTextColor};
        }
    }
    border-radius: ${({ customcornertype }) =>
        customcornertype === "round-corner" && "5px"};
    :hover,
    :focus {
        background-color: ${({ outlined, theme }) =>
            (outlined && theme.colors.btnOutlinedBackgroundColor) ||
            theme.colors.btnLgBackground};
        color: ${({ outlined, size, theme }) =>
            outlined
                ? size === "md-1" || size === "md-2"
                    ? `${theme.colors.btnOutlinedMdTextColor}`
                    : `${theme.colors.btnOutlinedSmTextColor}`
                : `${theme.colors.btnTextColor}`};
        border: ${({ outlined, size, theme }) =>
            outlined
                ? size === "md-1" || size === "md-2"
                    ? `2px solid ${theme.colors.btnMdBorder}`
                    : `2px solid ${theme.colors.btnSmBorder}`
                : "none"};
    }
`;

export default StyledButton;
