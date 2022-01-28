// src/components/pagination.table.js
import React, { useState, useLayoutEffect, useEffect } from "react";

import {
  useTable,
  usePagination,
  useRowSelect,
  useRowState,
} from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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

function Table({ columns, data, getRowProps = () => ({}) }) {
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
    rowsById,
    rows,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination,
    useRowSelect
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
                <tr {...row.getRowProps(getRowProps(row))}>
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
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const data = localStorage.getItem("users");
    const id = sessionStorage.getItem("id");
    const res = await axios.get(
      "https://panteon-backend.herokuapp.com/api/leaderboard/" + id
    );
    const map1 = new Map();
    const map2 = new Map();
    JSON.parse(data).forEach((user) => {
      map1.set(user.id, user.rank);
    });
    console.log(map1);
    res.data.forEach((user, index) => {
      map2.set(user.id, user.rank);
    });
    const hashArr = [];
    map2.forEach((value, key) => {
      const diff = map1.get(key) - value;
      hashArr.push({ id: key, diff: diff });
    });

    const diffRankUsers = res.data.map((user, index) => {
      try {
        return Object.assign(user, hashArr[index]);
      } catch (err) {
        return user;
      }
    });

    localStorage.setItem("users", JSON.stringify(res.data));
    console.log(diffRankUsers);
    setUsers([...diffRankUsers]);

    /*  sessionStorage.setItem("users", JSON.stringify(res.data));
    const newData = sessionStorage.getItem("users");
    setUsers([...JSON.parse(newData)]); */

    return () => {
      localStorage.removeItem("users");
    };
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Rank List",
        columns: [
          {
            Header: "Rank",
            accessor: "rank",
            cellStyle: (state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  style: {
                    backgroundColor: rowInfo.row.rank == 1 ? "red" : null,
                  },
                };
              }
              return {};
            },
          },
          {
            Header: "Username",
            accessor: "id",
          },
          {
            Header: "Score",
            accessor: "score",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "Difference",
            accessor: "diff",
          },
        ],
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={users}
      getRowProps={(row) => ({
        style: {
          cursor: "pointer",
          color:
            row.values.diff > 0
              ? "green"
              : row.values.diff === 0
              ? "#cca221"
              : "red",
        },
      })}
    />
  );
}

export default LeaderBoard;
