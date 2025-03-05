import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import DataTable from './ReactTable'
import { Link } from 'react-router-dom';
import Alert from '../../../Components/Common/Alert';
import { createHPSize } from '../../../actions/hpSizes';
import CreateModal from './Create';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const HpSize = ({ createHPSize }) => {

  const [createHpSize, setCreateHpSize] = useState(false);
  const [title, setTitle] = useState(null);
  const [error, setError] = useState('');

  function toggle_create() {
    setCreateHpSize(!createHpSize);
  }


  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const validateForm = () => {

    setError('');

    if (!title) {
        setError( 'Please enter a title' );
        return false;
    }

    return true;
}
  const handleSubmit = () => {

    if (!validateForm()) {
      setCreateHpSize(true);
      return false;
  }
    createHPSize(title);
    setCreateHpSize(false);
  }

  document.title = "Create HP Size | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">HP Sizes</h5>
                  <div className='float-end'>

                    <Link onClick={() => toggle_create(true)} to="#!" color="success" className="btn btn-success" id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Link>

                  </div>
                </CardHeader>
                <CardBody>
                  <Alert />
                  <DataTable />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <CreateModal
            show={createHpSize}
            onCloseClick={() => setCreateHpSize(false)}
            onChange={onChange}
            error={error}
            handleSubmit={handleSubmit}
          />

        </Container>
      </div>
    </React.Fragment>
  )
}


HpSize.propTypes = {
  createHPSize: PropTypes.func.isRequired
};

export default connect(null, { createHPSize })(HpSize);