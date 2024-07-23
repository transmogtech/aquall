import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSponsoredAd, getSponsoredAd } from '../../../actions/sponsoredAd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditSponsorAd = ({ updateSponsoredAd, getSponsoredAd }) => {

    let { id } = useParams();
    const [sponsoredad, setSponsoredAd] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getSponsoredAd(id);
            setSponsoredAd(response);
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
            // console.log(e.target.files);
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };
    const deleteImage = () => {
        setSponsoredAd({ ...sponsoredad, image: null });
    }

    const handleSubmit = () => {
        updateSponsoredAd(id, formData);

        navigate('/sponsor-ads');
    }


    document.title = "Edit Sponsor Ad | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit Sponsor Ad" pageTitle="Sponsor Ad Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit Sponsor Ad" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">


                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Sponsor Name</Label>
                                                                <Input type="text" className="form-control" name="name" placeholder="Sponsor Name" onChange={e => onChange(e)} defaultValue={sponsoredad.name} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                                <Input type="number" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} defaultValue={sponsoredad.discount} />
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                                {
                                                                    sponsoredad.image ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${sponsoredad.image}`} width="100%" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                                }
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                                <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} defaultValue={sponsoredad.url} />
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                                <Input type="text" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} defaultValue={sponsoredad.priority} />
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

                </Fragment>)
            }
        </React.Fragment>
    );
}

EditSponsorAd.propTypes = {
    updateSponsoredAd: PropTypes.func.isRequired,
    getSponsoredAd: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    sponsoredAd: state.sponsoredAd,
});

export default connect(mapStateToProps, { updateSponsoredAd, getSponsoredAd })(EditSponsorAd);
