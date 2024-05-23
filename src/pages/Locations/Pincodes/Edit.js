import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";
import { useNavigate, useParams } from 'react-router-dom';

import { getPincodes, updatePincode } from '../../../actions/pincode';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import { getAreas } from '../../../actions/area';

const EditPincode = ({ updatePincode, getStates, getDistricts, getAreas, getPincodes }) => {
    let { id } = useParams();



    useEffect(() => {
        getStates();
        getDistricts();
        getAreas();
        getPincodes();
    }, []);



    const pincodes = useSelector(state => state.pincode.pincodes);
    const pincode = pincodes.find(pincode => pincode._id === id);


    const districtsData = useSelector(state => state.district.districts);
    const areaData = useSelector(state => state.area.areas);
    const states = useSelector(state => state.state.states);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedState, setSelectedState] = useState(pincode.stateId.title);
    const [options, setOptions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(pincode.districtId.title);
    const [selectedArea, setSelectedArea] = useState(pincode.areaId.title);
    const Districts = [];
    const Areas = [];
    const States = [];



    districtsData.forEach(district => {
        if (district.stateId._id === pincode.stateId._id) {
            options.push({ value: district._id, label: district.title });
        }
    });


    areaData.forEach(area => {
        if (area.districtId._id === pincode.districtId._id) {
            areas.push({ value: area._id, label: area.title });
        }
    });
    const categories = [
        {
            _id: '34e65467',
            title: 'Feed',
            charge: pincode.delivery[0].charge,
            days: pincode.delivery[0].days
        },
        {
            _id: '34e65437',
            title: 'Seed',
            charge: pincode.delivery[1].charge,
            days: pincode.delivery[1].days
        },
        {
            _id: '34e65462',
            title: 'Chemical',
            charge: pincode.delivery[2].charge,
            days: pincode.delivery[2].days
        },
        {
            _id: '34w65467',
            title: 'Aerators',
            charge: pincode.delivery[3].charge,
            days: pincode.delivery[3].days
        }
    ];

    const [delivery, setDelivery] = useState(categories);




    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });

        setSelectedState(selectedState.label);


        districtsData.forEach(district => {
            if (district.stateId._id === selectedState.value) {
                Districts.push({ value: district._id, label: district.title });
            }
        });

        setOptions(Districts);


    }

    function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });

        setSelectedDistrict(selectedDistrict.label);


        areaData.forEach(area => {
            if (area.districtId._id === selectedDistrict.value) {
                Areas.push({ value: area._id, label: area.title });
            }
        });

        setAreas(Areas);
    }


    function handleSelectArea(selectedArea) {
        setFormData({ ...formData, areaId: selectedArea.value });

        setSelectedArea(selectedArea.label);
    }



    states.forEach(row => States.push({ value: row._id, label: row.title }));

    const handleDeliveryChange = (e, index) => {

        const values = [...delivery];
        const updatedValue = e.target.name;
        values[index][updatedValue] = e.target.value;
        setDelivery(values);

        setFormData({ ...formData, delivery: delivery });

    };

    const handleSubmit = () => {


        updatePincode(id, formData);

        navigate('/pincodes');
    }

    document.title = "Create Pincode | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Pincode" pageTitle="Pincode Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Pincode" />

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
                                                        <Label htmlFor="basiInput" className="form-label">Area</Label>
                                                        <Select value={{ label: selectedArea }} onChange={handleSelectArea} options={areas} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                        <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Name" defaultValue={pincode.title} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" className="form-control" name="url" onChange={e => onChange(e)} placeholder="URL Slug" defaultValue={pincode.url} />
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
                                    <PreviewCardHeader title="Delivery Details" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">

                                            {categories.map((category, index) => (
                                                <Row className="gy-4" key={index}>
                                                    <Col xxl={3} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Delivery Charges - {category.title}</Label>
                                                            <Input type="number" className="form-control" id="charge" name='charge' onChange={e => handleDeliveryChange(e, index)} placeholder="Delivery Charges" defaultValue={pincode.delivery[index].charge} />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Delivery Days - {category.title}</Label>
                                                            <Input type="number" className="form-control" name='days' id="days" onChange={e => handleDeliveryChange(e, index)} placeholder="Delivery Days" defaultValue={pincode.delivery[index].days} />
                                                        </div>

                                                    </Col>
                                                </Row>
                                            ))}


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
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={pincode.metaTitle}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={pincode.metaDescription}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={pincode.metaKeywords}></textarea>
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


EditPincode.propTypes = {
    updatePincode: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getPincodes: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    state: state.state,
});


export default connect(mapStateToProps, { updatePincode, getStates, getDistricts, getAreas, getPincodes })(EditPincode);
