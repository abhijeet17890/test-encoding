import styled from "styled-components";
import "antd/dist/antd.css";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

export const StyledFooter = styled(Footer)`
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    color: #ffffff;
    height: 55px;
    /* position: absolute; */
    /* margin-top: 64px; */
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: 10;
    span {
        display: contents;
        cursor: pointer;
        text-decoration: underline;
    }
`;
