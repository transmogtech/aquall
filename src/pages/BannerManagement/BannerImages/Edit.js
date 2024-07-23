import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateBannerImage, getBannerImage } from '../../../actions/bannerImage';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditBannerImage = ({ updateBannerImage, getBannerImage }) => {
    const { id } = useParams();
    const [bannerimage, setBannerImage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getBannerImage(id);
            setBannerImage(response);
        }
        fetchtData();
        setLoading(false);
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };


    const handleSubmit = () => {
        updateBannerImage(id, formData);

        navigate('/banner-images');
    }


    document.title = "Create Banner Image | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Create Banner Image" pageTitle="Banner Image Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Create Banner Image" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="title" className="form-label">URL</Label>
                                                                    <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" defaultValue={bannerimage.url} placeholder="URL" />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                                    <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                                    <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" defaultValue={bannerimage.priority} placeholder="Priority" />
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

                    </>)}
        </React.Fragment>
    );
}

EditBannerImage.propTypes = {
    updateBannerImage: PropTypes.func.isRequired,
    getBannerImage: PropTypes.func.isRequired,
}


export default connect(null, { updateBannerImage, getBannerImage })(EditBannerImage);