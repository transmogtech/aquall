import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createState } from '../../../actions/state';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const CreateState = ({ createState }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({title: '', url: "", metaTitle: "", metaDescription: "", metaKeywords: ""});
    const [errors, setErrors] = useState({});

    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter a title' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter a url' });
            return false;
        }

        return true;
    }

    const onChange = (e) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }
        createState(formData);

        navigate('/states');
    }
    document.title = "Create State | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create State" pageTitle="State Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create State" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">Name</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="title" id="title" placeholder="Title" />
                                                        {errors && errors.title ? (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" placeholder="URL Slug" />
                                                        {errors && errors.url ? (
                                                            <div className="text-danger">
                                                                {errors.url}
                                                            </div>
                                                        ) : null}
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
                                            <Link to="/states" className="btn btn-primary" >Cancel</Link>
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


CreateState.propTypes = {
    createState: PropTypes.func.isRequired,
}

export default connect(null, { createState })(CreateState);
