import React, { useMemo } from "react";

import { useTable, useGlobalFilter, useFilters } from "react-table";

import MOCK_DATA from "./MOCK_DATA.json";

import { COLUMNS } from "./columns";

import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

export const FilteringTable = () => {
  // useMemo hook ensures that data is not re-created on every render => better component performance
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  //   destructuring properties and methods from the table instance => functions and arrays that the useTable hook from react table package has given to us to enable easy table creation
  //   All of these need to be used with our html for our react table to work as intended
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  //   destructuring global filter from state:
  const { globalFilter } = state;
  return (
    <>
      {/* // getTableProps needs to be destructured at the table tag: */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
