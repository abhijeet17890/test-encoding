import styled from 'styled-components';
import { Menu } from 'antd';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

export const StyledMenu = styled(Menu)`
    color: ${props=>props.theme.colors.h1Color};

    margin-top:10px;
    max-width:90%;

    font-size:${props=>props.theme.fontConfig.bodyTextFontSize};
    border-bottom: 0px;

    .ant-menu-item {
        padding: 0;
        margin: 0 20px;
       
    }
    .ant-menu-submenu{
        margin:0 20px;
    }

    .ant-menu-submenu:hover,
    .ant-menu-item-active,
    .ant-menu-submenu-active,
    .ant-menu-item-open,
    .ant-menu-submenu-open,
    .ant-menu-item-selected,
    .ant-menu-submenu-selected {
        border-bottom: 4px solid #1997fc;
        color: black;
        font-weight:normal;
  
    }
    .ant-menu-submenu {
        border-bottom:4px solid #bfbfbf;
    }


    .ant-menu-item:hover,
    .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
    .ant-menu-submenu-title:hover {
        font-weight:normal;
        color: black;
        border-bottom:4px solid #bfbfbf;
    }
    /* .ant-menu-submenu-active .ant-menu-submenu-title span */
    .ant-menu-item-selected {
        span:after {
            content: "";
            position: absolute;
            // bottom: 22px;
            left: 0;
            right: 0;
            background: #2c93d9;
            height: 4px;
            border-radius: 10px 10px 10px 10px;
            border-bottom: 4px solid #1997fc;
            display:none;
        }
    }


    .ant-menu-item {
        border-bottom: 4px solid #bfbfbf;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;

    }
    /* .ant-menu-submenu .ant-menu-submenu-title span a {
        color: black;
    } */
    .ant-menu-item:hover
    {   font-weight:normal;
        border-bottom:4px solid #bfbfbf;
    }
     .profile .ant-menu-item-active, 
    .profile .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, 
    .profile .ant-menu-submenu-active, .profile .ant-menu-submenu-title:hover {
        border-bottom:none;
    }
    .ant-menu-item-active,  .ant-menu-submenu-active,  .ant-menu-item-open, 
     .ant-menu-item-selected,  .ant-menu-submenu-selected {
         border-bottom:4px solid #1997fc;
         color:black;
        font-weight:600;

        &:hover{
         color:black;
        font-weight:600;
        }
       
     }

`;


export const StyledSubMenu = styled(SubMenu)`


`;
export const StyledMenuItem = styled(Menu.Item)``;
