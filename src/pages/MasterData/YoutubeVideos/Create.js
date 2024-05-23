import React, { useState  } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createYoutubeVideo } from '../../../actions/youtubeVideo';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateYoutubeVideo = ({createYoutubeVideo}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        createYoutubeVideo(formData);

        navigate('/youtube-videos');
    }
    document.title = "Create Youtube Video | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Youtube Video" pageTitle="Youtube Video Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create Youtube Video" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                       
                                        <Col xxl={6} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                    <Input type="text" onChange={e => onChange(e)}  className="form-control" name="title" placeholder="Name" />
                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Youtube URL</Label>
                                                    <Input type="text" onChange={e => onChange(e)}  className="form-control" name="url" />
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


        </React.Fragment>
    );
}


CreateYoutubeVideo.propTypes = {
    createYoutubeVideo: PropTypes.func.isRequired,
}

export default connect(null, { createYoutubeVideo })(CreateYoutubeVideo);