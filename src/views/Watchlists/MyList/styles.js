import styled from 'styled-components';
import { Input, Table, AutoComplete } from 'antd'; // Input Search used from antd, design diff from common Input.
import 'antd/dist/antd.css';

export const StyledA = styled.a`
    display: flex;
    align-items: center;
    text-decoration:none;
    color:#1d1d1d;
`;
export const Title = styled.div`
min-width:200px;
line-height:30px;    
`;
export const PreTitle = styled.div`
min-width:40px;
`;
export const Separator = styled.div`
margin:0 20px;
`;
export const Growth = styled.span`
color:#00b569;
`;
export const Decrement = styled.span`
color:#fd0d1b;
`;
export const StyledAutoComplete = styled(AutoComplete)`
    width:97%;
`;
export const StyledSearch = styled(Input.Search)`
    border-radius:6px;
    .ant-input-suffix{
        display:none;
    }
    
`;
export const StyledTable = styled(Table)`
    .ant-table-container table > thead > tr:first-child th{
        background-color:#3393D9;
        color:white;
        
    }
    .ant-table-column-sorter{
        color:white;
    }
    .ant-table-tbody{
        font-weight:500;
        // font-family: OpenSans;
        font-size: 16px;
    
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        
        color: #1d1d1d;
    }
    .ant-pagination{
        display:none;
    }
`;

