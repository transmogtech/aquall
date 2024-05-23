import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";


const CreateBestDeal = () => {

    const handleSubmit = () => {
    }




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

    const categories = [
        { value: "01", label: "Seed" },
        { value: "02", label: "Feed" },
        { value: "03", label: "Chemical" },
        { value: "04", label: "Aerators" },
        { value: "05", label: "Test Kit" },
        { value: "06", label: "Other" },
    ];

    const company = [
        { value: "01", label: "APEX FROZEN LIMITED" },
        { value: "02", label: "KRISHNA CHEMICALS" },
        { value: "03", label: "Vannamei" },
    ];

    const product = [
        { value: "01", label: "Bio Treat 80" },
        { value: "02", label: "Purelite" },
        { value: "03", label: "Aqua soft	" },
        { value: "04", label: "aerator motor	" },
        { value: "05", label: "motor" },
    ];

    document.title = "Create Best Deal | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Best Deal" pageTitle="Best Deal Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Best Deal" />

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
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" id="title" placeholder="URL Slug" />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                        <Input type="number" className="form-control" id="title" placeholder="Discount" />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" id="title" placeholder="URL" />
                                                    </div>
                                                </Col>
                                               
                                                <Col md={12}>
                                                <h6 className="form-label">Products</h6>
                                                    {product.map((prod) => (
                                                        <div className="form-check-inline">
                                                            <Input type='checkbox' className='form-check-input' value={prod.value} /> {prod.label}
                                                        </div>
                                                    ))}

                                                </Col>
                                                <Col xxl={3} md={6}>
                                                <Label htmlFor="basiInput" className="form-label">Show</Label>
                                                    <div className='className="form-check form-switch mb-2"'>
                                                       
                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked />
                                                        <Label className="form-check-label" htmlFor="flexSwitchCheckDefault">Yes</Label>
                                                    </div>
                                                </Col>
                                               

                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                            <Link to="/best-deals" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateBestDeal;