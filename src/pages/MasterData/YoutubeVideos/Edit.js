import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateYoutubeVideo, getYoutubeVideo } from '../../../actions/youtubeVideo';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../../../Components/Common/Loader';

const EditYoutubeVideo = ({ updateYoutubeVideo, getYoutubeVideo }) => {

    let { id } = useParams();

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [youtubevideo, setYoutubevideo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchtData = async () => {
            const response = await getYoutubeVideo(id);
            setYoutubevideo(response);
        }
        fetchtData();
        setLoading(false);
    }, []); // eslint-disable-line


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
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
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" placeholder="Name" defaultValue={youtubevideo.title} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={6} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Youtube URL</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" defaultValue={youtubevideo.url} />
                                                                </div>
                                                            </Col>

                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
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