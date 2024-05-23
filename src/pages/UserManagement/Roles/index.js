import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import DataTable from './ReactTable'
import { Link } from 'react-router-dom';
import Alert from '../../../Components/Common/Alert';
import { createUserRole } from '../../../actions/userRole';
import CreateModal from './Create';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const UserRoles = ({ createUserRole }) => {

  const [createModal, setCreateModal] = useState(false);
  const [formData, setFormData] = useState(null);

  function toggle_create() {
    setCreateModal(!createModal);
  }


  const onChange = (e) => {
    setFormData ({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    createUserRole(formData);
    setCreateModal(false);
  }

  document.title = "User Role | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">User Roles</h5>
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
            show={createModal}
            onCloseClick={() => setCreateModal(false)}
            onChange={onChange}
            handleSubmit={handleSubmit}
          />

        </Container>
      </div>
    </React.Fragment>
  )
}


UserRoles.propTypes = {
  createUserRole: PropTypes.func.isRequired
};

export default connect(null, { createUserRole })(UserRoles);