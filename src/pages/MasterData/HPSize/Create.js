import React, { useState } from 'react'
import {  Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import PropTypes from "prop-types";

const CreateModal = ({ show, onCloseClick, onChange, error, handleSubmit }) => {
 


    return (
        <Modal  isOpen={show} toggle={onCloseClick} centered={true} >
        <ModalHeader className="modal-title" >
         Create HP Size

        </ModalHeader>
        <ModalBody>
          <form action="#">
            <div className="row g-3">
              <Col xxl={12}>
                <div>
                  <label htmlFor="firstName" className="form-label">Name</label>
                  <Input type="text" className="form-control" onChange={onChange} name="title" />
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </Col>

             
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={onCloseClick}>Close</Button>
                  <Button color="primary" onClick={handleSubmit} >Submit</Button>
                </div>
              </Col>
            </div>
          </form>
        </ModalBody>
      </Modal>



    )
}


CreateModal.propTypes = {
    onCloseClick: PropTypes.func,
    show: PropTypes.bool,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

export default CreateModal;