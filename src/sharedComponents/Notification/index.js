import React, { useState } from "react";
import { message} from 'antd';
import * as S from "./style";


const success = {
    padding: '10px 0'
}

const error = {
    padding: '10px 0'
}

const warning = {
 padding: '10px 0'
}

const Notification = ({type, content}) => {
    return message[type]({
        content,
        style: {type}
    });
};

export default Notification;

// example use of this :    Notification({type: 'success/error/warning', content: 'some content"});
