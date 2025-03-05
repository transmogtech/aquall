import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateYoutubeVideo, getYoutubeVideo } from '../../../actions/youtubeVideo';
import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../../../Components/Common/Loader';

const EditYoutubeVideo = ({ updateYoutubeVideo, getYoutubeVideo }) => {

    let { id } = useParams();

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [youtubevideo, setYoutubevideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const fetchtData = async () => {
            const response = await getYoutubeVideo(id);
            console.log(response);
            setYoutubevideo(response);
            setFormData({title: response?.title , url: response?.url});
        }
        fetchtData();
        setLoading(false);
    }, []); // eslint-disable-line


    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter title' });
            return false;
        }


        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter url' });
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

        updateYoutubeVideo(id, formData);

        navigate('/youtube-videos');
    }

    document.title = "Edit Youtube Video | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Youtube Video" pageTitle="Youtube Video Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Youtube Video" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">
                                                            <Col xxl={6} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" placeholder="Title" defaultValue={youtubevideo?.    title} />
                                                                    {errors && errors.title ? (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) : null}
                                                                </div>
                                                            </Col>

                                                            <Col xxl={6} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Youtube URL</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" defaultValue={youtubevideo?.url} />
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
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/youtube-videos" className='btn btn-primary'>Cancel</Link>
                                                        <Button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Button>
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


EditYoutubeVideo.propTypes = {
    updateYoutubeVideo: PropTypes.func.isRequired,
    getYoutubeVideo: PropTypes.func.isRequired,
}

export default connect(null, { updateYoutubeVideo, getYoutubeVideo })(EditYoutubeVideo);