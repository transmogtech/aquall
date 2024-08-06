import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { getCountTypes } from '../../../actions/countType';
import { getCultureTypes } from '../../../actions/cultureType';
import { getCountAreas } from '../../../actions/countArea';
import { updateCount, getCount } from '../../../actions/count';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const CreateCount = ({ getCountTypes, getCultureTypes, getCountAreas, updateCount, getCount, countType: { counttypes }, cultureType: { culturetypes }, countArea: { countareas } }) => {

    const { id } = useParams();
    const [count, setCount] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCultureType, setSelectedCultureType] = useState(null);
    const [selectedCountArea, setSelectedCountArea] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const CountPercent = [];
    // const CountPercent = [
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" },
    //     { count: '', volume: "" }
    // ];

    const [counter, setCounter] = useState([]);

    useEffect(() => {
        getCountTypes();
        getCultureTypes();
        getCountAreas();
        const fetchtData = async () => {
            const response = await getCount(id);
            setCount(response);
            setSelectedCategory(response.categoryId.title);
            setSelectedCountArea(response.countareaId.title);
            setSelectedCultureType(response.culturetypeId.title);
            // console.log(response.counts[2].count);
            const count = response.counts;
            count.forEach((row, index) => {
                CountPercent.push({ count: row.count, volume: row.volume });
            });
            setCounter(CountPercent);
            setLoading(false);

        }
        fetchtData();

    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const CountType = [];
    const CountArea = [];
    const CultuteType = [];
    counttypes.forEach(row => CountType.push({ value: row._id, label: row.title }));
    countareas.forEach(row => CountArea.push({ value: row._id, label: row.title }));
    culturetypes.forEach(row => CultuteType.push({ value: row._id, label: row.title }));

    function handleSelectCultureType(selectedCultureType) {
        setFormData({ ...formData, culturetypeId: selectedCultureType.value });

        setSelectedCultureType(selectedCultureType.label);
    }


    function handleSelectCountArea(selectedCountArea) {
        setFormData({ ...formData, countareaId: selectedCountArea.value });

        setSelectedCountArea(selectedCountArea.label);
    }

    function handleSelectedCategory(selectedCategory) {
        setFormData({ ...formData, categoryId: selectedCategory.value });

        setSelectedCategory(selectedCategory.label);
    }
    console.log(counter);


    const handleCounterChange = (e, index) => {


        const values = [...counter];
        const updatedValue = e.target.name;
        values[index][updatedValue] = e.target.value;
        setCounter(values);

        setFormData({ ...formData, counts: values });

    };

    const handleSubmit = () => {


        updateCount(id, formData);

        navigate('/counts');
    }



    document.title = "Create Count | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Create Count" pageTitle="Count Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Create Count" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                                <Select value={{ label: selectedCategory }} onChange={handleSelectedCategory} options={CountType} />
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                                <Select value={{ label: selectedCultureType }} onChange={handleSelectCultureType} options={CultuteType} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Count Area</Label>
                                                                <Select value={{ label: selectedCountArea }} onChange={handleSelectCountArea} options={CountArea} />
                                                            </div>
                                                        </Col>
                                                    </Row>


                                                    <Row className="gy-4 mt-3">

                                                        {
                                                            counter.map((count, index) => (


                                                                < Col xxl={6} md={6} className='mt-3' key={index} >
                                                                    <h6 className=''>Count {index + 1}</h6>
                                                                    <Row className="gy-4 mt-3 border-top">
                                                                        <Col xxl={6} md={6} className='mt-3 mb-3 '>
                                                                            <Input name="count" className='form-control' placeholder={`Count ${(index + 1)} `} defaultValue={count.count} onChange={e => handleCounterChange(e, index)} />
                                                                        </Col>

                                                                        <Col xxl={6} md={6} className='mt-3 mb-3'>

                                                                            <Input name="volume" className='form-control' defaultValue={count.volume} placeholder={`Volume ${(index + 1)}`} onChange={e => handleCounterChange(e, index)} />
                                                                        </Col>

                                                                    </Row>
                                                                </Col>

                                                            ))
                                                        }
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
                </Fragment>)
            }

        </React.Fragment >
    );
}


CreateCount.propTypes = {
    getCountAreas: PropTypes.func.isRequired,
    getCountTypes: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
    getCount: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    countType: PropTypes.object.isRequired,
    countArea: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    countType: state.countType,
    countArea: state.countArea,
    cultureType: state.cultureType,
});


export default connect(mapStateToProps, { updateCount, getCount, getCountAreas, getCountTypes, getCultureTypes })(CreateCount);