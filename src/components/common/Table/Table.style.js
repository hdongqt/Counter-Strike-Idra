import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #ccc;
  & tr {
    &:nth-child(even) {
      background-color: rgb(250, 250, 250);
    }
    &:nth-child(odd) {
      background-color: rgb(245, 245, 245);
    }
  }
`;

const TableAction = styled.div`
  display: flex;
  gap: 6px;
  padding-left: 4px;
`;

const TableButton = styled.button`
  padding: 4px 6px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: rgb(64, 169, 255);
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  &:hover {
    opacity: 0.8;
    border: 1px solid #000;
  }
`;
const TableButtonIcon = styled.i`
  color: ${(props) => (props.color ? props.color : "#000")};
  font-size: 16px;
`;

const TableColumnHeader = styled.th`
  text-align: left;
  width: ${(props) => props.width && props.width};
  font-size: 16px;
  font-weight: 600;
  border: 1px solid rgb(190, 190, 190);
  padding: 10px 20px;
  background-color: rgb(235, 235, 235);
  word-break: break-word;
`;

const TableColumn = styled.td`
  width: ${(props) => props.width && props.width};
  text-align: left;
  font-size: 16px;
  padding: 10px 6px;
  word-break: break-word;
  &.action-column {
    display: flex;
    column-gap: 6px;
  }
`;

const TablePaginationStyle = styled.div`
  margin-top: 10px;
  & .pagination {
    margin: 15px auto;
    display: flex;
    justify-content: center;
    list-style: none;
    outline: none;
  }
  & .pagination > .active > a {
    background-color: #47ccde;
    border-color: #47ccde;
    color: #fff;
  }
  & .pagination > li > a {
    border: 1px solid #47ccde;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
  & .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    background-color: #47ccde;
    border-color: #47ccde;
    outline: none;
  }
  & .pagination > li > a,
  .pagination > li > span {
    color: #47ccde;
  }
  & .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }
`;
const TableLoading = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .loadingspinner {
    width: 56px;
    height: 56px;
    border: 5px solid #eee;
    border-top-color: #3e67ec;
    border-radius: 50%;
    animation: loadingspin 1.4s linear infinite;
  }
  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export {
  Table,
  TableAction,
  TableColumnHeader,
  TableColumn,
  TableButton,
  TableButtonIcon,
  TablePaginationStyle,
  TableLoading,
};
