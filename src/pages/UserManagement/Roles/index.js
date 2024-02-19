import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import {  SearchTable } from './ReactTable'
import { Link } from 'react-router-dom';

const UserRoles = () => {
  
  const [create_culture_type, setcreate_culture_type] = useState(false);

  function toggle_create() {
    setcreate_culture_type(!create_culture_type);
}
  document.title = "React Tables | Velzon - React Admin & Dashboard Template";
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
                  <SearchTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
         
          <Modal
                isOpen={create_culture_type}
                toggle={() => {
                    toggle_create();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    toggle_create();
                }}>
                    Create a new User Role

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Name</label>
                                    <Input type="text" className="form-control" id="name" placeholder="Name" />
                                </div>
                            </Col>
                
                            <Col lg={12}>
                                <div className="hstack gap-2 justify-content-end">
                                    <Button color="light" onClick={() => setcreate_culture_type(false)}>Close</Button>
                                    <Button color="primary" onClick={() => setcreate_culture_type(false)} >Submit</Button>
                                </div>
                            </Col>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserRoles;