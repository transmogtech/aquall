import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import {  Link } from 'react-router-dom';
import Select from "react-select";


const CreateDistrict = () => {

    const [selectedState, setSelectedState] = useState(null);

    
    function handleSelectState(selectedState) {
        setSelectedState(selectedState);
    }

    

    const states  = [
        { value: '01', label: 'Andhrapradesh' },
        { value: '02', label: 'Telangana' },
        { value: '03', label: 'Tamilnadu' }
      ];

      
  const handleSubmit = () => {
  }

    document.title = "Create District | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create District" pageTitle="District Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create District" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                    <Select value={selectedState}  onChange={() => {  handleSelectState(); }}  options={states}  />
                                                </div>
                                            </Col>
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                    <Input type="text" className="form-control" id="name" placeholder="Name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                    <Input type="text" className="form-control" id="title" placeholder="URL Slug" />
                                                </div>
                                            </Col>

                                        </Row>

                                    </div>
                                  
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>



                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Meta Data" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                    
                                        <Row className="gy-4">
                                      
                                        <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Meta Title</Label>
                                                    <textarea className="form-control" placeholder="Meta Title" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>
                                            <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Meta Description</Label>
                                                    <textarea className="form-control" placeholder="Meta Description" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>
                                            <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Meta Keywords</Label>
                                                    <textarea className="form-control" placeholder="Meta Keywords" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>


                                        </Row>

                                    </div>
                                  
                                </CardBody>
                                <CardFooter>
                                <div class="d-flex align-items-start gap-3 mt-4">
                                
                                  <Link to="/districts" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateDistrict;