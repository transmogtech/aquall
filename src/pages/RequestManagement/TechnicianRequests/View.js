import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody, ModalHeader, Col, Button } from "reactstrap";
import { useSelector } from 'react-redux';

const ViewModal = ({ show, id, onCloseClick }) => {
  const technicianrequests = useSelector(state => state.technicianRequest.technicianrequests);

  const technicianrequest = technicianrequests.find(technicianrequest => technicianrequest._id === id);
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader className="bg-light p-3" toggle={onCloseClick}>
        View request

      </ModalHeader>

      <ModalBody className="py-3 ">
        {technicianrequest ? (
          <div className="row g-3">
            <Col xxl={12}>
              <h5 className="fs-16">Name</h5>
              <p>{technicianrequest.userId.name}</p>
              <hr />
            
              <h5 className="fs-16">Email Address</h5>
              <p>{technicianrequest.userId.email}</p>
              <hr />
          
              <h5 className="fs-16">Mobile Number</h5>
              <p>{technicianrequest.userId.mobile}</p>
              <hr />
           
              <h5 className="fs-16">State</h5>
              <p>{technicianrequest.userId.stateId.title}</p>
              <hr />
           
              <h5 className="fs-16">District</h5>
              <p>{technicianrequest.userId.districtId.title}</p>
              <hr />
           
            </Col>
          </div>

        ) : (
          <div className="row g-3">
            <Col xxl={12}>No data found </Col>
          </div>

        )}
         <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button color="danger" onClick={onCloseClick}>Close</Button>
                </div>
              </Col>

      </ModalBody>
    </Modal>
  );
};

ViewModal.propTypes = {
  onCloseClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  show: PropTypes.any,
};

export default ViewModal;