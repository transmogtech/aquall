import React, { useMemo, useState } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from "react-select";


const SearchTable = () => {
  const searchTable =
    [
      { id: "01", requestTime: "23 Jan, 2024 07:56 AM	", name: "Murthy", email: "murthy.murthy08206@gmail.com", mobile: "9618697777", action: "01" },
      { id: "02", requestTime: "30 Oct, 2023 04:39 PM	", name: "tqYgFKY", email: "Uncernise@fmaill.xyz", mobile: "8897724124", action: "02" },
      { id: "03", requestTime: "01 Oct, 2023 06:06 AM", name: "Yogesh", email: "Yogeshnnaikmanki431@gimel.come", mobile: "9141882173", action: "03" },
      { id: "04", requestTime: "01 Oct, 2023 02:23 AM	", name: "Gopala Rout	", email: "gopalarout802@gmail.com", mobile: "9938705950", action: "04" },
      { id: "05", requestTime: "30 Sep, 2023 08:23 PM		", name: "Karthik Nani", email: "nanikarthik085@gmail.com", mobile: "7993347798", action: "05" },
      { id: "06", requestTime: "30 Sep, 2023 08:02 PM	", name: "Pavan", email: "n.pavan9068@gmail.com", mobile: "9177582585", action: "06" },
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

  
  const [isView, setIsView] = useState(false);
  function viewRequest() {
    setIsView(!isView);
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
        header: "Request Time",
        accessorKey: "requestTime",
        enableColumnFilter: false,
      },
      
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      
      {
        header: "Mobile",
        accessorKey: "mobile",
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
              <Link to='#' onClick={() => viewRequest(cell.getValue())} className="btn btn-sm btn-warning"><i className='las la-eye'></i></Link>&nbsp;&nbsp;
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
        <ModalHeader className="bg-light p-3" toggle={() => {
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
                  <Select value={selectedSingle} onChange={() => { handleSelectSingle(); }} options={statusOptions} />
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

      <Modal isOpen={isView} toggle={() => { viewRequest(); }} >
        
        <ModalHeader className="bg-light p-3" toggle={() => {
          viewRequest();
        }}>
          View request

        </ModalHeader>
        <ModalBody>
          <form action="#">
            <div className="row g-3">
              <Col xxl={12}>
              <span className='fw-semibold'> Name: </span> Ganesh barnika
              </Col>

              <Col xxl={12}>
              <span className='fw-semibold'>Email: </span> ganeshbarnika225@gmail.com	
 	
              </Col>
              
              <Col xxl={12}>
              <span className='fw-semibold'>Mobile: </span> 6305994692
              </Col>
              
              <Col xxl={12}>
              <span className='fw-semibold'>State: </span> Andhrapradesh 	
              </Col>
              
              <Col xxl={12}>
              <span className='fw-semibold'>District: </span> Westgodavari
              </Col>
              
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={() => setIsView(false)}>Close</Button>
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
        <ModalHeader className="bg-light p-3">
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