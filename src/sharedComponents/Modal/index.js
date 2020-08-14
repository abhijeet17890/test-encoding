import React from "react";
import { CustomModal } from "./styles";

const basicWidth = 'fit-content'
export const Modal = (props) => (
        <CustomModal  maskStyle= {{backgroundColor:'rgba(2, 39, 76, 0.73)'}} swrapClassName='custom-modal-main' {...props} />
);
// width={props.width?props.width:basicWidth}