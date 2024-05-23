import React from 'react'
import {  Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import PropTypes from "prop-types";

const EditPdf = ({ show, onClick, onCloseClick, handleFileChange }) => {
    return (
        <Modal  isOpen={show} toggle={onCloseClick} centered={true} >
        <ModalHeader className="modal-title" >
         Change Status

        </ModalHeader>
        <ModalBody>
          <form action="#">
            <div className="row g-3">
              <Col xxl={12}>
                <div>
                  <label htmlFor="firstName" className="form-label">Status</label>
                  <Input type="file" className="form-control" onChange={handleFileChange} name="pdf" />
                </div>
              </Col>

             
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={onCloseClick}>Close</Button>
                  <Button color="primary" onClick={onClick} >Submit</Button>
                </div>
              </Col>
            </div>
          </form>
        </ModalBody>
      </Modal>



    )
}


EditPdf.propTypes = {
    onCloseClick: PropTypes.func,
    onClick: PropTypes.func,
    show: PropTypes.any,
    handleFileChange: PropTypes.func,
  };

export default EditPdf;