import React from 'react';
import * as S from './styles';

function GrayBtnText(props){
    return(
        <S.StyledBtnText {...props}>{props.children}</S.StyledBtnText>
    );
}
export default GrayBtnText;