import React from 'react'
import {  Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from "react-select";
import PropTypes from "prop-types";

const ChangeStatus = ({ show, onClick, onCloseClick, selectedSingle, handleSelectSingle, statusOptions, handleCommentChange }) => {
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
                  <Select value={{label: selectedSingle}} onChange={handleSelectSingle} options={statusOptions} />
                </div>
              </Col>

              <Col xxl={12}>
                <label htmlFor="passwordInput" className="form-label">Comment</label>
                <textarea className="form-control" placeholder="Enter Comment" onChange={handleCommentChange}  id="comment" rows="3"></textarea>
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


ChangeStatus.propTypes = {
    onCloseClick: PropTypes.func,
    onClick: PropTypes.func,
    show: PropTypes.any,
    selectedSingle: PropTypes.any,
    handleSelectSingle: PropTypes.func,
    statusOptions: PropTypes.any,
  };

export default ChangeStatus