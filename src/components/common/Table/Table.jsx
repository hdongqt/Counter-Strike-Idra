import React from "react";
import * as TableStyle from "./Table.style";

const Table = ({ columns, data }) => {
  return (
    <TableStyle.Table>
      <thead>
        <tr>
          <TableStyle.TableColumnHeader width={"20px"}>#</TableStyle.TableColumnHeader>
          {columns &&
            columns.length &&
            columns.map((column, index) => {
              return (
                <TableStyle.TableColumnHeader key={index + "header"} width={column?.width}>
                  {column.title}
                </TableStyle.TableColumnHeader>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {data && data.length
          ? data.map((item, indexData) => {
              return (
                <tr key={item.id}>
                  <td style={{ paddingLeft: "6px" }}>{indexData + 1}</td>
                  {columns &&
                    columns.map((column, index) => {
                      return column?.actions ? (
                        <TableStyle.TableColumn
                          className="action-column"
                          width={column?.width}
                          key={item.id + index + "td"}
                        >
                          {column.actions.map((action, indexAction) => {
                            return (
                              <TableStyle.TableButton
                                key={item.id + indexData + indexAction + "bt"}
                                bgColor={action?.bgColor}
                                onClick={() => {
                                  action.onClick(item);
                                }}
                              >
                                <TableStyle.TableButtonIcon
                                  color={action?.color}
                                  className={action?.icon ? action.icon : ""}
                                ></TableStyle.TableButtonIcon>
                              </TableStyle.TableButton>
                            );
                          })}
                        </TableStyle.TableColumn>
                      ) : (
                        <TableStyle.TableColumn width={column?.width} key={item.id + index + "td"}>
                          {item[column.name] ? item[column.name] : column?.render ? column?.render(item) : ""}
                        </TableStyle.TableColumn>
                      );
                    })}
                </tr>
              );
            })
          : null}
      </tbody>
    </TableStyle.Table>
  );
};

export default Table;
