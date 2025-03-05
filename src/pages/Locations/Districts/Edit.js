import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateDistrict, getDistrict } from '../../../actions/district';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStates } from '../../../actions/state';
import Select from "react-select";
import Loader from '../../../Components/Common/Loader';


const EditDistrict = ({ updateDistrict, getStates, getDistrict, state: { states } }) => {

    let { id } = useParams();

    const [selectedState, setSelectedState] = useState(null);
    const [district, setDistrict] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getStates();
        const fetchtData = async () => {
            const response = await getDistrict(id);
            setDistrict(response);
            setSelectedState(response.stateId.title);
            setFormData({
                stateId: response.stateId._id,
                title: response.title,
                url: response.url,
                metaTitle: response.metaTitle,
                metaKeywords: response.metaKeywords,
                metaDescription: response.metaDescription,
            });
        }
        fetchtData();
        setLoading(false);
    }, [getStates]); // eslint-disable-line


    const validateForm = () => {

        setErrors({});

        if (!formData.stateId) {
            setErrors({ ...errors, stateId: 'Please select a state' });
            return false;
        }

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter a title' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter a url' });
            return false;
        }

        return true;
    }   
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });

        setSelectedState(selectedState.label);
    }
    const States = [];

    states.forEach(row => States.push({ value: row._id, label: row.title }));


    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }
        updateDistrict(id, formData);

        navigate('/districts');
    }


    document.title = "Edit District | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit District" pageTitle="District Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    {errors && errors.length > 0 && errors.map((error) =>  <div className="text-danger">{error}</div>)}
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit District" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                                    <Select value={{ label: selectedState }} onChange={handleSelectState} options={States} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">District</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" id="title" placeholder="Title" defaultValue={district.title} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={district.url} />
                                                                </div>
                                                            </Col>

                                                        </Row>

                                                    </div>

                                                </CardBody>
                                            </Card>
                                        </Col>

                                    </Row>



                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Meta Data" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">

                                                        <Row className="gy-4">

                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaTitle" className="form-label">Meta Title</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={district.metaTitle}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={district.metaDescription}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={district.metaKeywords}></textarea>
                                                                </div>
                                                            </Col>


                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/districts" className="btn btn-primary" >Cancel</Link>
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

EditDistrict.propTypes = {
    updateDistrict: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistrict: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    state: state.state,
});


export default connect(mapStateToProps, { updateDistrict, getStates, getDistrict })(EditDistrict);
