import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody, ModalHeader, Col, Button } from "reactstrap";
import { useSelector } from 'react-redux';

const ViewModal = ({ show, id, onCloseClick }) => {
  const companyrequests = useSelector(state => state.companyRequest.companyrequests);

  const companyrequest = companyrequests.find(companyrequest => companyrequest._id === id);
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader className="bg-light p-3" toggle={onCloseClick}>
        View request

      </ModalHeader>

      <ModalBody className="py-3 ">
        {companyrequest ? (
          <div className="row g-3">
            <Col xxl={12}>
              <h5 className="fs-16">Product Name</h5>
              <p>{companyrequest.productId.name}</p>
              <hr />
            
              <h5 className="fs-16">Company Name</h5>
              <p>{companyrequest.companyId.name}</p>
              <hr />
          
              <h5 className="fs-16">Category</h5>
              <p>{companyrequest.categoryId.title}</p>
              <hr />
           
              <h5 className="fs-16">Volume</h5>
              <p>{companyrequest.volume}</p>
              <hr />
           
              <h5 className="fs-16">Price</h5>
              <p>{companyrequest.price}</p>
              <hr />
           
              <h5 className="fs-16">Discount</h5>
              <p>{companyrequest.discount}%</p>
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