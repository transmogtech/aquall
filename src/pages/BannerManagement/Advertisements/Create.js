import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, FormFeedback } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createAdvertisement } from '../../../actions/advertisement';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";

const CreateAdvertisement = ({ createAdvertisement }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ url: '', image: '', priority: '' });
    const [error, setErrors] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        createAdvertisement(formData);

        navigate('/advertisements');
    }
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



    document.title = "Create Advertisement | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Advertisement" pageTitle="Advertisement Management" />
                    <Form className="needs-validation"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                            return false;
                        }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Advertisement" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" name="url" id="url" placeholder="URL"
                                                            onChange={e => onChange(e)}
                                                        />
                                                        {error && error.url ? (
                                                            <div className="text-danger">
                                                                {error.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />
                                                        {error && error.image ? (
                                                            <div className="text-danger">
                                                                {error.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" min="1" placeholder="Priority" />
                                                        {error && error.priority ? (
                                                            <div className="text-danger">
                                                                {error.priority}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="start_date" className="form-label">Start Date</Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            onChange={([date]) => {
                                                                setFormData({ ...formData, 'start_date': date });
                                                            }}
                                                            options={{
                                                                minDate: new Date(),

                                                                dateFormat: "Y-m-d",
                                                            }}

                                                        />

                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="end_date" className="form-label">End Date</Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            onChange={([date]) => {
                                                                setFormData({ ...formData, 'end_date': date });
                                                            }}
                                                            options={{
                                                                minDate: formData.start_date,

                                                                dateFormat: "Y-m-d",
                                                            }}
                                                        />

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
                                            <Link to="/advertisements" className='btn btn-primary'>Cancel</Link>
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

CreateAdvertisement.propTypes = {
    createAdvertisement: PropTypes.func.isRequired,
}

export default connect(null, { createAdvertisement })(CreateAdvertisement);