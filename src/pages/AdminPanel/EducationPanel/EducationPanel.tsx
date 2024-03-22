import React, { useEffect, useState } from 'react';
import './EducationPanel.css';
import { Tooltip } from 'antd';
import { Paginate } from '../../../models/paginate';
import { GetListEducationProgramResponse } from '../../../models/responses/educationProgram/getListEducationProgramResponse';
import educationProgramService from '../../../services/educationProgramService';
import { IoSearch } from 'react-icons/io5';
import Modals from '../../../components/Modal/Modals';
import { RiPencilFill } from 'react-icons/ri';
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap';
import TobetoSelect from '../../../utilities/customFormControls/TobetoSelect';
import TobetoTextInput from '../../../utilities/customFormControls/TobetoTextInput';
import { GetEducationProgramResponse } from '../../../models/responses/educationProgram/getEducationProgramResponse';
import AddEducationProgramRequest from '../../../models/requests/educationProgram/addEducationProgramRequest';
import UpdateEducationProgramRequest from '../../../models/requests/educationProgram/updateEducationProgramRequest';
import GetListEducationProgramDevelopmentResponse from '../../../models/responses/educationProgramDevelopment/getListEducationProgramDevelopmentResponse';
import educationProgramDevelopmentService from '../../../services/educationProgramDevelopmentService';
import { GetListEducationProgramLevelResponse } from '../../../models/responses/educationProgramLevel/getListEducationProgramLevelResponse';
import educationProgramLevelService from '../../../services/educationProgramLevelService';
import GetListBadgeResponse from '../../../models/responses/badge/getListBadgeResponse';
import badgeService from '../../../services/badgeService';
import AdminPanelSideBarCard from '../../../components/AdminPanelSideBarCard/AdminPanelSideBarCard';

export default function EducationPanel() {
    const [educationPrograms, setEducationPrograms] = useState<Paginate<GetListEducationProgramResponse>>();
    const [originalEducationPrograms, setOriginalEducationPrograms] = useState<Paginate<GetListEducationProgramResponse>>();
    const [showModal, setShowModal] = useState(false);

    const [addClick, setAddClick] = useState<boolean>(false)
    const [updateClick, setUpdateClick] = useState<boolean>(false)
    const [selectedEducationProgram, setSelectedEducationProgram] = useState<GetEducationProgramResponse>();
    const [selectedEducationProgramId, setSelectedEducationProgramId] = useState<any>()

    const [educationProgramDevelopments, setEducationProgramDevelopments] = useState<Paginate<GetListEducationProgramDevelopmentResponse>>();
    const [educationProgramLevels, setEducationProgramLevels] = useState<Paginate<GetListEducationProgramLevelResponse>>();
    const [badges, setBadges] = useState<Paginate<GetListBadgeResponse>>();


    const handleAddClick = () => {
        setShowModal(true);
        setAddClick(true)
    };

    const handleUpdatedClick = (selectedEducationProgramId: any) => {
        setShowModal(true);
        setUpdateClick(true);
        setSelectedEducationProgramId(selectedEducationProgramId)
    };

    const closeModal = () => {
        setUpdateClick(false);
        setAddClick(false);
        setShowModal(false)
    }

    useEffect(() => {

        educationProgramService.getAll(0, 100).then(result => {
            setEducationPrograms(result.data);
            setOriginalEducationPrograms(result.data);
        });

        educationProgramDevelopmentService.getAll(0, 100).then(result => {
            setEducationProgramDevelopments(result.data)
        })

        educationProgramLevelService.getAll(0, 100).then(result => {
            setEducationProgramLevels(result.data)
        })

        badgeService.getAll(0, 100).then(result => {
            setBadges(result.data)
        })

    }, []);


    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (originalEducationPrograms) {
            if (searchText.length > 0) {
                const newFilteredItems = originalEducationPrograms.items.filter(program =>
                    program.name.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListEducationProgramResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setEducationPrograms(filteredItems);
            } else {
                setEducationPrograms(originalEducationPrograms);
            }
        }
    };

    useEffect(() => {
        educationProgramService.getById(selectedEducationProgramId).then(result => {
            setSelectedEducationProgram(result.data)
        })
    }, [selectedEducationProgramId])


    const updateInitialValues = {
        educationProgramLevelId: selectedEducationProgram?.educationProgramLevelId,
        educationProgramDevelopmentId: selectedEducationProgram?.educationProgramDevelopmentId,
        badgeId: selectedEducationProgram?.badgeId,
        name: selectedEducationProgram?.name,
        description: selectedEducationProgram?.description,
        thumbnailPath: selectedEducationProgram?.thumbnailPath,
        duration: selectedEducationProgram?.duration,
        authorizedPerson: selectedEducationProgram?.authorizedPerson,
        price: selectedEducationProgram?.price,
        startDate: selectedEducationProgram?.startDate,
        deadline: selectedEducationProgram?.deadline,
    }

    const addInitialValues = {
        educationProgramLevelId: "",
        educationProgramDevelopmentId: "",
        badgeId: "",
        name: "",
        description: "",
        thumbnailPath: "",
        duration: "",
        authorizedPerson: "",
        price: "",
        startDate: "",
        deadline: "",
    }

    const getEducation = () => {
        educationProgramService.getAll(0, 100).then(result => {
            setEducationPrograms(result.data);
        })
    }

    const handleAddEducationProgram = async (educationProgram: any) => {

        const addEducationProgram: AddEducationProgramRequest = {
            educationProgramLevelId: educationProgram.educationProgramLevelId,
            educationProgramDevelopmentId: educationProgram.educationProgramDevelopmentId,
            badgeId: educationProgram.badgeId,
            name: educationProgram.name,
            description: educationProgram.description,
            thumbnailPath: educationProgram.thumbnailPath,
            duration: educationProgram.duration,
            authorizedPerson: educationProgram.authorizedPerson,
            price: educationProgram.price,
            startDate: educationProgram.startDate,
            deadline: educationProgram.deadline,
        }

        await educationProgramService.add(addEducationProgram);
        getEducation();
        closeModal()
    }

    const handleUpdateEducationProgram = async (educationProgram: any) => {
        console.log(educationProgram);

        const updateEducationProgram: UpdateEducationProgramRequest = {
            id: selectedEducationProgramId,
            educationProgramLevelId: educationProgram.educationProgramLevelId,
            educationProgramDevelopmentId: educationProgram.educationProgramDevelopmentId,
            badgeId: educationProgram.badgeId,
            name: educationProgram.name,
            description: educationProgram.description,
            thumbnailPath: educationProgram.thumbnailPath,
            duration: educationProgram.duration,
            authorizedPerson: educationProgram.authorizedPerson,
            price: educationProgram.price,
            startDate: educationProgram.startDate,
            deadline: educationProgram.deadline,
        }

        console.log(updateEducationProgram);

        await educationProgramService.update(updateEducationProgram);
        getEducation();
        closeModal()
    }

    const handleDeleteEducationProgram = async (educationProgramId: any) => {
        await educationProgramService.delete(educationProgramId);
        getEducation();
    }



    return (
        <div className='container'>
            <div className="row education-panel ">
                <AdminPanelSideBarCard />

                <div className="education-panel-content col-md-9">

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
                                    <th className='education-name'>Eğitim Adı</th>
                                    <th className="education-start-date">Başlangıç Tarihi</th>
                                    <th className='education-end-date'>Bitiş Tarihi</th>
                                    <th className='education-price'>Eğitim Ücreti</th>
                                    <th className='td-icons text-center'>İşlem</th>
                                </tr>
                            </thead>

                            <tbody className='education-panel-table-body' >
                                {educationPrograms?.items.map((educationProgram) => (
                                    <tr >
                                        <td className='education-name'>{educationProgram.name}</td>
                                        <td className="education-start-date">{new Date(educationProgram.startDate).toLocaleDateString()}</td>
                                        <td className='education-end-date'>{new Date(educationProgram.deadline).toLocaleDateString()}</td>
                                        <td className='education-price'>{educationProgram.price}</td>
                                        <td className='td-icons '>

                                            <Tooltip placement="top" title={"Silme"}>
                                                <span onClick={() => handleDeleteEducationProgram(educationProgram.id)} className="trash-icon"></span>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Düzenleme">
                                                <RiPencilFill onClick={() => handleUpdatedClick(educationProgram.id)} className='admin-edit-icon' />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                                <tr >
                                    <td className='text-center add-new-data' onClick={handleAddClick} colSpan={10}>
                                        <span>Yeni eğitim programı ekle</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modals
                    className="education-modal"
                    show={showModal}
                    onHide={() => closeModal()}

                    header={true}
                    title={
                        updateClick ? "Eğitim Programı Güncelleme" : "Eğitim Programı Ekleme"
                    }
                    body={
                        <>
                            <div className="education-add-form formik-form" style={addClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={addInitialValues}
                                    onSubmit={(values) => {
                                        handleAddEducationProgram(values)
                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitim Adı </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="name"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Açıklama </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="description"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">ThumbnailPath</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="thumbnailPath"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Süre (sn)</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="duration"
                                                    placeholderTextColor="#fff"
                                                    type="number"

                                                />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Yükleyen Kişi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="authorizedPerson"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Ücret</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="price"
                                                    placeholderTextColor="#fff" />

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
                                                    name="deadline"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Seviye</span>

                                                <TobetoSelect
                                                    name="educationProgramLevelId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {educationProgramLevels?.items.map((educationProgramLevel) => (
                                                        <option value={String(educationProgramLevel.id)}>
                                                            {educationProgramLevel.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitimler</span>

                                                <TobetoSelect
                                                    name="educationProgramDevelopmentId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {educationProgramDevelopments?.items.map((educationProgramDevelopment) => (
                                                        <option value={String(educationProgramDevelopment.id)}>
                                                            {educationProgramDevelopment.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Rozet</span>

                                                <TobetoSelect
                                                    name="badgeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {badges?.items.map((badge) => (
                                                        <option value={String(badge.id)}>
                                                            {badge.name}
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

                            <div className="education-update-form formik-form" style={updateClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={updateInitialValues}
                                    onSubmit={(values) => {
                                        handleUpdateEducationProgram(values)
                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitim Adı </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="name"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <span className="input-area-title">Açıklama </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="description"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">ThumbnailPath</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="thumbnailPath"
                                                    placeholderTextColor="#fff"
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Süre (sn)</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="duration"
                                                    placeholderTextColor="#fff"
                                                />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Yükleyen Kişi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="authorizedPerson"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Ücret</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="price"
                                                    placeholderTextColor="#fff" />

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
                                                    name="deadline"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Seviye</span>

                                                <TobetoSelect
                                                    name="educationProgramLevelId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Level">Seçiniz*</option>
                                                    {educationProgramLevels?.items.map((educationProgramLevel) => (
                                                        <option value={String(educationProgramLevel.id)}>
                                                            {educationProgramLevel.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Eğitimler</span>

                                                <TobetoSelect
                                                    name="educationProgramDevelopmentId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="EducationProgramDevelopment">Seçiniz*</option>
                                                    {educationProgramDevelopments?.items.map((educationProgramDevelopment) => (
                                                        <option value={String(educationProgramDevelopment.id)}>
                                                            {educationProgramDevelopment.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Rozet</span>

                                                <TobetoSelect
                                                    name="badgeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Badge">Seçiniz*</option>
                                                    {badges?.items.map((badge) => (
                                                        <option value={String(badge.id)}>
                                                            {badge.name}
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
            </div>
        </div>

    );
}
