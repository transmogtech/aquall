import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, FormFeedback } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createAdvertisement } from '../../../actions/advertisement';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";

const CreateAdvertisement = ({ createAdvertisement }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();


    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            url: "",
            image: "",
            start_date: "",
            end_date: "",

        },
        validationSchema: Yup.object({
            url: Yup.string().required("Please Enter Advertisement URL"),
            lastname: Yup.string().required("Please Enter Advertisement image"),
            username: Yup.string().required("Please Enter start date"),
            city: Yup.string().required("Please Enter end date"),
        }),
        onSubmit: (values) => {
            createAdvertisement(formData);

            navigate('/advertisements');
        },
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files);
            setFormData({ ...formData, image: e.target.files[0] });
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
                            validation.handleSubmit();
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
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.url || ""}
                                                            invalid={
                                                                validation.touched.url &&
                                                                    validation.errors.url
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.url &&
                                                            validation.errors.url ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.url}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" />
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
                                                                minDate: "today",

                                                                dateFormat: "Y-m-d",
                                                            }}
                                                        />

                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
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