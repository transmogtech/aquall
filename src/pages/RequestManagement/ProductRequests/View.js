import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody, ModalHeader, Col, Button } from "reactstrap";
import { useSelector } from 'react-redux';

const ViewModal = ({ show, id, onCloseClick }) => {
  const productrequests = useSelector(state => state.productRequest.productrequests);

  const productrequest = productrequests.find(productrequest => productrequest._id === id);
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader className="bg-light p-3" toggle={onCloseClick}>
        View request

      </ModalHeader>

      <ModalBody className="py-3 ">
        {productrequest ? (
          <div className="row g-3">
            <Col xxl={12}>
              <h5 className="fs-16">Product Name</h5>
              <p>{productrequest.productId.name}</p>
              <hr />
            
              <h5 className="fs-16">Company Name</h5>
              <p>{productrequest.companyId.name}</p>
              <hr />
          
              <h5 className="fs-16">Category</h5>
              <p>{productrequest.categoryId.title}</p>
              <hr />
           
              <h5 className="fs-16">Volume</h5>
              <p>{productrequest.volume}</p>
              <hr />
           
              <h5 className="fs-16">Price</h5>
              <p>{productrequest.price}</p>
              <hr />
           
              <h5 className="fs-16">Discount</h5>
              <p>{productrequest.discount}%</p>
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