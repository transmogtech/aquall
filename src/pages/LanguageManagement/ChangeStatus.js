import React, { useState } from 'react'
import {  Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from "react-select";

const ChangeStatus = () => {

    const [modal_grid, setmodal_grid] = useState(false);
    const [selectedSingle, setSelectedSingle] = useState(null);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

    
  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }
  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];





    return (
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

    )
}

export default ChangeStatus