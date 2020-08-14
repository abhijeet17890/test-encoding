import React from 'react';
import StyledPageHeading from './styles';

export default function PageHeading(props){
    return(
        <StyledPageHeading>
            {props.title}
        </StyledPageHeading>
    );
}