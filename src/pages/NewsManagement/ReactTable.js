import React, { useEffect, useMemo, useState } from 'react';
import TableContainer from '../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Col, Container, Input, Modal, ModalBody, ModalHeader, PopoverBody, PopoverHeader, Row, UncontrolledPopover, UncontrolledTooltip } from 'reactstrap';
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';


const SearchTable = () => {
  const searchTable =
    [
      { id: "10", title: "జనతా బజార్లలో ఆక్వా ఉత్పత్తులు", language: "Telugu", image: "https://www.aquall.in/assets/images/21.jpg", action: "10" },
      { id: "09", title: "మేత కంపెనీల  అదనపు భారం", language: "Telugu", image: "https://www.aquall.in/assets/images/broder.jpg", action: "09" },
      { id: "08", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", language: "English", image: "https://www.aquall.in/assets/images/IMG_20200516_212631_671.JPG", action: "08" },
      { id: "07", title: "Nullam laoreet metus vitae enim congue varius.      ", language: "English", image: "https://www.aquall.in/assets/images/aqua_hub.jpg", action: "07" },
      { id: "06", title: "మేత కంపెనీల  అదనపు భారం", language: "Telugu", image: "https://www.aquall.in/assets/images/feedd.jpg", action: "06" },
      { id: "05", title: "Duis vel lacus ac elit pellentesque condimentum. ", language: "English", image: "https://www.aquall.in/assets/images/product-500x500.jpeg", action: "05" },
      { id: "04", title: "Vivamus eleifend nisi et sapien laoreet placerat.      ", language: "English", image: "https://www.aquall.in/assets/images/fish.jpg", action: "04" },
      { id: "03", title: "జనతా బజార్లలో ఆక్వా ఉత్పత్తులు", language: "Telugu", image: "https://www.aquall.in/assets/images/fish.jpg", action: "03" },
      { id: "02", title: "Vestibulum semper mauris id neque convallis euismod.      ", language: "English", image: "https://www.aquall.in/assets/images/bbfec147_07-crop-aac311.jpg", action: "02" },
      { id: "01", title: "ఏపీని ఆక్వా హబ్ గా మార్చిన ప్రభుత్వం", language: "Telugu", image: "https://www.aquall.in/assets/images/bbfec147_07-crop-aac311.jpg", action: "01" }
    ];



    const durationnotify = () => toast("Toast Duration 5s", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });
    
    const [modal_grid, setmodal_grid] = useState(false);
    const [selectedSingle, setSelectedSingle] = useState(null);

    function tog_grid() {
        setmodal_grid(!modal_grid);

        toast("Toast Duration 5s", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });

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
            <img class="rounded-circle header-profile-user" src={cell.getValue()} alt="Header Avatar"></img>
          )
        }
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Language",
        accessorKey: "language",
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
            <Link to={`/edit/news/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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