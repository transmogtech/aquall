import React, { useState} from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import {  SearchTable } from './ReactTable'
import { Link } from 'react-router-dom';


const CountPercentages = () => {

  
  const [isView, setIsView] = useState(false);
  function viewRequest() {
    setIsView(!isView);
  }

  document.title = "Count Percentages | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Count Percentage</h5>
                  <div className='float-end'>
                     
                      <Link to='#!' onClick={() => viewRequest()} className="btn btn-success"
                      ><i className="ri-add-line align-bottom me-1"></i> Add</Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <SearchTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
         
         
      <Modal isOpen={isView} toggle={() => { viewRequest(); }} >
        
        <ModalHeader className="bg-light p-3" toggle={() => {
          viewRequest();
        }}>
          Add Count Percentage

        </ModalHeader>
        <ModalBody>
          <form action="#">
            <div className="row g-3">
            <Col xxl={12}>
                <label htmlFor="passwordInput" className="form-label">Count</label>
                <Input name='name' id='name' className='form-control' />
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={() => setIsView(false)}>Close</Button>
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

export default CountPercentages;