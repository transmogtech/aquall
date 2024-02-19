import React, { useMemo, useState } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from "react-select";


const SearchTable = () => {
  const searchTable =
    [
      { id: "01", title: "How to control EHP in shrimp farming ? (Telugu)", url: "https://youtu.be/ChZeBq9I3xA", action: "01" },
      { id: "02", title: "Why the range of optimum water quality parameters differ among labs ? (English)	", url: "https://youtu.be/mFsLtVDmNoM", action: "02" },
      { id: "03", title: "Home Aquaculture – Farming Fish in Concrete Cement Tanks in your Backyard", url: "https://youtu.be/jRzh9rOx7eY",  action: "03" },
      
      { id: "04", title: "| Murrel Korameenu Fish Farming Information Guide |10TV	", url: "https://youtu.be/Z0HfVgzNDUU",  action: "04" },
      
      { id: "05", title: "Shrimp farming, lessons from 2020 and the way forward (Telugu)	", url: "https://youtu.be/Ezfkzwala10",  action: "05" },
      
      { id: "06", title: "How to control Microcystis / Blue green algae in Aquaculture ? (Telugu)	", url: "https://youtu.be/wmOlyBLaVVY",  action: "06" }
    ];
    
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
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Url",
        accessorKey: "url",
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
            <Link to={`/edit/youtube-video/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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