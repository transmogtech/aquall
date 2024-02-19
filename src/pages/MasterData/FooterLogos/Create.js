import React from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import {  Link } from 'react-router-dom';


const CreateFooterLogo = () => {

  const handleSubmit = () => {
  }

    document.title = "Create Footer Logo | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Footer Logo" pageTitle="Footer Logo Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create FooterLogo" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                       
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Company Name</Label>
                                                    <Input type="text" className="form-control" id="name" placeholder="Company Name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Logo</Label>
                                                    <Input type="file" className="form-control" id="inputGroupFile02" />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                    <Input type="number" className="form-control" />
                                                </div>
                                            </Col>

                                        </Row>

                                    </div>
                                  
                                </CardBody>
                                <CardFooter>
                                <div class="d-flex align-items-start gap-3 mt-4">
                                
                                  <Link to="/footer-logos" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
                              </div>
                            </CardFooter>
                            </Card>
                        </Col>

                    </Row>



</Form>
                </Container>

            </div>


        </React.Fragment>
    );
}

export default CreateFooterLogo;