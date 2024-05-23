import React, { useState} from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import {  Link } from 'react-router-dom';
import Select from "react-select";


const CreateCompany = () => {

  const handleSubmit = () => {
  }

  const [selectedCategory, setSelectedCategory] = useState(false);

    function handleSelectCategory(selectedCategory) {
      setSelectedCategory(selectedCategory);
  }
    const categories = [
      { value: "01", label: "Seed" },
      { value: "02", label: "Feed" },
      { value: "03", label: "Chemical" },
      { value: "04", label: "Aerators" },
      { value: "05", label: "Test Kit" },
      { value: "06", label: "Other" },
  ];
  

    document.title = "Create Company | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Company" pageTitle="Company Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create Company" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                        <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={selectedCategory} onChange={() => { handleSelectCategory(); }} options={categories} />
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
                                                    <Label htmlFor="basiInput" className="form-label">Logo</Label>
                                                    <Input type="file" className="form-control" id="title" placeholder="URL Slug" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                    <Input type="number" className="form-control" id="title" placeholder="Priority" />
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                  
                                </CardBody>

                                <CardFooter>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                
                                  <Link to="/companies" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateCompany;