// src/components/pagination.table.js
import React, { useState, useLayoutEffect } from "react";

import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
};

function Table({ columns, data }) {
  const windowWidth = useWindowWidth();
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1, pageSize: 5 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <div className="w-screen h-full">
      <div className="mx-48 mt-56">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
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
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        <ul className="pagination">
          <li
            className="page-item"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <a className="page-link">First</a>
          </li>
          <li
            className="page-item"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <a className="page-link">{"<"}</a>
          </li>
          <li
            className="page-item"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <a className="page-link">{">"}</a>
          </li>
          <li
            className="page-item"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <a className="page-link">Last</a>
          </li>
          <li>
            <a className="page-link h-9 p- text-center sm:text-sm w-24">
              <strong>
                {pageIndex + 1} - {pageOptions.length}
              </strong>{" "}
            </a>
          </li>

          {windowWidth > 854 && (
            <li>
              <a className="page-link h-9">
                <input
                  className="form-control text-center md:w-3 p-1"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ height: "36px" }}
                />
              </a>
            </li>
          )}
          {windowWidth > 1126 && (
            <select
              className="form-control w-28 h-9 text-center"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          )}
        </ul>
      </div>
    </div>
  );
}

function LeaderBoard() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Rank List",
        columns: [
          {
            Header: "Rank",
            accessor: "rank",
          },
          {
            Header: "Username",
            accessor: "username",
          },
          {
            Header: "Score",
            accessor: "score",
          },
          {
            Header: "Country",
            accessor: "country",
          },
        ],
      },
    ],
    []
  );

  const data = [
    {
      rank: 1,
      username: "John Doe",
      score: "100",
      country: "USA",
    },
    {
      firstName: "midnight-wad0y",
      lastName: "data-7h4xf",
      age: 1,
      visits: 56,
      progress: 15,
      status: "complicated",
    },
    {
      firstName: "tree-sbdb0",
      lastName: "friendship-w8535",
      age: 1,
      visits: 45,
      progress: 66,
      status: "single",
    },
    {
      firstName: "chin-borr8",
      lastName: "shirt-zox8m",
      age: 0,
      visits: 25,
      progress: 67,
      status: "complicated",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
    {
      firstName: "women-83ef0",
      lastName: "chalk-e8xbk",
      age: 9,
      visits: 28,
      progress: 23,
      status: "relationship",
    },
  ];
  console.log(JSON.stringify(data));

  return <Table columns={columns} data={data} />;
}

export default LeaderBoard;
