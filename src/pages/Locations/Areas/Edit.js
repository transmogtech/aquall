import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Select from "react-select";

import { updateArea, getArea } from '../../../actions/area';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import Loader from '../../../Components/Common/Loader';


const EditArea = ({ updateArea, getStates, getDistricts, getArea, state: { states }, district: { districts } }) => {

    let { id } = useParams();
    const [area, setArea] = useState([]);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedState, setSelectedState] = useState(null);
    const [options, setOptions] = useState([]);


    const [selectedDistrict, setSelectedDistrict] = useState(null);



    useEffect(() => {
        getStates();
        const fetchtData = async () => {
            const response = await getArea(id);
            setArea(response);
            setSelectedState(response.stateId.title);
            setSelectedDistrict(response.districtId?.title);
            getDistricts({ stateId: response.stateId._id });
            setFormData({
                stateId: response.stateId._id,
                districtId: response.districtId._id,
                title: response.title,
                url: response.url,
                metaTitle: response.metaTitle,
                metaKeywords: response.metaKeywords,
                metaDescription: response.metaDescription,
            });
        }
        fetchtData();
        setLoading(false);

    }, []);  // eslint-disable-line

    // console.log(area.stateId._id);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        updateArea(id, formData);

        navigate('/areas');
    }

    function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });
        console.log(selectedState.value);

        setSelectedState(selectedState.label);
    }

    function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });

        setSelectedDistrict(selectedDistrict.label);
    }

    const States = [];

    states.forEach(row => States.push({ value: row._id, label: row.title }));

    districts.forEach(district => { options.push({ value: district._id, label: district.title }) });


    document.title = "Edit Area | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Area" pageTitle="Area Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Area" />

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
                                                                    <Select value={{ label: selectedDistrict }} onChange={handleSelectDistrict} options={options} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Area name</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" id="title" placeholder="Title" defaultValue={area.title} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={area.url} />
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
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={area.metaTitle}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={area.metaDescription}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={area.metaKeywords}></textarea>
                                                                </div>
                                                            </Col>

                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/areas" className="btn btn-primary" >Cancel</Link>
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

EditArea.propTypes = {
    updateArea: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getArea: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    district: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    state: state.state,
    district: state.district,
});

export default connect(mapStateToProps, { updateArea, getStates, getDistricts, getArea })(EditArea);
