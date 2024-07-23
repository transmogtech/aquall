import React, { useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

const EditModal = ({ show, onCloseClick, onChange, handleSubmit, defaultValue }) => {

  const countareas = useSelector(state => state.countArea.countareas);

  const countarea = countareas.find(countarea => countarea._id === defaultValue);


  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} >
      <ModalHeader className="modal-title" >
        Update Count Area

      </ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-3">
            <Col xxl={12}>
              <div>
                <label htmlFor="firstName" className="form-label">Area Name</label>
                <Input type="text" className="form-control" defaultValue={countarea ? countarea.title : ''} onChange={onChange} name="title" />
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


EditModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.bool,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  defaultValue: PropTypes.any,
};

export default EditModal;