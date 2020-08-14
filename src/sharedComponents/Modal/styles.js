import styled from "styled-components";
import { Modal } from "antd";

export const CustomModal = styled(Modal)`
    .ant-modal-footer{
         border-top:0;
         text-align:center;
         padding-bottom: 1.5rem;
     };
    .ant-modal-header{ //check
      border-radius:7px 7px 0 0;
    }
    .ant-modal-mask{
      transition-timing-function: ease;
    }
    .ant-modal-content{
         border-radius:7px;
    }
   
`;


// ${props => props.theme.colors.switchBtnCloseCircleBackground};
// .ant-modal-footer{
//     border-top:0;
//     text-align:center;
// };
// .ant-modal-header{ //check
//     border-radius:10px 10px 0 0;
// }
// .ant-modal-mask{
//     transition-timing-function: ease;
// }
// .ant-modal-content{
//     height:365px;
//     border-radius:10px;
// }
// .ant-modal-body{
//     height:211px;
// }
// do-not-remove-code
// &.ant-modal-wrap .custom-modal-main{
// .ant-modal-footer{
//         text-align: center;
//     }
// }