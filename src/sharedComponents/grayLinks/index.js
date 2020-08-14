import React from 'react';
import * as S from './styles';

function GrayLinks(props){
    return(
        <S.StyledLink to={props.link}>{props.children}</S.StyledLink>
    );
}
export default GrayLinks;