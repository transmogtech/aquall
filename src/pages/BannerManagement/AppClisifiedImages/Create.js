import React from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import {  Link } from 'react-router-dom';


const CreateAppClasifiedImage = () => {

  const handleSubmit = () => {
  }

    document.title = "Create App Clasified Image | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create App Clasified Image" pageTitle="App Clasified Image Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create App Clasified Image" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                       
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                    <Input type="file" className="form-control" id="name" placeholder="Name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                    <Input type="text" className="form-control" id="title" placeholder="URL" />
                                                </div>
                                            </Col>

                                        </Row>

                                    </div>
                                  
                                </CardBody>
                                <CardFooter>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                
                                  <Link to="/app-clasified-images" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateAppClasifiedImage;