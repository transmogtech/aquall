import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import { createSponsoredAd } from '../../../actions/sponsoredAd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const CreateSponsorAd = ({ createSponsoredAd }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', discount: '', image: '', url: '', priority: '' });
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                setErrors({ ...errors, image: 'Image file size should not exceed 10MB' });
                return;
            }else{
                setFormData({ ...formData, image: e.target.files[0] });
            }

            // console.log(e.target.files);
            
        }
    };

    const validateForm = () => {

        setErrors({});

        if (!formData.name) {
            setErrors({ ...errors, name: 'Please enter sponsor name' });
            return false;
        }

        if (!formData.discount) {
            setErrors({ ...errors, discount: 'Please enter discount' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter url' });
            return false;
        }


        if (!formData.image) {
            setErrors({ ...errors, image: 'Please select image' });
            return false;
        }


        if (!formData.priority) {
            setErrors({ ...errors, priority: 'Please enter priority' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }

        createSponsoredAd(formData);

        navigate('/sponsor-ads');
    }


    document.title = "Create Sponsor Ad | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Sponsor Ad" pageTitle="Sponsor Ad Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Sponsor Ad" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Sponsor Name</Label>
                                                        <Input type="text" className="form-control" name="name" placeholder="Sponsor Name" onChange={e => onChange(e)} />
                                                        {errors && errors.name ? (
                                                            <div className="text-danger">
                                                                {errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                        <Input type="number" min="1" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} />
                                                        {errors && errors.discount ? (
                                                            <div className="text-danger">
                                                                {errors.discount}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" id="image" onChange={handleFileChange} accept="image/jpeg, image/png" />
                                                        {errors && errors.image ? (
                                                            <div className="text-danger">
                                                                {errors.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} />
                                                        {errors && errors.url ? (
                                                            <div className="text-danger">
                                                                {errors.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" min="1" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} />
                                                        {errors && errors.priority ? (
                                                            <div className="text-danger">
                                                                {errors.priority}
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
                                            <Link to="/sponsor-ads" className='btn btn-primary'>Cancel</Link>
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

CreateSponsorAd.propTypes = {
    createSponsoredAd: PropTypes.func.isRequired,
}

export default connect(null, { createSponsoredAd })(CreateSponsorAd);
