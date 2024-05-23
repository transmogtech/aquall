import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";


const CreateCount = () => {



    const [selectedCultureType, setSelectedCultureType] = useState(false);
    const [selectedCountArea, setSelectedCountArea] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


    function handleSelectCultureType(selectedCultureType) {
        setSelectedCultureType(selectedCultureType);
    }


    function handleSelectCountArea(selectedCountArea) {
        setSelectedCountArea(selectedCountArea);
    }

    function handleSelectedCategory(selectedCategory) {
        setSelectedCategory(selectedCategory);
    }


    const handleSubmit = () => {
    }



    const categories = [
        { value: "01", label: "Seed" },
        { value: "02", label: "Feed" },
        { value: "03", label: "Chemical" },
        { value: "04", label: "Aerators" },
        { value: "05", label: "Test Kit" },
        { value: "06", label: "Other" },
    ];

    const CountArea = [
        { value: "01", label: "ONGOLE" },
        { value: "02", label: "VIZAG" },
        { value: "03", label: "ANDHRAPRDESH" },
    ];

    
    const cats = [
        { value: "01", label: "Shrimp" },
        { value: "02", label: "Fish" },
    ];

    const CountPercent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    document.title = "Create Count | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Count" pageTitle="Count Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Count" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={selectedCategory} onChange={() => { handleSelectedCategory(); }} options={cats} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select value={selectedCultureType} onChange={() => { handleSelectCultureType(); }} options={categories} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Count Area</Label>
                                                        <Select value={selectedCountArea} onChange={() => { handleSelectCountArea(); }} options={CountArea} />
                                                    </div>
                                                </Col>
                                            </Row>


                                            <Row className="gy-4 mt-3">

                                                {
                                                    CountPercent.map((count) => (
                                                        
                                                        <Col xxl={6} md={6} className='mt-3'>
                                                            <h6 className=''>Count {count}</h6>
                                                            <Row className="gy-4 mt-3 border-top">
                                                                <Col xxl={6} md={6} className='mt-3 mb-3 '>

                                                                    <Input name='count' className='form-control' placeholder={`Count${count}`} />
                                                                </Col>

                                                                <Col xxl={6} md={6} className='mt-3 mb-3'>

                                                                    <Input name='count' className='form-control' placeholder={`Volume${count}`} />
                                                                </Col>

                                                            </Row>
                                                        </Col>

                                                    ))
                                                }
                                            </Row>


                                        </div>

                                    </CardBody>


                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                            <Link to="/Counts" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateCount;