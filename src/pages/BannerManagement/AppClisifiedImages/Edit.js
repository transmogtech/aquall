import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateAppClassifiedImage, getAppClassifiedImage } from '../../../actions/appClassifiedImage';
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditAppClassifiedImage = ({ updateAppClassifiedImage, getAppClassifiedImage }) => {
    const { id } = useParams();
    const [appclassifiedimage, setAppClassifiedImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState({});
    const [formData, setFormData] = useState();
    useEffect(() => {
        const fetchtData = async () => {
            const response = await getAppClassifiedImage(id);
            setAppClassifiedImage(response);
            setFormData({ url: response.url, image: response.image, priority: response.priority });
        }
        fetchtData();
        setLoading(false);
    }, []);

    // console.log(appclassifiedimage);
    const navigate = useNavigate();


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const deleteImage = () => {
        setAppClassifiedImage({ ...appclassifiedimage, image: null });
        setFormData({ ...formData, image: null });
    }

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
        updateAppClassifiedImage(id, formData);

        navigate('/app-clasified-images');
    }


    document.title = "Edit App Classified Image | Aquall Admin";
    return (
        <React.Fragment>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit App Classified Image" pageTitle="App Classified Image Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit App Classified Image" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">


                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="title" className="form-label">URL</Label>
                                                                <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" defaultValue={appclassifiedimage.url} placeholder="URL" />
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
                                                                {
                                                                    appclassifiedimage.image ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${appclassifiedimage.image}`} width="100%" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                                }
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
                                                                <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" defaultValue={appclassifiedimage.priority} placeholder="Priority" />
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

                </>
            )}
        </React.Fragment>
    );
}

EditAppClassifiedImage.propTypes = {
    updateAppClassifiedImage: PropTypes.func.isRequired,
    getAppClassifiedImage: PropTypes.func.isRequired,
}


export default connect(null, { updateAppClassifiedImage, getAppClassifiedImage })(EditAppClassifiedImage);