import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap'
import {  SearchTable } from './ReactTable'
import { Link } from 'react-router-dom';

const CompanyRequests = () => {
  document.title = "React Tables | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Company Request</h5>
                  <div className='float-end'>
                     
                   
                  </div>
                </CardHeader>
                <CardBody>
                  <SearchTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
         
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CompanyRequests;