import React, { useState} from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";


const EditNotification = () => {


    
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    function handleSelectCategory(selectedCategory) {
        setSelectedCategory(selectedCategory);
    }


    function handleSelectCompany(selectedCompany) {
        setSelectedCompany(selectedCompany);
    }

    function handleSelectProduct(selectedProduct) {
        setSelectedProduct(selectedProduct);
    }


    const handleSubmit = () => {
    }



    const categories = [
        {id: "01", name: "Seed"},
        {id: "02", name: "Feed"},
        {id: "03", name: "Chemical"},
        {id: "04", name: "Aerators"},
        {id: "05", name: "Test Kit"},
        {id: "06", name: "Other"},
    ];

    const company = [
        {id: "01", name: "APEX FROZEN LIMITED"},
        {id: "02", name: "KRISHNA CHEMICALS"},
        {id: "03", name: "Vannamei"},
    ];
    
    const product = [
        {id: "01", name: "Bio Treat 80"},
        {id: "02", name: "Purelite"},
        {id: "03", name: "Aqua soft	"},
        {id: "04", name: "aerator motor	"},
        {id: "05", name: "motor"},
    ];

    document.title = "Edit Notification | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Edit Notification" pageTitle="Notification Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Edit Notification" />

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
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Product</Label>
                                                        <Select value={selectedProduct} onChange={() => { handleSelectProduct(); }} options={product} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                        <Input type="text" className="form-control" id="title" placeholder="URL Slug" />
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Description</Label>
                                                        <textarea className="form-control" placeholder="Meta Keywords" id="description" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>


                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                            <Link to="/notifications" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default EditNotification;