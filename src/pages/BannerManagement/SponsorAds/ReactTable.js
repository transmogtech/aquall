import React, { useMemo, useState } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from "react-select";


const SearchTable = () => {
  const searchTable =
    [
      { id: "01", image: "https://www.aquall.in/assets/images/banners/281837d5c919e13c916e31a18d07628f.png", name: "Sponsor 1", discount: "20%", action: "01" },
      { id: "02", image: "https://www.aquall.in/assets/images/banners/fe0fa7bdf486d388e374f26369bea18e.png", name: "Sponsor 2",discount: "30%",  action: "02" },
      { id: "03", image: "https://www.aquall.in/assets/images/banners/b0aa6738366803688528dba2c956b9eb.png", name: "Sponsor 3", discount: "20%", action: "03" },
    ]
    
    const [modal_grid, setmodal_grid] = useState(false);
    const [selectedSingle, setSelectedSingle] = useState(null);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

    
    const [modal_center, setmodal_center] = useState(false);
    function tog_center() {
        setmodal_center(!modal_center);
    }

    function handleSelectSingle(selectedSingle) {
      setSelectedSingle(selectedSingle);
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
        header: "Image",
        accessorKey: "image",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <img src={cell.getValue()} width="50" />
          );
        },
      },
       
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
       
      {
        header: "Discount",
        accessorKey: "discount",
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
            <Link to={`/edit/sponsor-ad/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
            <Link onClick={() => tog_center(cell.getValue())} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
            </div>
          );
        },
      },
    ],
    []
  );

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' }
];

  return (
    <React.Fragment >
      <TableContainer
        columns={(columns || [])}
        data={(searchTable || [])}
        isGlobalFilter={true}
        customPageSize={5}
        SearchPlaceholder='Search...'
      />

<Modal
                isOpen={modal_grid}
                toggle={() => {
                    tog_grid();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    tog_grid();
                }}>
                    Status

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Status</label>
                                    <Select value={selectedSingle}  onChange={() => {  handleSelectSingle(); }}  options={statusOptions}  />
                                </div>
                            </Col>
                
                            <Col xxl={12}>
                                <label htmlFor="passwordInput" className="form-label">Comment</label>
                                <textarea className="form-control" placeholder="Enter Comment" id="comment" rows="3"></textarea>
                            </Col>
                            <Col lg={12}>
                                <div className="hstack gap-2 justify-content-end">
                                    <Button color="light" onClick={() => setmodal_grid(false)}>Close</Button>
                                    <Button color="primary" onClick={() => setmodal_grid(false)} >Submit</Button>
                                </div>
                            </Col>
                        </div>
                    </form>
                </ModalBody>
            </Modal>


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



export {  SearchTable };