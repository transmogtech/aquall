import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createCategory } from '../../../actions/category';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slugify } from "../../../helpers/common_functions";

const CreateCategory = ({ createCategory }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({title: "", url: "", image: "", order: ""});
    const [url, setUrl] = useState(null);
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const onTitleChange = (e) => {
        const slug = slugify(e.target.value);
        setUrl(slug);
        setFormData({ ...formData, [e.target.name]: e.target.value, url: slug });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, image: e.target.files[0] });
        // }

        
if (e.target.files) {
    let file_size = e.target.files[0].size;

    if (file_size > 10e6) {
        alert('Image file size should not exceed 10MB');
        return;
    }else{
        setFormData({ ...formData, image: e.target.files[0] });
    }

    // console.log(e.target.files);
    
}
    };

    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter category title' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter url' });
            return false;
        }

        if (!formData.image) {
            setErrors({ ...errors, image: 'Please select a category image' });
            return false;
        }

        if (!formData.order) {
            setErrors({ ...errors, order: 'Please enter a order' });
            return false;
        }

        return true;
    }


    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }

        createCategory(formData);

        navigate('/categories');
    }
    document.title = "Create Category | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Category" pageTitle="Category Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Category" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">Name</Label>
                                                        <Input type="text" className="form-control" onChange={e => onTitleChange(e)} name="title" id="title" placeholder="Title" />
                                                        {errors && errors.title && (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" defaultValue={url} placeholder="URL Slug" />
                                                        {errors && errors.url && (
                                                            <div className="text-danger">
                                                                {errors.url}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="image" id="image" accept="image/jpeg, image/png" />
                                                        {errors && errors.image && (
                                                            <div className="text-danger">
                                                                {errors.image}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Order</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="order" min="1" id="order" placeholder="Order" />
                                                        {errors && errors.order && (
                                                            <div className="text-danger">
                                                                {errors.order}
                                                            </div>
                                                        ) }
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
                                                        <Label htmlFor="metaTitle" className="form-label">Meta Title</Label>
                                                        <textarea className="form-control" placeholder="Meta Title" onChange={e => onChange(e)} name="metaTitle" id="metaTitle" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                        <textarea className="form-control" placeholder="Meta Description" onChange={e => onChange(e)} name="metaDescription" id="metaDescription" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                        <textarea className="form-control" placeholder="Meta Keywords" onChange={e => onChange(e)} name="metaKeywords" id="metaKeywords" rows="3"></textarea>
                                                    </div>
                                                </Col>


                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                            <Link to="/categories" className='btn btn-primary'>Cancel</Link>
                                            <Button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Button>
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

CreateCategory.propTypes = {
    createCategory: PropTypes.func.isRequired,
}

export default connect(null, { createCategory })(CreateCategory);