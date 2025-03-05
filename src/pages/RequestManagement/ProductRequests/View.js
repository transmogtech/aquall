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

              {/* <h5 className="fs-16">Volume</h5>
              <p>{productrequest.volume}</p>
              <hr />

              <h5 className="fs-16">Price</h5>
              <p>{productrequest.price}</p>
              <hr />

              <h5 className="fs-16">Discount</h5>
              <p>{productrequest.discount}%</p>
              <hr /> */}

              <h5 className="fs-16">User Name</h5>
              <p>{productrequest.name}</p>
              <hr />

              <h5 className="fs-16">Email</h5>
              <p>{productrequest.email}</p>
              <hr />

              <h5 className="fs-16">Mobile</h5>
              <p>{productrequest.mobile}</p>
              <hr />
              <h5 className="fs-16">Area</h5>
              <p>{productrequest.area}</p>
              <hr />
              <h5 className="fs-16">Message</h5>
              <p>{productrequest.comment}</p>
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