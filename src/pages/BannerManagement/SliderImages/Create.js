import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, FormFeedback } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createSliderImage } from '../../../actions/sliderImage';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateSliderImage = ({ createSliderImage }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ url: '', image: '', priority: '' });

    const [error, setError] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files);
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };




    const handleSubmit = () => {

        if (!formData.url) {
            setError({ ...error, url: 'Please enter a url' });
            return false;
        }

        if (!formData.image) {
            setError({ ...error, image: 'Please select an image' });
            return false;
        }


        createSliderImage(formData);

        navigate('/slider-images');
    }


    document.title = "Create Slider Image | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Slider Image" pageTitle="Slider Image Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Slider Image" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" onChange={e => { onChange(e); }} name="url" id="url" placeholder="URL" />
                                                        {error && error.url ? (
                                                            <div className="text-danger">
                                                                {error.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                        {error && error.image ? (
                                                            <div className="text-danger">
                                                                {error.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" />
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>1168 W x 658 H pixels.</p>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/slider-images" className='btn btn-primary'>Cancel</Link>
                                            <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
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

CreateSliderImage.propTypes = {
    createSliderImage: PropTypes.func.isRequired,
}

export default connect(null, { createSliderImage })(CreateSliderImage);