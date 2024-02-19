import React, { useMemo, useState } from 'react';
import TableContainer from '../../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import Select from "react-select";


const SearchTable = () => {
  const searchTable =
  [
    { id: "01", culture_type: "Vannamei", company: "RNK Agro Chemicals Ltd", type: "Crumble", salt: "5 to 35", action: "01" },
    { id: "02", culture_type: "Vannamei", company: "RNK Agro Chemicals Ltd", type: "Pellet", salt: "0-30", action: "02" },
    { id: "03", culture_type: "Vannamei", company: "VAM Life Science (P).Ltd", type: "Crumble", salt: "0 to 35", action: "03" },
    { id: "04", culture_type: "Vannamei", company: "VAM Life Science (P).Ltd	", type: "Pellet", salt: "5 to 35", action: "04" },
  ];
    
    const [modal_grid, setmodal_grid] = useState(false);
    const [selectedSingle, setSelectedSingle] = useState(null);

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
  
  const [selectedCompany, setSelectedCompany] = useState(false);
    function handleSelectCompany(selectedCompany) {
      setSelectedCompany(selectedCompany);
    }

    const [selectedCultureType, setSelectedCultureType] = useState(false);
    function handleSelectCultureType(selectedCultureType) {
      setSelectedCultureType(selectedCultureType);
    }
    

    const [selectPlStage, setSelectPlStage] = useState(false);

    function handleSelectPlStage(selectPlStage) {
      setSelectPlStage(selectPlStage);
    }
    
    
const culture_type = [
  { value: 'Vannamei', label: 'Vannamei' },
  { value: 'Black Tiger', label: 'Black Tiger' },
  { value: 'fish', label: 'fish' },
  { value: 'Carb', label: 'Carb' },
];


const company = [
  { value: 'RNK Agro Chemicals Ltd	', label: 'RNK Agro Chemicals Ltd	' },
  { value: 'VAM Life Science (P).Ltd	', label: 'VAM Life Science (P).Ltd	' },
  { value: 'BMR Group	', label: 'BMR Group	' },

  { value: 'Devi Feeds Private Limited	', label: 'Devi Feeds Private Limited	' },

];


const pl_stages = [
  { value: '9 TO 12	', label: '9 TO 12		' },
  { value: '6 to 12 days ', label: '6 to 12 days ' },
  
  ];
  
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
        header: "Culture Type",
        accessorKey: "culture_type",
        enableColumnFilter: false,
      },
      {
        header: "Company Name",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "PL Stage",
        accessorKey: "type",
        enableColumnFilter: false,
      },
      {
        header: "Salt Percentage",
        accessorKey: "salt",
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
                    Edit Salt Percentage

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                        <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Culture Type</label>
                                    <Select value={selectedCultureType}  onChange={() => {  handleSelectCultureType(); }}  options={culture_type}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Company Name</label>
                                    <Select value={selectedCompany}  onChange={() => {  handleSelectCompany(); }}  options={company}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">PL Stage</label>
                                    <Select value={selectPlStage}  onChange={() => {  handleSelectPlStage(); }}  options={pl_stages}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Salt Percentage</label>
                                    <Input type="text" className="form-control" id="name" placeholder="Salt Percentage" />
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