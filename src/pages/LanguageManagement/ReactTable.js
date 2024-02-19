import React, { useMemo, useState } from 'react';
import TableContainer from '../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import ChangeStatus from './ChangeStatus';


const SearchTable = () => {
  const searchTable =
    [
      { id: "01", title: "Telugu", action: "01" },
      { id: "02", title: "English", action: "02" },
    ];

    
    const [modal_grid, setmodal_grid] = useState(false);

    function tog_grid() {
        setmodal_grid(!modal_grid);

        toast("Toast Duration 5s", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });

    }

  const durationnotify = () => toast("Toast Duration 5s", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });

  const [selectedSingle, setSelectedSingle] = useState(null);


  const [modal_center, setmodal_center] = useState(false);
  function tog_center() {
    setmodal_center(!modal_center);
  }

  const columns = useMemo(
    () => [
      {
        header: "ID",
        cell: (cell) => {
          return (
            <span className="fw-semibold">{cell.getValue()}</span>
          );
        },
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_grid(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
              <Link to={`/edit/language/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
              <Link onClick={() => tog_center(cell.getValue())} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
            </div>
          );
        },
      },
    ],
    []
  );


  return (
    <React.Fragment >
      <TableContainer
        columns={(columns || [])}
        data={(searchTable || [])}
        isGlobalFilter={true}
        customPageSize={5}
        SearchPlaceholder='Search...'
      />

     
<ChangeStatus modal_grid={modal_grid} />

      <Modal
        isOpen={modal_center}
        toggle={() => {
          tog_center();
        }}
        centered
      >
        <ModalHeader className="modal-title">
          Delete
        </ModalHeader>
        <ModalBody className="text-center p-5">
          <i className="mdi mdi-trash-can  mdi-48px mdi-spin text-danger"></i>
          <div className="mt-4">
            <h4 className="mb-3">Are you sure?</h4>
            <p className="text-muted mb-4"> You want to delete this record.</p>
            <div className="hstack gap-2 justify-content-center">
              <Button color="light" onClick={() => setmodal_center(false)}>Close</Button>
              <Link to="#" className="btn btn-danger">Delete</Link>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment >


  );
};



export { SearchTable };