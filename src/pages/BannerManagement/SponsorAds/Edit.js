import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateSponsoredAd, getSponsoredAd } from '../../../actions/sponsoredAd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditSponsorAd = ({ updateSponsoredAd, getSponsoredAd }) => {

    let { id } = useParams();
    const [sponsoredad, setSponsoredAd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getSponsoredAd(id);
            setSponsoredAd(response);
            setFormData({ name: response.name, discount: response.discount, image: response.image, url: response.url, priority: response.priority });
            setLoading(false);

        }
        fetchtData();
    }, []);
    const navigate = useNavigate();


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files);
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };
    const deleteImage = () => {
        setSponsoredAd({ ...sponsoredad, image: null });
        setFormData({ ...formData, image: null });
    }


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

        updateSponsoredAd(id, formData);
        navigate('/sponsor-ads');
    }


    document.title = "Edit Sponsor Ad | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit Sponsor Ad" pageTitle="Sponsor Ad Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit Sponsor Ad" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">


                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Sponsor Name</Label>
                                                                <Input type="text" className="form-control" name="name" placeholder="Sponsor Name" onChange={e => onChange(e)} defaultValue={sponsoredad.name} />
                                                                {errors && errors.name ? (
                                                                    <div class="text-danger">
                                                                        {errors.name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                                <Input type="number" min="1" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} defaultValue={sponsoredad.discount} />
                                                                {errors && errors.discount ? (
                                                                    <div class="text-danger">
                                                                        {errors.discount}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                                {
                                                                    sponsoredad.image ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${sponsoredad.image}`} width="100%" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                                }
                                                                {errors && errors.image ? (
                                                                    <div class="text-danger">
                                                                        {errors.image}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                                <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} defaultValue={sponsoredad.url} />
                                                                {errors && errors.url ? (
                                                                    <div class="text-danger">
                                                                        {errors.url}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                                <Input type="number" min="1" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} defaultValue={sponsoredad.priority} />
                                                                {errors && errors.priority ? (
                                                                    <div class="text-danger">
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

                </Fragment>)
            }
        </React.Fragment>
    );
}

EditSponsorAd.propTypes = {
    updateSponsoredAd: PropTypes.func.isRequired,
    getSponsoredAd: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    sponsoredAd: state.sponsoredAd,
});

export default connect(mapStateToProps, { updateSponsoredAd, getSponsoredAd })(EditSponsorAd);
