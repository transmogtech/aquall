import React, { useMemo, useState } from 'react';
import TableContainer from '../../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import Select from "react-select";


const SearchTable = () => {
  const searchTable =
    [
      { id: "01", hp_size: "2-Hp", company: "emp DRIVES	", type: "2,4 AND 6	", action: "01" },
      { id: "02", hp_size: "1-Hp", company: "emp DRIVES	", type: "2,4 AND 6	", action: "02" },
      { id: "03", hp_size: "3-Hp", company: "emp DRIVES	", type: "2,4 AND 6	", action: "03" },
      { id: "04", hp_size: "Spare Parts", company: "sai aqua tech	", type: "Float", action: "04" },
    ];
    
    const [modal_grid, setmodal_grid] = useState(false);
    const [selectedSingle, setSelectedSingle] = useState(null);
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [selectedHpSize, setSelectedHpSize] = useState(null);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

    const [create_culture_type, setcreate_culture_type] = useState(false);

    function toggle_create() {
      setcreate_culture_type(!create_culture_type);
  }
    const [modal_center, setmodal_center] = useState(false);
    function tog_center() {
        setmodal_center(!modal_center);
    }

    function handleSelectSingle(selectedSingle) {
      setSelectedSingle(selectedSingle);
  }

  
  function handleSelectedCompanies(selectedCompanies) {
    setSelectedCompanies(selectedCompanies);
}


function handleSelectedHpSize(selectedHpSize) {
  setSelectedHpSize(selectedHpSize);
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
        header: "HP Size",
        accessorKey: "hp_size",
        enableColumnFilter: false,
      },
      {
        header: "Company Name",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "Peddler Type",
        accessorKey: "type",
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
            <Link to='#!' onClick={() => toggle_create(true)} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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


const Companies = [
  { value: 'emp DRIVES', label: 'emp DRIVES	' },
  { value: 'emp DRIVES', label: 'emp DRIVES	' },
  { value: 'sagaraquaculturepvtltd', label: 'sagaraquaculturepvtltd' },
  { value: 'geekay hatcheries pvt.ltd	', label: 'geekay hatcheries pvt.ltd	' },
  { value: 'Aqua Bros International Pvt Ltd	', label: 'Aqua Bros International Pvt Ltd	' }
];


const HpSize = [
  { value: '1-Hp	', label: '1-Hp	' },
  { value: '2-Hp	', label: '2-Hp	' },
  { value: '3-Hp	', label: '3-Hp	' },
  { value: 'Spare Parts', label: 'Spare Parts' }
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
                isOpen={create_culture_type}
                toggle={() => {
                    toggle_create();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    toggle_create();
                }}>
                    Edit Peddler Type

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">HP Size</label>
                                    <Select value={selectedHpSize}  onChange={() => {  handleSelectedHpSize(); }}  options={HpSize}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Company Name</label>
                                    <Select value={selectedCompanies}  onChange={() => {  handleSelectedCompanies(); }}  options={Companies}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Peddler Type</label>
                                    <Input type="text" className="form-control" id="name" placeholder="Name" defaultValue="Vannamei" />
                                </div>
                            </Col>
                
                            <Col lg={12}>
                                <div className="hstack gap-2 justify-content-end">
                                    <Button color="light" onClick={() => setcreate_culture_type(false)}>Close</Button>
                                    <Button color="primary" onClick={() => setcreate_culture_type(false)} >Submit</Button>
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