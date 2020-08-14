import { createGlobalStyle } from "styled-components";
import * as mainTheme from "./constants/mainTheme";

export const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    font-family: ${mainTheme.FONT_CONFIG.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${mainTheme.FONT_CONFIG.bodyTextFontSize};
    color: ${mainTheme.COLOR_PALETTE.bodyPrimaryTextColor};
    .google-visualization-tooltip {
    
    -webkit-box-shadow: -4px 24px 20px 1px rgba(204,202,204,1);
    -moz-box-shadow: -4px 24px 20px 1px rgba(204,202,204,1);
    box-shadow: -4px 24px 20px 1px rgba(204,202,204,1);
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    color: #1997fc;

    }
  
    .google-visualization-tooltip div {
      padding:5px;
    }
  }
  
  .ant-alert{
    width: fit-content;
    margin: 0 auto !important;
    border-radius: 6px;

    .ant-alert-message{
      color : #1d1d1d;
      //font-weight: bold;
      
    }
  }

  .ant-menu-submenu {
    background:transparent;
    position:fixed;
  }

  .headerMenu{
    top:70px!important;
  }

  .ant-menu-horizontal > .ant-menu-item a {
        color: black;
        :hover {
            color: black;
        }
    }

    .ant-menu-horizontal > .ant-menu-item-selected.ant-menu-item-selected a {
    color: #1997fc;
}

.ant-select-item-option-content {
  font-size: ${mainTheme.FONT_CONFIG.bodyTextFontSize};
}


  .ant-menu-submenu-popup > .ant-menu {
    
    border:1px solid #c6c8c7;
    padding:10px;
    border-radius:10px;
    -webkit-box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);
    -moz-box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);
    box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);
    li{
      border-bottom:1px solid #d9d9d9;
      a {
        color:black;
      }
    }
    li:last-child{
      border-bottom:0;
      }
  }
  .kyc-dropdown .ant-select-item-option-content .risk-title {
    font-weight: 600;
    margin-bottom: 4px;
  }
  

  /* Select Dropdown*/
  .ant-select-dropdown {
    border-radius:0 0 6px 6px;
    border: 1px solid #d9d9d9;
    -webkit-box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);
    -moz-box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);
    box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.20);    
  }
 
/* .ant-select-dropdown > div > div:nth-child(2) {
      overflow-y:scroll !important;
      ::-webkit-scrollbar-thumb {
        max-height:15px;
      } 
}  */


  .ant-select-item {
    padding:20px 15px;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height:36px;
  }

  .ant-select-item-option-content {
    white-space: break-spaces;
  }

 /* This code is to hide the verticle scroll bar in slect dropdowns */
  /* .ant-select-dropdown  div { 
    ::-webkit-scrollbar { 
      width: 0px;
    }
  } */
  
  .ant-select-item-option-active.ant-select-item-option-active.ant-select-item-option-active {
    background-color:#f0f4fa;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
     input:-webkit-autofill:active { 
        -webkit-background-clip: text;
        font-size: ${mainTheme.FONT_CONFIG.bodyTextFontSize} !important;
    }

  .ant-table-wrapper .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-table-wrapper .ant-pagination-item,
  .ant-table-wrapper .ant-pagination-prev .ant-pagination-item-link,
  .ant-table-wrapper .ant-pagination-next .ant-pagination-item-link {
    border: 1px solid ${mainTheme.COLOR_PALETTE.normalInputBorder};
    border-radius: ${mainTheme.GENERAL_CONFIG.btnSm1BorderRadius};
  }

  .ant-table-wrapper .ant-select-selection-item {
    top: -3px;
  }

  .ant-table-wrapper .ant-pagination-item-active {
    border-color: ${mainTheme.COLOR_PALETTE.btnLgBackground};
    color: ${mainTheme.COLOR_PALETTE.btnLgBackground};
  }
  .ant-table-wrapper .ant-pagination-item-active a{
    color: ${mainTheme.COLOR_PALETTE.btnLgBackground};
  }
  
`;
