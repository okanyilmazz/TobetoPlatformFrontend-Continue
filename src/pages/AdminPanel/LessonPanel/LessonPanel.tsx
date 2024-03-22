import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import "./LessonPanel.css"
import GetListLessonResponse from '../../../models/responses/lesson/getListLessonResponse';
import { Paginate } from '../../../models/paginate';
import lessonService from '../../../services/lessonService';
import { Tooltip } from 'antd';
import { RiPencilFill } from 'react-icons/ri'
import Modals from '../../../components/Modal/Modals';
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap';
import TobetoSelect from '../../../utilities/customFormControls/TobetoSelect';
import TobetoTextInput from '../../../utilities/customFormControls/TobetoTextInput';
import AddLessonRequest from '../../../models/requests/lesson/addLessonRequest';
import UpdateLessonRequest from '../../../models/requests/lesson/updateLessonRequest';
import languageService from '../../../services/languageService';
import GetListLanguageResponse from '../../../models/responses/language/getListLanguageResponse';
import GetListLessonModuleResponse from '../../../models/responses/lessonModule/getListLessonModuleResponse';
import GetListLessonCategoryResponse from '../../../models/responses/lessonCategory/getListLessonCategoryResponse';
import lessonCategoryService from '../../../services/lessonCategoryService';
import GetListLessonSubTypeResponse from '../../../models/responses/lessonSubType/getListLessonSubTypeResponse';
import lessonSubTypeService from '../../../services/lessonSubTypeService';
import GetListProductionCompanyResponse from '../../../models/responses/productionCompany/getListProductionCompanyResponse';
import productionCompanyService from '../../../services/productionCompanyService';
import lessonModuleService from '../../../services/lessonModuleService';
import GetLessonResponse from '../../../models/responses/lesson/getLessonResponse';
import AdminPanelSideBarCard from '../../../components/AdminPanelSideBarCard/AdminPanelSideBarCard';
import AddEducationProgramLessonRequest from '../../../models/requests/educationProgramLesson/addEducationProgramLessonRequest';
import educationProgramLessonService from '../../../services/educationProgramLessonService';
import { GetListEducationProgramResponse } from '../../../models/responses/educationProgram/getListEducationProgramResponse';
import educationProgramService from '../../../services/educationProgramService';
import UpdateEducationProgramLessonRequest from '../../../models/requests/educationProgramLesson/updateEducationProgramLessonRequest';



export default function LessonPanel() {

    const [lessons, setLessons] = useState<Paginate<GetListLessonResponse>>();
    const [filteredLessons, setFilteredLessons] = useState<Paginate<GetListLessonResponse>>();
    const [showModal, setShowModal] = useState(false);
    const [addClick, setAddClick] = useState<boolean>(false)
    const [updateClick, setUpdateClick] = useState<boolean>(false)
    const [selectedLessonId, setSelectedLessonId] = useState<any>()
    const [languages, setLanguages] = useState<Paginate<GetListLanguageResponse>>();
    const [lessonModules, setLessonModules] = useState<Paginate<GetListLessonModuleResponse>>();
    const [lessonCategories, setLessonCategories] = useState<Paginate<GetListLessonCategoryResponse>>();
    const [lessonSubTypes, setLessonSubTypes] = useState<Paginate<GetListLessonSubTypeResponse>>();
    const [productionCompanies, setProductionCompanies] = useState<Paginate<GetListProductionCompanyResponse>>();
    const [selectedLesson, setSelectedLesson] = useState<GetLessonResponse>();
    const [educationPrograms, setEducationPrograms] = useState<Paginate<GetListEducationProgramResponse>>();


    const handleAddClick = () => {
        setShowModal(true);
        setAddClick(true)
    };

    const handleUpdatedClick = (selectedLessonId: any) => {
        setShowModal(true);
        setUpdateClick(true);
        setSelectedLessonId(selectedLessonId);
    };

    const closeModal = () => {
        setUpdateClick(false);
        setAddClick(false);
        setShowModal(false)
    }


    useEffect(() => {

        lessonService.getAll(0, 100).then(result => {
            setLessons(result.data);
            setFilteredLessons(result.data);
        });

        languageService.getAll(0, 100).then(result => {
            setLanguages(result.data);
        });

        lessonCategoryService.getAll(0, 100).then(result => {
            setLessonCategories(result.data)
        })

        lessonSubTypeService.getAll(0, 100).then(result => {
            setLessonSubTypes(result.data)
        })

        productionCompanyService.getAll(0, 100).then(result => {
            setProductionCompanies(result.data)
        })

        lessonModuleService.getAll(0, 100).then(result => {
            setLessonModules(result.data)
        })
        educationProgramService.getAll(0, 100).then((result: any) => {
            setEducationPrograms(result.data)
        })
    }, []);

    useEffect(() => {
        lessonService.getById(selectedLessonId).then(result => {
            setSelectedLesson(result.data)
        })
    }, [selectedLessonId])


    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (filteredLessons) {
            if (searchText.length > 0) {
                const newFilteredItems = filteredLessons.items.filter(lesson =>
                    lesson.name.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListLessonResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setLessons(filteredItems);
            } else {
                setLessons(filteredLessons);
            }
        }
    };


    const updateInitialValues = {
        languageId: selectedLesson?.languageId,
        lessonModuleId: selectedLesson?.lessonModuleId,
        lessonCategoryId: selectedLesson?.lessonCategoryId,
        lessonSubTypeId: selectedLesson?.lessonSubTypeId,
        productionCompanyId: selectedLesson?.productionCompanyId,
        name: selectedLesson?.name,
        startDate: selectedLesson?.startDate,
        endDate: selectedLesson?.endDate,
        duration: selectedLesson?.duration,
        lessonPath: selectedLesson?.lessonPath,
    }

    const addInitialValues = {
        languageId: "",
        lessonModuleId: "",
        lessonCategoryId: "",
        lessonSubTypeId: "",
        productionCompanyId: "",
        name: "",
        startDate: "",
        endDate: "",
        duration: "",
        lessonPath: "",
        educationProgramId: ""
    }

    const getLesson = () => {
        lessonService.getAll(0, 100).then(result => {
            setLessons(result.data);
        })
    }

    const handleAddLesson = async (lesson: any) => {

        const addLesson: AddLessonRequest = {
            languageId: lesson.languageId,
            lessonModuleId: lesson.lessonModuleId,
            lessonCategoryId: lesson.lessonCategoryId,
            lessonSubTypeId: lesson.lessonSubTypeId,
            productionCompanyId: lesson.productionCompanyId,
            name: lesson.name,
            startDate: lesson.startDate,
            endDate: lesson.endDate,
            duration: lesson.duration,
            lessonPath: lesson.lessonPath,
        }

        var result = await lessonService.add(addLesson);

        const addEducationProgramLesson: AddEducationProgramLessonRequest = {
            lessonId: result.data.id,
            educationProgramId: lesson.educationProgramId
        }

        await educationProgramLessonService.add(addEducationProgramLesson)
        getLesson()
        closeModal()


    }

    const handleUpdateLesson = async (lesson: any) => {
        console.log(lesson);

        const updateLesson: UpdateLessonRequest = {
            id: selectedLessonId,
            languageId: lesson.languageId,
            lessonModuleId: lesson.lessonModuleId,
            lessonCategoryId: lesson.lessonCategoryId,
            lessonSubTypeId: lesson.lessonSubTypeId,
            productionCompanyId: lesson.productionCompanyId,
            name: lesson.name,
            startDate: lesson.startDate,
            endDate: lesson.endDate,
            duration: lesson.duration,
            lessonPath: lesson.lessonPath

        }

        var result = await lessonService.update(updateLesson)

        const updateEducationProgramLesson: UpdateEducationProgramLessonRequest = {
            id: selectedLessonId,
            lessonId: result.data.id,
            educationProgramId: lesson.educationProgramId
        }
        await educationProgramLessonService.update(updateEducationProgramLesson)


        getLesson();
        closeModal()
    }

    const handleDeleteLesson = async (lessonId: any) => {
        await lessonService.delete(lessonId);
        getLesson();
    }

    return (
        <div className='container'>
            <div className="row lesson-panel">
                <AdminPanelSideBarCard />

                <div className="lesson-panel-content col-md-9">

                    <div className="search">
                        <div className="input-container">
                            <input type="text" id="search" onChange={handleInputFilter} placeholder="Arama" />
                            <IoSearch className="search-icon" />
                        </div>
                    </div>

                    <div className="table-responsive-sm">
                        <table className="mt-8 corpTable table table-hover">
                            <thead>
                                <tr>
                                    <th className='lesson-name'>Ders Adı</th>
                                    <th className="lesson-start-date">Başlangıç Tarihi</th>
                                    <th className='lesson-end-date'>Bitiş Tarihi</th>
                                    <th className='lesson-production-company-name'>Şirket Adı</th>
                                    <th className='td-icons text-center'>İşlem</th>
                                </tr>
                            </thead>

                            <tbody className='lesson-panel-table-body' >
                                {
                                    lessons?.items.map((lesson) => (
                                        <tr>
                                            <td className='lesson-name'>{lesson.name}</td>
                                            <td className='lesson-end-date'>{new Date(lesson.startDate).toLocaleDateString()}</td>
                                            <td className="lesson-start-date">{new Date(lesson.endDate).toLocaleDateString()}</td>
                                            <td className='lesson-production-company-name'>{lesson.productionCompanyName}</td>
                                            <td className='td-icons '>

                                                <Tooltip placement="top" title={"Silme"}>
                                                    <span onClick={() => handleDeleteLesson(lesson.id)} className="trash-icon"></span>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Düzenleme">
                                                    <RiPencilFill onClick={() => handleUpdatedClick(lesson.id)} className='admin-edit-icon' />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr >
                                    <td className='text-center add-new-data' onClick={handleAddClick} colSpan={5}>
                                        <span>Yeni ders ekle</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modals
                    className="lesson-modal"
                    show={showModal}
                    onHide={() => closeModal()}
                    header={true}
                    title={
                        updateClick ? "Ders Güncelleme" : "Ders Ekleme"
                    }
                    body={
                        <>
                            <div className="lesson-add-form formik-form" style={addClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={addInitialValues}
                                    onSubmit={(values) => {
                                        handleAddLesson(values)
                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">İsim</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="name"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Süre (sn)</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="duration"
                                                    placeholderTextColor="#fff"
                                                    type="number" />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Dili</span>

                                                <TobetoSelect
                                                    name="languageId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {languages?.items.map((language) => (
                                                        <option value={String(language.id)}>
                                                            {language.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Modül</span>

                                                <TobetoSelect
                                                    name="lessonModuleId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz </option>
                                                    {lessonModules?.items.map((lessonModule) => (
                                                        <option value={String(lessonModule.id)}>
                                                            {lessonModule.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title"> Alt Tip</span>

                                                <TobetoSelect
                                                    name="lessonSubTypeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {lessonSubTypes?.items.map((lessonSubType) => (
                                                        <option value={String(lessonSubType.id)}>
                                                            {lessonSubType.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Kategori</span>

                                                <TobetoSelect
                                                    name="lessonCategoryId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {lessonCategories?.items.map((lessonCategory) => (
                                                        <option value={String(lessonCategory.id)}>
                                                            {lessonCategory.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Yolu</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="lessonPath"
                                                    placeholderTextColor="#fff" />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Üretici Firma</span>

                                                <TobetoSelect
                                                    name="productionCompanyId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {productionCompanies?.items.map((productionCompany) => (
                                                        <option value={String(productionCompany.id)}>
                                                            {productionCompany.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>

                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Başlangıç Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="startDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Bitiş Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="endDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitim Programı Adı</span>

                                                <TobetoSelect
                                                    name="educationProgramId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="EducationProgram">Seçiniz*</option>
                                                    {educationPrograms?.items.map((educationProgram) => (
                                                        <option value={String(educationProgram.id)}>
                                                            {educationProgram.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>

                                        <div className='form-buttons'>
                                            <Button className="mb-4" type="submit" style={updateClick ? { display: 'block' } : { display: 'none' }}   >
                                                Güncelle
                                            </Button>
                                            <Button className="mb-4" type="submit" style={addClick ? { display: 'block' } : { display: 'none' }}   >
                                                Kaydet
                                            </Button>
                                            <Button className="mb-4" onClick={() => closeModal()}>
                                                Kapat
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>

                            <div className="lesson-update-form formik-form" style={updateClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={updateInitialValues}
                                    onSubmit={(values) => {
                                        handleUpdateLesson(values)
                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">İsim</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="name"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Süre (sn)</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="duration"
                                                    placeholderTextColor="#fff"
                                                    type="number" />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Dili</span>

                                                <TobetoSelect
                                                    name="languageId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Language">Seçiniz*</option>
                                                    {languages?.items.map((language) => (
                                                        <option value={String(language.id)}>
                                                            {language.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Modül</span>

                                                <TobetoSelect
                                                    name="lessonModuleId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Module">Seçiniz </option>
                                                    {lessonModules?.items.map((lessonModule) => (
                                                        <option value={String(lessonModule.id)}>
                                                            {lessonModule.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title"> Alt Tip</span>

                                                <TobetoSelect
                                                    name="lessonSubTypeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SubType">Seçiniz*</option>
                                                    {lessonSubTypes?.items.map((lessonSubType) => (
                                                        <option value={String(lessonSubType.id)}>
                                                            {lessonSubType.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Kategori</span>

                                                <TobetoSelect
                                                    name="lessonCategoryId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Category">Seçiniz*</option>
                                                    {lessonCategories?.items.map((lessonCategory) => (
                                                        <option value={String(lessonCategory.id)}>
                                                            {lessonCategory.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Yolu</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="lessonPath"
                                                    placeholderTextColor="#fff" />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Üretici Firma</span>

                                                <TobetoSelect
                                                    name="productionCompanyId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="ProductionCompany">Seçiniz*</option>
                                                    {productionCompanies?.items.map((productionCompany) => (
                                                        <option value={String(productionCompany.id)}>
                                                            {productionCompany.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>

                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Başlangıç Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="startDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Bitiş Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="endDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitim Programı Adı</span>

                                                <TobetoSelect
                                                    name="educationProgramId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="EducationProgram">Seçiniz*</option>
                                                    {educationPrograms?.items.map((educationProgram) => (
                                                        <option value={String(educationProgram.id)}>
                                                            {educationProgram.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>
                                        <div className='form-buttons'>
                                            <Button className="mb-4" type="submit" style={updateClick ? { display: 'block' } : { display: 'none' }}   >
                                                Güncelle
                                            </Button>
                                            <Button className="mb-4" type="submit" style={addClick ? { display: 'block' } : { display: 'none' }}   >
                                                Kaydet
                                            </Button>
                                            <Button className="mb-4" onClick={() => closeModal()}>
                                                Kapat
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </>
                    }
                />
            </div >
        </div >

    )
}
