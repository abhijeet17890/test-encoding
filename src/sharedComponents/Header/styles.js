import styled from "styled-components";
import { Layout, Menu, Col } from "antd";
import "antd/dist/antd.css";
import mainLogo from "../../assets/mainLogo.png";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export const StyledLayout = styled(Layout)`
    background: #ffffff;
`;
export const StyledHeader = styled(Header)`
    background: #ffffff;
    height: 82px;
    border-bottom: 1.5px solid #7070704f;
    position: fixed;
    z-index: 99;
    width: 100%;
    top: 0px;
`;

export const StyledMenuItem = styled(Menu.Item)`
    a {
        color: ${(props) =>
            props.kycPending
                ? props.theme.colors.disableTextColor + "!important"
                : "black !important"};
    }
    pointer-events: ${(props) => (props.kycPending ? "none" : "")};
    &.selectedMenu {
        div {
            display: block;
        }
    }
`;

export const StyledSubMenuItem = styled(Menu.Item)`
    pointer-events: ${(props) => (props.kycPending ? "none" : "")};
    a {
        color: red !important;
    }
`;

export const StyledCol = styled(Col)`
    display: flex;
    align-items: center;
`;

export const Logo = styled.div`
    background-image: url(${mainLogo});
    height: 82px;
    width: 195px;
    background-size: cover;
`;

export const StyledMenu = styled(Menu)`
    color: black;

    font-size: 16px;
    border-bottom: 0px;

    .ant-menu-item {
        padding: 0;
        margin: 0 20px;
        border-bottom: 1px solid black;
    }
    .ant-menu-item:hover,
    .ant-menu-submenu:hover,
    .ant-menu-item-active,
    .ant-menu-submenu-active,
    .ant-menu-item-open,
    .ant-menu-submenu-open,
    .ant-menu-item-selected,
    .ant-menu-submenu-selected {
        border-bottom: 0px;
        color: black;
    }
    .ant-menu-item {
        transition: none;
    }
    .ant-menu-item:hover,
    .ant-menu-item-active,
    .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
    .ant-menu-submenu-active,
    .ant-menu-submenu-title:hover {
        color: black;
    }
    /* .ant-menu-submenu-active .ant-menu-submenu-title span */
    .ant-menu-item-selected {
        span:after {
            content: "";
            position: absolute;
            bottom: 12px;
            left: 0;
            right: 0;
            background: #2c93d9;
            height: 4px;
            border-radius: 10px 10px 10px 10px;
        }
    }

    .ant-menu-submenu,
    .ant-menu-item {
        border-bottom: 0;
    }
    /* .ant-menu-submenu .ant-menu-submenu-title span a {
        color: black;
    } */
`;

export const StyledSubMenu = styled(SubMenu)`
    border-bottom: 0px;
     span a {
        color:black; /*${(props) =>
            props.currentmenu ? "#1997fc" : "black"};*/
    } 
    &.selectedMenu {
        div{
            span{
                /* a{
                    color:#1997fc!important;
                } */
                div {
                    display:block;
                }
            }
        }
    }
    .ant-menu-submenu.ant-menu-submenu {
        border-bottom: 0px;
    }

    span {
        :hover {
            div {
                display: block;
            }
        }
    }
`;

export const StyledContent = styled(Content)`
    margin: 100px 0 100px 0;
`;

const underlineCSS = `
    border-radius: 50px;
    position: absolute;
    background: #0097ff;
    display: none;
    height: 4px;
    top: 45px;
`;

export const DashboardUnderline = styled.div`
    ${underlineCSS}
    width: 83px;
`;

export const InvestUnderline = styled.div`
    ${underlineCSS}
    width: 46px;
`;

export const PortfolioUnderline = styled.div`
    ${underlineCSS}
    width: 65px;
`;

export const TransferMoneyUnderline = styled.div`
    ${underlineCSS}
    width: 119px;
`;

export const MyAccountUnderline = styled.div`
    ${underlineCSS}
    width: 87px;
`;

export const ClientsUnderline = styled.div`
    ${underlineCSS}
    width: 52px;
`;

export const ResearchUnderline = styled.div`
    ${underlineCSS}
    width: 69px;
`;

export const ReportsUnderline = styled.div`
    ${underlineCSS}
    width: 59px;
`;

export const AdminUnderline = styled.div`
    ${underlineCSS}
    width: 49px;
`;

export const TitleSpan = styled.span`
    display: flex;
`;
