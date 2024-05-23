import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import   DataTable  from './ReactTable'
import { Link } from 'react-router-dom';
import Alert from '../../Components/Common/Alert';
import BreadCrumb from '../../Components/Common/BreadCrumb';
const Languages = () => {
  document.title = "Language Management | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <BreadCrumb title="Language Listing" pageTitle="Language Management" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Language Management</h5>
                  <div className='float-end'>
                     
                      <Link to="/create-language" color="success" className="btn btn-success" id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Link>
                  </div>
                </CardHeader>
                <CardBody>
                <Alert />

                  <DataTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
         
        </Container>
      </div>

    </React.Fragment>
  )
}

export default Languages;