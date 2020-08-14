import styled from 'styled-components';
import 'text-security/text-security.css';

//Global Styles not added 

export const Separator = styled.span`
    padding-left:20px;
`;
export const StyleOtpBoxes = {
    width:'36px', 
    height:'36px',
    borderRadius:'6px',
    border:' solid 0.3px rgba(112, 112, 112, 0.31)',
    color:'black',
    type:'text',
    webkitTextSecurity: 'square',
    mozTextSecurity: 'square' ,
    textSecurity:'square',
    marginTop: `40px`,
    /*fontFamily: 'text-security-disc',*/
    fontFamily: 'text-security-square'
/* Use -webkit-text-security if the browser supports it */
/*-webkit-text-security: disc;*/
};

export const ErrorStyle = {
    border:'solid 0.3px rgba(252, 10, 10, 0.35)', 
    color:'#fc0a0a',
}