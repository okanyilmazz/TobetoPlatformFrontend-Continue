import './EducationalBackgroundPage.css';
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form } from "formik";
import DeleteCard from '../../components/DeleteCard/DeleteCard';
import { Paginate } from '../../models/paginate';
import TobetoSelect from '../../utilities/customFormControls/TobetoSelect';
import authService from '../../services/authService';
import SidebarCard from '../../components/SidebarCard/SidebarCard';
import universityService from '../../services/universityService';
import degreeTypeService from '../../services/degreeTypeService';
import universityDepartmentService from '../../services/universityDepartmentService';
import accountUniversityService from '../../services/accountUniversityService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import AddAccountUniversityRequest from '../../models/requests/accountUniversity/addAccountUniversityRequest';
import GetListUniversityResponse from '../../models/responses/university/getListUniversityResponse';
import GetListUniversityDepartmentResponse from '../../models/responses/universityDepartment/getListUniversityDepartmentResponse';
import GetListAccountUniversityResponse from '../../models/responses/accountUniversity/getListAccountUniversityResponse';
import { GetListDegreeTypeResponse } from '../../models/responses/degreeType/getListDegreeTypeResponse';
import { REQUIRED_MESSAGE } from '../../environment/messages';

export default function EducationalBackgroundPage() {
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const user = authService.getUserInfo();
    const [universities, setUniversities] = useState<Paginate<GetListUniversityResponse>>();
    const [universityDepartments, setuniversityDepartments] = useState<Paginate<GetListUniversityDepartmentResponse>>();
    const [accountUniversities, setAccountUniversities] = useState<Paginate<GetListAccountUniversityResponse>>();
    const [degreeTypes, setDegreeTypes] = useState<Paginate<GetListDegreeTypeResponse>>();
    const [selectedUniversityId, setSelectedUniversityId] = useState<any>("Üniversite");
    const [selectedDegreeTypeId, setSelectedDegreeTypeId] = useState<any>("Eğitim Durumu");
    const [selectedUniversityDepartmenteId, setselectedUniversityDepartmenteId] = useState<any>("Bölüm");
    const [isChecked, setIsChecked] = useState(false);
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const validationSchema = Yup.object().shape({
        educationLevel: Yup.string().required(REQUIRED_MESSAGE),
        university: Yup.string().required(REQUIRED_MESSAGE),
        universityDepartment: Yup.string().required(REQUIRED_MESSAGE),
    });

    const initialValues = {
        educationLevel: "",
        university: "",
        universityDepartment: "",
        startDate: "",
        endDate: "",
        isEducationActive: false
    };

    useEffect(() => {
        universityService.getAll(0, 5).then((result) => {
            setUniversities(result.data);
        });

        degreeTypeService.getAll(0, 10).then((result) => {
            setDegreeTypes(result.data)
        });

        universityDepartmentService.getAll(0, 10).then((result) => {
            setuniversityDepartments(result.data)
        });

        accountUniversityService.getByAccountId(user.id, 0, 5).then((result) => {
            setAccountUniversities(result.data);
        });

    }, []);

    const handleUniversities = (event: any) => {
        setSelectedUniversityId(event.target.value)
    }

    const handleDegreeTypes = (event: any) => {
        setSelectedDegreeTypeId(event.target.value)
    }

    const handleUniversityDepartments = (event: any) => {
        setselectedUniversityDepartmenteId(event.target.value)
    }

    const handleStartDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    function changeColor(event: any) {
        const checkbox = event.target;
        const checkmark = checkbox.nextElementSibling;
        if (checkbox.checked) {
            checkmark.style.backgroundColor = "#9933ff";
        } else {
            checkmark.style.backgroundColor = "#ffffff";
        }
        setIsChecked(!isChecked);
    }

    const addAccountUniversity = async (values: any) => {
        if (startDate && endDate) {
            const addAccountUniversity: AddAccountUniversityRequest = {
                degreeTypeId: values.educationLevel,
                accountId: user.id,
                endDate: String(endDate.getFullYear()),
                startDate: String(startDate.getFullYear()),
                universityId: values.university,
                universityDepartmentId: values.universityDepartment,
                isEducationActive: isChecked
            }
            await accountUniversityService.add(addAccountUniversity);
            getAccountUniversity();
        }
    }

    const deleteAccountUniversity = async (accountUniversity: any) => {
        await accountUniversityService.delete(accountUniversity.id);
        setShowDeleteCard(false);
        getAccountUniversity();
    }

    const getAccountUniversity = () => {
        accountUniversityService.getByAccountId(user.id, 0, 3).then((result) => {
            setAccountUniversities(result.data);
        })
    }

    return (
        <div className='education-background-page container'>
            <div className='side-bar-card'>
                <SidebarCard />
            </div>
            <div className="profile-details-page col-md-9 col-lg-9 col-12">
                <Row>
                    <div className="col-md-12 formik-form mt-5">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => { addAccountUniversity(values) }}
                        >
                            {({ errors, touched }) => (
                                <Form className="login-form">
                                    <Row>
                                        <Col md={6}>
                                            <span className="input-area-title">Eğitim Durumu*</span>
                                            <TobetoSelect
                                                name="educationLevel"
                                                className="mb-4"
                                                component="select"
                                                onChange={(event: any) => { handleDegreeTypes(event) }}
                                                value={selectedDegreeTypeId}
                                            >
                                                <option value="educationLevel">Seviye Seçiniz</option>
                                                {degreeTypes?.items.map((degreeType, index) => (
                                                    <option key={index} value={String(degreeType.id)}>
                                                        {degreeType.name}
                                                    </option>
                                                ))}
                                            </TobetoSelect>
                                        </Col>
                                        <Col md={6}>
                                            <span className="input-area-title">Üniversite*</span>
                                            <TobetoSelect
                                                name="university"
                                                className="mb-4"
                                                component="select"
                                                onChange={(event: any) => { handleUniversities(event) }}
                                                value={selectedUniversityId}
                                            >
                                                <option value="university">Üniversite Seçiniz</option>
                                                {universities?.items.map((university, index) => (
                                                    <option key={index} value={String(university.id)}>
                                                        {university.name}
                                                    </option>
                                                ))}
                                            </TobetoSelect>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <span className="input-area-title">Bölüm*</span>
                                            <TobetoSelect
                                                name="universityDepartment"
                                                className="mb-4"
                                                component="select"
                                                onChange={(event: any) => { handleUniversityDepartments(event) }}
                                                value={String(selectedUniversityDepartmenteId)}
                                            >
                                                <option value="universityDepartment">Bölüm Seçiniz</option>
                                                {universityDepartments?.items.map((universityDepartment, index) => (
                                                    <option key={index} value={String(universityDepartment.id)}>
                                                        {universityDepartment.name}
                                                    </option>
                                                ))}
                                            </TobetoSelect>
                                        </Col>
                                        <Col md={6}>
                                            <span className="input-area-title-date">Başlangıç Yılı*</span>
                                            <DatePicker
                                                name="startDate"
                                                className='formik-form react-datepicker-ignore-onclickoutside'
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                showYearPicker
                                                dateFormat="yyyy"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <span className="input-area-title">Mezuniyet Yılı*</span>
                                            <DatePicker
                                                name="endDate"
                                                className='formik-form react-datepicker-ignore-onclickoutside'
                                                selected={endDate}
                                                onChange={handleEndDateChange}
                                                showYearPicker
                                                dateFormat="yyyy"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <label className="-education-custom-checkbox mt-3">
                                            <input type="checkbox" onChange={changeColor} checked={isChecked} />
                                            <span className="education-checkmark"></span>
                                            <span className='education-check-text '>Devam Ediyorum</span>
                                        </label>
                                    </Row>
                                    <Button className="mb-4 mt-5" type="submit">
                                        Kaydet
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        {accountUniversities?.items.map((accountUniversity, index) => (
                            <div className='edu-back-shadow'>
                                <Row className="educational-background-row">
                                    <div key={index} className='educational-background'>
                                        <img className='edu-back-img' src="https://tobeto.com/grade-date.svg" alt="Grade Date" />
                                        <p className='education-back-date'>
                                            {`${new Date(accountUniversity.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })} - 
                                              ${new Date(accountUniversity.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                                        </p>
                                        <p className='education-back-p'>{accountUniversity.degreeTypeName}</p>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='edu-back-first'>
                                        <div className='educational-back-uni'>
                                            <div>
                                                <span className='educational-back-uni-header'>Üniversite</span>
                                            </div>
                                            <div>
                                                <span className='educational-back-uni-content'>{accountUniversity.universityName}</span>
                                            </div>
                                        </div>
                                        <div className='educational-back-uni'>
                                            <div>
                                                <span className='educational-back-uni-header'>Bölüm</span>
                                            </div>
                                            <div>
                                                <span className='educational-back-uni-content'>{accountUniversity.universityDepartmentName}</span>
                                            </div>
                                        </div>
                                        <button className="edu-delete-btn" onClick={() => setShowDeleteCard(true)} >
                                            <img src="https://tobeto.com/trash.svg" alt="Delete" />
                                        </button>
                                    </div>
                                    {showDeleteCard && (
                                        <DeleteCard
                                            show={showDeleteCard}
                                            handleClose={() => setShowDeleteCard(false)}
                                            handleDelete={() => deleteAccountUniversity(accountUniversity)}
                                            body="eğitimi"
                                        />
                                    )}
                                </Row>
                            </div>
                        ))}
                    </div>
                </Row>
            </div >
        </div >
    )
}
