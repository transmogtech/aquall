import React, { useState } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";


const EditProduct = () => {

    const handleSubmit = () => {
    }




    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showHideFields, setShowHideFields] = useState(false);
    // const [feedFields, setFeedFields] = useState(false);
    // const [aeratorFields, setAeratorFields] = useState(false);
    const [cartFields, setCartFields] = useState(false);
    const [gstFields, setGSTFields] = useState(false);


    function handleSelectCategory(selectedCategory) {
        setSelectedCategory(selectedCategory);
    }


    function handleSelectCompany(selectedCompany) {
        setSelectedCompany(selectedCompany);
    }

    function handleGstOptionChange() {
        setGSTFields(!gstFields);
    }

    function handleCartOptionChange() {
        setCartFields(!cartFields);
    }
    const handleOptionChange = (event) => {
        const category = event.value;
        setShowHideFields(category);
        // console.log(event.value);
        setSelectedCategory(category);
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


    document.title = "Edit Product | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Edit Product" pageTitle="Product Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Edit Product" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={selectedCategory} onChange={(e) => { handleOptionChange(e); }} name='category' options={categories} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select value={selectedCategory} onChange={() => { handleSelectCategory(); }} options={categories} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                    </div>
                                                </Col>

                                                {showHideFields === '01' && <Col xxl={3} md={6} >
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">PL Stage</Label>
                                                        <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                    </div>
                                                </Col>}


                                                {showHideFields === '01' &&
                                                    <Col xxl={3} md={6} id='saltPercentDiv'>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Salt Percentage</Label>
                                                            <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                        </div>
                                                    </Col>}

                                                {showHideFields === '02' && <Col xxl={3} md={6} id='feedTypeDiv'>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Feed Type</Label>
                                                        <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                    </div>
                                                </Col>}

                                                {showHideFields === '04' && <Col xxl={3} md={6} id='peddlerDiv'>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Peddler Type</Label>
                                                        <Select value={selectedCompany} onChange={() => { handleSelectCompany(); }} options={company} />
                                                    </div>
                                                </Col>}

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Product Name</Label>
                                                        <Input type="text" className="form-control" id="title" placeholder="Product Name" />
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
                                                        <Label htmlFor="basiInput" className="form-label">Price</Label>
                                                        <Input type="number" className="form-control" id="title" />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Volume</Label>
                                                        <Input type="number" className="form-control" id="title" />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                    { showHideFields == '01' ? <Label htmlFor="basiInput" className="form-label">Bonus</Label>: <Label htmlFor="basiInput" className="form-label">Discount %</Label>}
                                                        <Input type="number" className="form-control" id="title" />
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Description</Label>
                                                        <textarea name='description' className='form-control'></textarea>
                                                    </div>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col xxl={3} md={3} className='mt-5'>
                                                    <div className='form-check form-switch'>

                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { handleGstOptionChange(); }} checked={gstFields}  />
                                                        <Label className="form-check-label" htmlFor="flexSwitchCheckDefault">GST
                                                        </Label>
                                                    </div>
                                                </Col>
                                                {gstFields === true && <Col xxl={9} md={9}  id='gstDiv'>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">GST Percentage</Label>
                                                        <Input type="number" className="form-control" id="title" />
                                                    </div>
                                                </Col>}
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
                                
                                  <Link to="/products" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default EditProduct;