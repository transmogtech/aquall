import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import Select from "react-select";
import { createArea } from '../../../actions/area';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';

const CreateArea = ({ createArea, getStates, getDistricts, state: { states } }) => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({stateId: "",districtId: "", title: '', url: "", metaTitle: "", metaDescription: "", metaKeywords: ""});
    const [selectedState, setSelectedState] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(['']);
    const Districts = [];
    const [errors, setErrors] = useState({});


    useEffect(() => {
        getStates();
        getDistricts();
    }, [getStates, getDistricts]);


    const districtsData = useSelector(state => state.district.districts);
    // console.log(districtsData);
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const validateForm = () => {

        setErrors({});

        if (!formData.stateId) {
            setErrors({ ...errors, stateId: 'Please select a state' });
            return false;
        }

        if (!formData.districtId) {
            setErrors({ ...errors, districtId: 'Please select a district' });
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


    const handleSubmit = () => {

        
        if (!validateForm()) {
            return false;
        }
        createArea(formData);

        navigate('/areas');
    }

    function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });
        console.log(selectedState.value);

        setSelectedState(selectedState.value);


        districtsData.forEach(district => {
            if (district.stateId && district.stateId._id === selectedState.value) {
                Districts.push({ value: district._id, label: district.title });
            }
        });

        // const districtArr = districtsData.find(district => district.stateId._id === selectedState.value);
        setOptions(Districts);
        console.log(Districts);

        // districtArr.forEach(row => Districts.push({ value: row._id, label: row.title}));

    }

    function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });

        setSelectedDistrict(selectedDistrict.value);
    }


    // const states  = [
    //     { value: '01', label: 'Andhrapradesh' },
    //     { value: '02', label: 'Telangana' },
    //     { value: '03', label: 'Tamilnadu' }
    //   ];

    const States = [];

    states.forEach(row => States.push({ value: row._id, label: row.title }));



    document.title = "Create Area | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Area" pageTitle="Area Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Area" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">State</Label>
                                                        <Select onChange={handleSelectState} options={States} name='stateId' id='stateId' />
                                                        {errors && errors.stateId && (
                                                            <div className="text-danger">
                                                                {errors.stateId}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">District</Label>
                                                        <Select onChange={handleSelectDistrict} options={options} />
                                                        {errors && errors.districtId && (
                                                            <div className="text-danger">
                                                                {errors.districtId}
                                                            </div>
                                                        ) }

                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">Area name</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="title" id="title" placeholder="Title" />
                                                        {errors && errors.title && (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" placeholder="URL Slug" />
                                                        {errors && errors.url && (
                                                            <div className="text-danger">
                                                                {errors.url}
                                                            </div>
                                                        ) }
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
                                                        <textarea className="form-control" placeholder="Meta Title" onChange={e => onChange(e)} name="metaTitle" id="metaTitle" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                        <textarea className="form-control" placeholder="Meta Description" onChange={e => onChange(e)} name="metaDescription" id="metaDescription" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                        <textarea className="form-control" placeholder="Meta Keywords" onChange={e => onChange(e)} name="metaKeywords" id="metaKeywords" rows="3"></textarea>
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


        </React.Fragment>
    );
}

CreateArea.propTypes = {
    createArea: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    state: state.state,
});


export default connect(mapStateToProps, { createArea, getStates, getDistricts })(CreateArea);
