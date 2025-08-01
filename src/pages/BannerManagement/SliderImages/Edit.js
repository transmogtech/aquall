import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateSliderImage, getSliderImage } from '../../../actions/sliderImage';
import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditSliderImage = ({ updateSliderImage, getSliderImage }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [sliderimage, setSliderImage] = useState([]);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState();

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getSliderImage(id);
            setSliderImage(response);
            setFormData({ url: response.url, image: response.image, priority: response.priority });
        }
        fetchtData();
        setLoading(false);
    }, []);

    // console.log(sliderimage);
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                setError({ ...error, image: 'Image file size should not exceed 10MB' });
                return;
            }else{
                setFormData({ ...formData, image: e.target.files[0] });
            }            
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
        updateSliderImage(id, formData);

        navigate('/slider-images');
    }


    const deleteImage = () => {
        setSliderImage({ ...sliderimage, image: null });
        setFormData({ ...formData, image: null });
    }

    document.title = "Edit Slider Image | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <> <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Slider Image" pageTitle="Slider Image Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Slider Image" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="title" className="form-label">URL</Label>
                                                                    <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" defaultValue={sliderimage.url} placeholder="URL" />
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


                                                                    {sliderimage.image ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${sliderimage.image}`} width="100%" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />}
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
                                                                    <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" defaultValue={sliderimage.priority} placeholder="Priority" />
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
                    </>)}

        </React.Fragment>
    );
}

EditSliderImage.propTypes = {
    updateSliderImage: PropTypes.func.isRequired,
    getSliderImage: PropTypes.func.isRequired,
}


export default connect(null, { updateSliderImage, getSliderImage })(EditSliderImage);