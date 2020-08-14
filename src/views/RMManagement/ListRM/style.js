import styled from "styled-components";
import { Table, Row } from "antd";

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: ${(props) => props.theme.colors.tabUnderLine};
    font-size: ${(props) => props.theme.fontConfig.menuHeadingFontSize};
    color: ${(props) => props.theme.colors.btnTextColor};
  }
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${(props) => props.theme.colors.tabUnderLine};
  }

  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: ${(props) => props.theme.colors.stockMarketUp};
  }

  td.ant-table-column-sort {
    background: none;
  }

  .ant-table table {
    font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
    color: ${(props) => props.theme.colors.h2Color};
  }

  @media (max-width: 768px) {
    .ant-table-content {
      overflow: scroll;
    }
    .ant-table-thead > tr > th {
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    }
  }

  @media (max-width: 480px) {
    .ant-table-content {
      overflow: scroll;
    }
    .ant-table-thead > tr > th {
      font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
    }
  }
`;

export const RMContent = styled.div`
  margin: 24.5px 15.5px 21px 18.5px;

  @media (max-width: 480px) {
    margin: 30px 0px;
  }
`;

export const ButtonRow = styled(Row)`
  width: 272px;
`;
