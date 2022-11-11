import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border: 1px solid;
  border-color: #9829;
  border-collapse: collapse;
  border: 2px solid rgb(170 174 174 / 34%);
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

export { Table, TableAction, TableColumnHeader, TableColumn, TableButton, TableButtonIcon };
