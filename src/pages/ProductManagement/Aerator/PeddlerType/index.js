import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import {  SearchTable } from './ReactTable'
import { Link } from 'react-router-dom';
import Select from "react-select";

const PeddlerTypes = () => {
  
  const [create_culture_type, setcreate_culture_type] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [selectedHpSize, setSelectedHpSize] = useState(null);

  function toggle_create() {
    setcreate_culture_type(!create_culture_type);
}


function handleSelectedCompanies(selectedCompanies) {
  setSelectedCompanies(selectedCompanies);
}


function handleSelectedHpSize(selectedHpSize) {
setSelectedHpSize(selectedHpSize);
}


const Companies = [
  { value: 'emp DRIVES', label: 'emp DRIVES	' },
  { value: 'emp DRIVES', label: 'emp DRIVES	' },
  { value: 'sagaraquaculturepvtltd', label: 'sagaraquaculturepvtltd' },
  { value: 'geekay hatcheries pvt.ltd	', label: 'geekay hatcheries pvt.ltd	' },
  { value: 'Aqua Bros International Pvt Ltd	', label: 'Aqua Bros International Pvt Ltd	' }
];


const HpSize = [
  { value: '1-Hp	', label: '1-Hp	' },
  { value: '2-Hp	', label: '2-Hp	' },
  { value: '3-Hp	', label: '3-Hp	' },
  { value: 'Spare Parts', label: 'Spare Parts' }
];



  document.title = "Peddler Type | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Peddler Type Management</h5>
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
                    Create a new Peddler Type

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                        <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">HP Size</label>
                                    <Select value={selectedHpSize}  onChange={() => {  handleSelectedHpSize(); }}  options={HpSize}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Company Name</label>
                                    <Select value={selectedCompanies}  onChange={() => {  handleSelectedCompanies(); }}  options={Companies}  />
                                </div>
                            </Col>
                            <Col xxl={12}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">Peddler Type</label>
                                    <Input type="text" className="form-control" id="name" placeholder="Name" defaultValue="Vannamei" />
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

export default PeddlerTypes;