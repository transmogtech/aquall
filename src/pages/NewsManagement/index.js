import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap'
import   SearchTable  from './ReactTable'
import { Link } from 'react-router-dom';
import Alert from '../../Components/Common/Alert';

const ReactTable = () => {
  document.title = "News Management | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">News Management</h5>
                  <div className='float-end'>
                     
                      <Link to="/create-news" color="success" className="btn btn-success" id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Link>
                  </div>
                </CardHeader>
                <CardBody>
                <Alert />

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

export default ReactTable;