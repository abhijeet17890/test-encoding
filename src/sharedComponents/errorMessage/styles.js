import styled from 'styled-components';


const StyledError = styled.h1`
    width:${props => props.fp? "20vw" : ''};
    font-weight:normal;
    font-size:14px;
    color:#fc0a0a;
    font-style:oblique;
    text-align: ${props => props.otp? "left" : "left"};
    padding-top:8px;
    margin-left:${props => (props.otp ? "15%" : (props.fp?"20px":'0px'))};
`;


export default StyledError;