import React, { Fragment, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";

import {
  Column,
  Table as ReactTable,
  ColumnFiltersState,
  FilterFn,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';



// Column Filter
const Filter = ({
  column,
  table
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={value => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input {...props} value={value} id="search-bar-0" className="form-control border-0 search" onChange={e => setValue(e.target.value)} />
  );
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,

}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(data.length <= 10 ? data.length : 10);

  // Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,

    setPageIndex,
    setPageSize,
    getState,
    getPageCount
  } = table;

  useEffect(() => {
    (customPageSize) && setPageSize((customPageSize));
  }, [customPageSize, setPageSize]);

  const onPageChangeFun = (currentPage) => {
    // nextPage();
    setPageIndex(currentPage);
    const newStart = currentPage * getState().pagination.pageSize + 1;
    const newEnd = newStart + getState().pagination.pageSize - 1;
    setStart(newStart);

    if (newEnd > data.length) {
      setEnd(data.length);

    } else {
      setEnd(newEnd);

    }
  }

  return (
    <Fragment>
      {isGlobalFilter && <Row className="mb-3">
        <CardBody className="border border-dashed border-end-0 border-start-0">
          <form>
            <Row>
              <Col sm={5}>
                <div className="search-box me-2 mb-2 d-inline-block col-12">
                  <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter((value))}
                    placeholder={SearchPlaceholder}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Row>}


      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={thClass}  {...{
                    onClick: header.column.getToggleSortingHandler(),
                  }}>
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' ',
                          desc: ' ',
                        }
                        [header.column.getIsSorted()] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
        <div className="col-sm">
          {/* <div className="text-muted">
            <span className="fw-semibold ms-1">  Page {parseInt(getState().pagination.pageIndex + 1)}</span> of <span className="fw-semibold">{getPageCount().toLocaleString()}</span>

            <span className="flex items-center gap-1">
              {" "} | Go to page:
              <input
                type="number"
                min="1"
                max={getPageCount()}
                defaultValue={getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  setPageIndex(page)
                }}
                className="border p-1 rounded w-16 text-center"
              />
            </span>
          </div> */}

          <div className="text-muted"> <span>Showing<span className="fw-semibold ms-1">{start}</span> to <span className="fw-semibold ms-1">{end}</span> of <span className="fw-semibold">{data.length}</span> Results </span>
            <span className="flex items-center gap-1">
              {" "} | Go to page:
              <input
                type="number"
                min="1"
                max={getPageCount()}
                defaultValue={getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  onPageChangeFun(page)
                }}
                className="border p-1 rounded w-16 text-center"
              />
            </span>
          </div>
        </div>
        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md justify-content-center align-item-center mb-0 flex-wrap">
            <li className={!getCanPreviousPage() ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={() => onPageChangeFun(0)}> {'<<'} </Link>
            </li>
            <li className={!getCanPreviousPage() ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={() => onPageChangeFun(parseInt(getState().pagination.pageIndex - 1))}>Previous</Link>
            </li>
            {/* {getPageOptions().map((item, key) => (
              <React.Fragment key={key}>
                <li className="page-item">
                  <Link to="#" className={getState().pagination.pageIndex === item ? "page-link active" : "page-link"} onClick={() => setPageIndex(item)}>{item + 1}</Link>
                </li>
              </React.Fragment>
            ))} */}
            <li className={!getCanNextPage() ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={() => onPageChangeFun(parseInt(getState().pagination.pageIndex + 1))}>Next</Link>
            </li>
            <li className={!getCanNextPage() ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={() => onPageChangeFun(getPageCount() - 1)}> {'>>'} </Link>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

export default TableContainer;