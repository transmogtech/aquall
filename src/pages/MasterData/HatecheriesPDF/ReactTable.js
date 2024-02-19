import React, { useMemo, useState } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import {  Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';


const SearchTable = () => {
  const [modal_grid, setmodal_grid] = useState(false);

  
  function tog_grid() {
    setmodal_grid(!modal_grid);
}
  const searchTable =
    [
      { id: "01", file: "sample.pdf", action: "01" },
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
        header: "File",
        accessorKey: "file",
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
        customPageSize={5}
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
                    Upload new PDF

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">File</label>
                                    <Input type="file" className="form-control" id="title" />
                                </div>
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


    </React.Fragment >

    
  );
};



export {  SearchTable };