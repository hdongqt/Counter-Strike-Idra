import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import * as TableStyle from "./Table.style";

const Table = ({ columns, payload, onChangePage, showPagination, loading }) => {
  const { data, pagination } = payload;
  const [pageCurrent, setPageCurrent] = useState(0);
  useEffect(() => {
    if (pagination) {
      setPageCurrent(pagination.currentPage);
    }
  }, [pagination]);

  return (
    <div>
      {!loading && (
        <>
          <TableStyle.Table>
            <thead>
              <tr>
                <TableStyle.TableColumnHeader width={"20px"}>
                  #
                </TableStyle.TableColumnHeader>
                {columns &&
                  columns.length &&
                  columns.map((column, index) => {
                    return (
                      <TableStyle.TableColumnHeader
                        key={index + "header"}
                        width={column?.width}
                      >
                        {column.title}
                      </TableStyle.TableColumnHeader>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {data && data?.length
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
                                      key={
                                        item.id + indexData + indexAction + "bt"
                                      }
                                      bgColor={action?.bgColor}
                                      onClick={() => {
                                        action.onClick(item);
                                      }}
                                    >
                                      <TableStyle.TableButtonIcon
                                        color={action?.color}
                                        className={
                                          action?.icon ? action.icon : ""
                                        }
                                      ></TableStyle.TableButtonIcon>
                                    </TableStyle.TableButton>
                                  );
                                })}
                              </TableStyle.TableColumn>
                            ) : (
                              <TableStyle.TableColumn
                                width={column?.width}
                                key={item.id + index + "td"}
                              >
                                {item[column.name]
                                  ? item[column.name]
                                  : column?.render
                                  ? column?.render(item)
                                  : ""}
                              </TableStyle.TableColumn>
                            );
                          })}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </TableStyle.Table>
          {showPagination && (
            <TableStyle.TablePaginationStyle>
              <ReactPaginate
                previousLabel={<i className="las la-angle-left"></i>}
                nextLabel={<i className="las la-angle-right"></i>}
                breakLabel={"..."}
                forcePage={pageCurrent}
                pageCount={Math.ceil(pagination?.totalPages)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={(value) => {
                  onChangePage(value.selected);
                }}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </TableStyle.TablePaginationStyle>
          )}
        </>
      )}
      {loading && (
        <TableStyle.TableLoading>
          <div className="loadingspinner"></div>
        </TableStyle.TableLoading>
      )}
    </div>
  );
};

export default Table;
