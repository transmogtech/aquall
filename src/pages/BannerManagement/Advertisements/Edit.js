import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateAdvertisement, getAdvertisement } from '../../../actions/advertisement';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import Flatpickr from "react-flatpickr";

const EditAdvertisement = ({ updateAdvertisement, getAdvertisement }) => {
    const { id } = useParams();

    const [advertisement, setAdvertisement] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAdvertisementData = async () => {
            const response = await getAdvertisement(id);
            setAdvertisement(response);
        }
        fetchAdvertisementData();
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

    const deleteImage = () => {
        setAdvertisement({ ...advertisement, image: null });
    }

    const handleSubmit = () => {
        updateAdvertisement(id, formData);
        navigate('/advertisements');
    }


    document.title = "Create Advertisement | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Create Advertisement" pageTitle="Advertisement Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
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
                                                                    <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" defaultValue={advertisement.url} placeholder="URL" />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>{
                                                                        advertisement.image ? (
                                                                            <div className="img-wrap">
                                                                                <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                                <img src={`${process.env.REACT_APP_API_URL}/${advertisement.image}`} width="100%" />
                                                                            </div>
                                                                        ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                                    }
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                                    <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" defaultValue={advertisement.priority} placeholder="Priority" />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={6} md={6}>
                                                                <div>
                                                                    <Label htmlFor="start_date" className="form-label">Start Date</Label>
                                                                    <Flatpickr
                                                                        className="form-control"
                                                                        defaultValue={advertisement.start_date}
                                                                        value={advertisement.start_date}
                                                                        onChange={([date]) => {
                                                                            setFormData({ ...formData, 'start_date': date });
                                                                        }}
                                                                        options={{
                                                                            minDate: "today",

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
                                                                        defaultValue={advertisement.end_date}
                                                                        value={advertisement.end_date}

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

                    </>)}
        </React.Fragment>
    );
}

EditAdvertisement.propTypes = {
    updateAdvertisement: PropTypes.func.isRequired,
    getAdvertisement: PropTypes.func.isRequired,

}


export default connect(null, { updateAdvertisement, getAdvertisement })(EditAdvertisement);