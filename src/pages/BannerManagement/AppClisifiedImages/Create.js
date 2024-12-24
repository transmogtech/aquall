import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createAppClassifiedImage } from '../../../actions/appClassifiedImage';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppClassifiedImage = ({ createAppClassifiedImage }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ url: '', image: '', priority: '' });
    const [error, setErrors] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, image: e.target.files[0] });
        // }

        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                setErrors({ ...error, image: 'Image file size should not exceed 10MB' });
                return;
            }else{
                setFormData({ ...formData, image: e.target.files[0] });
            }         
        }
    };
    const validateForm = () => {

        setErrors({});

        if (!formData.url) {
            setErrors({ ...error, url: 'Please enter url' });
            return false;
        }


        if (!formData.image) {
            setErrors({ ...error, image: 'Please select image' });
            return false;
        }


        if (!formData.priority) {
            setErrors({ ...error, priority: 'Please enter priority' });
            return false;
        }



        return true;
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }
        createAppClassifiedImage(formData);

        navigate('/app-clasified-images');
    }


    document.title = "Create App Classified Image | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create App Classified Image" pageTitle="App Classified Image Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create App Classified Image" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" placeholder="URL" />
                                                        {error && error.url ? (
                                                            <div class="text-danger">
                                                                {error.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />
                                                        {error && error.image ? (
                                                            <div class="text-danger">
                                                                {error.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" />
                                                        {error && error.priority ? (
                                                            <div class="text-danger">
                                                                {error.priority}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>1168W x 658H pixels.</p>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/app-clasified-images" className='btn btn-primary'>Cancel</Link>
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

AppClassifiedImage.propTypes = {
    createAppClassifiedImage: PropTypes.func.isRequired,
}

export default connect(null, { createAppClassifiedImage })(AppClassifiedImage);