import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Select from "react-select";
import { updateUser, getUser } from '../../../actions/user';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import { getAreas } from '../../../actions/area';
import { getPincodes } from '../../../actions/pincode';
import { getUserRoles } from '../../../actions/userRole';
import Loader from '../../../Components/Common/Loader';

const EditUser = ({ updateUser, getStates, getDistricts, getAreas, getPincodes, getUserRoles, getUser, state: { states }, district: { districts }, area: { areas }, pincode: { pincodes }, userRole: { userroles } }) => {

    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedState, setSelectedState] = useState(null);
    // const [options, setOptions] = useState([]);
    // const [areas, setAreas] = useState([]);
    // const [pincodes, setPincodes] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedPincode, setSelectedPincode] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState(null);


    const Districts = [];
    const Areas = [];
    const Pincodes = [];
    const States = [];
    const UserRoles = [];



    // const districtsData = useSelector(state => state.district.districts);
    // const areaData = useSelector(state => state.area.areas);
    // const states = useSelector(state => state.state.states);
    // const pincodeData = useSelector(state => state.pincode.pincodes);
    // const userroles = useSelector(state => state.userRole.userroles);

    useEffect(() => {
        getStates();
        getUserRoles();
        const userData = async () => {
            const response = await getUser(id);
            console.log(response);
            setUser(response);
            setSelectedState(response.stateId.title);
            setSelectedDistrict(response.districtId.title);
            setSelectedArea(response.areaId.title);
            setSelectedPincode(response.pincodeId?.title);
            setSelectedUserRole(response.userroleId.title);
            getDistricts({ stateId: response.stateId._id });
            getAreas({ districtId: response.districtId._id });
            getPincodes({ areaId: response.areaId._id });
            setLoading(false);

        }
        userData();
    }, []);



    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    async function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });

        setSelectedState(selectedState.label);

        setSelectedDistrict("");
        setFormData({ ...formData, districtId: "" });
        setSelectedArea("");
        setFormData({ ...formData, areaId: "" });
        setSelectedPincode("");
        setFormData({ ...formData, pincodeId: "" });
        // districtsData.forEach(district => {
        //     if (district.stateId._id === selectedState.value) {
        //         Districts.push({ value: district._id, label: district.title });
        //     }
        // });

        // setOptions(Districts);

        await getDistricts({ stateId: selectedState.value });

    }

    async function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });

        setSelectedDistrict(selectedDistrict.label);
        setSelectedArea("");
        setFormData({ ...formData, areaId: "" });
        setSelectedPincode("");
        setFormData({ ...formData, pincodeId: "" });
        await getAreas({ districtId: selectedDistrict.value });
        // areaData.forEach(area => {
        //     if (area.districtId._id === selectedDistrict.value) {
        //         Areas.push({ value: area._id, label: area.title });
        //     }
        // });

        // setAreas(Areas);
    }


    async function handleSelectArea(selectedArea) {
        setFormData({ ...formData, areaId: selectedArea.value });

        setSelectedArea(selectedArea.label);
        setSelectedPincode("");
        setFormData({ ...formData, pincodeId: "" });
        // pincodeData.forEach(pincode => {
        //     if (pincode.areaId._id === selectedArea.value) {
        //         Pincodes.push({ value: pincode._id, label: pincode.title });
        //     }
        // });
        await getPincodes({ areaId: selectedArea.value });
        // setPincodes(Pincodes);

    }

    function handleSelectPincode(selectedPincode) {
        setFormData({ ...formData, pincodeId: selectedPincode.value });

        setSelectedPincode(selectedPincode.label);
    }



    function handleSelectUserRole(selectedUserRole) {
        setFormData({ ...formData, userroleId: selectedUserRole.value });

        setSelectedUserRole(selectedUserRole.label);
    }



    // states.forEach(row => States.push({ value: row._id, label: row.title }));
    userroles.forEach(row => UserRoles.push({ value: row._id, label: row.title }));

    states.forEach(row => States.push({ value: row._id, label: row.title }));
    districts.forEach(district => { Districts.push({ value: district._id, label: district.title }); });
    areas.forEach(area => { Areas.push({ value: area._id, label: area.title }); });
    pincodes.forEach(area => { Pincodes.push({ value: area._id, label: area.title }); });

    const handleSubmit = () => {


        updateUser(id, formData);

        navigate('/users');
    }

    document.title = "Edit User | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit User" pageTitle="User Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit User" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">User Role</Label>
                                                                    <Select value={{ label: selectedUserRole }} onChange={handleSelectUserRole} options={UserRoles} placeholder="User Role" />

                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                                    <Input type="text" className="form-control" name="name" onChange={e => onChange(e)} placeholder="Name" defaultValue={user.name} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Email Address</Label>
                                                                    <Input type="email" className="form-control" name="email" onChange={e => onChange(e)} placeholder="Email Address" readOnly defaultValue={user.email} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Mobile Number</Label>
                                                                    <Input type="number" className="form-control" name="mobile" onChange={e => onChange(e)} placeholder="Mobile Number" readOnly defaultValue={user.mobile} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                                    <Select value={{ label: selectedState }} onChange={handleSelectState} options={States} />
                                                                </div>
                                                            </Col>


                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">District</Label>
                                                                    <Select value={{ label: selectedDistrict }} onChange={handleSelectDistrict} options={Districts} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Area</Label>
                                                                    <Select value={{ label: selectedArea }} onChange={handleSelectArea} options={Areas} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Pincode</Label>
                                                                    <Select value={{ label: selectedPincode }} onChange={handleSelectPincode} options={Pincodes} />
                                                                </div>
                                                            </Col>




                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/users" className='btn btn-primary'>Cancel</Link>
                                                        <Button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </Col>

                                    </Row>





                                </Form>
                            </Container>

                        </div>
                    </>
                )
            }
        </React.Fragment>
    );
}


EditUser.propTypes = {
    updateUser: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getPincodes: PropTypes.func.isRequired,
    getUserRoles: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    district: PropTypes.object.isRequired,
    area: PropTypes.object.isRequired,
    pincode: PropTypes.object.isRequired,
    userRole: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    state: state.state,
    district: state.district,
    area: state.area,
    pincode: state.pincode,
    userRole: state.userRole
});


export default connect(mapStateToProps, { updateUser, getStates, getDistricts, getAreas, getPincodes, getUserRoles, getUser })(EditUser);
