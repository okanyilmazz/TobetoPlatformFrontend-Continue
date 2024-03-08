import React, { useEffect, useState } from 'react'
import "./AnnouncementPanel.css"
import { IoSearch } from 'react-icons/io5'
import { Paginate } from '../../../models/paginate';
import { Tooltip } from 'antd'
import { RiPencilFill } from 'react-icons/ri';
import Modals from '../../../components/Modal/Modals';
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap';
import TobetoSelect from '../../../utilities/customFormControls/TobetoSelect';
import TobetoTextInput from '../../../utilities/customFormControls/TobetoTextInput';
import GetListAnnouncementResponse from '../../../models/responses/announcement/getListAnnouncementResponse';
import announcementService from '../../../services/announcementService';
import AddAnnouncementRequest from '../../../models/requests/announcement/addAnnouncementRequest';
import GetListAnnouncementTypeResponse from '../../../models/responses/announcementType/getListAnnouncementTypeResponse';
import announcementTypeService from '../../../services/announcementTypeService';
import DeleteAnnouncementRequest from '../../../models/requests/announcement/deleteAnnouncementRequest';
import UpdateAnnouncementRequest from '../../../models/requests/announcement/updateAnnouncementRequest';
import AdminPanelSideBarCard from '../../../components/AdminPanelSideBarCard/AdminPanelSideBarCard';
import projectService from '../../../services/projectService';
import GetListProjectResponse from '../../../models/responses/project/getListProjectResponse';
import announcementProjectService from '../../../services/announcementProjectService';
import AddAnnouncementProjectRequest from '../../../models/requests/announcementProject/addAnnouncementProjectRequest';




export default function AnnouncementPanel() {

    const [announcements, setAnnouncements] = useState<Paginate<GetListAnnouncementResponse> | null>(null);
    const [announcementTypes, setAnnouncementTypes] = useState<Paginate<GetListAnnouncementTypeResponse> | null>(null);
    const [originalAnnouncements, setOriginalAnnouncements] = useState<Paginate<GetListAnnouncementResponse> | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [addClick, setAddClick] = useState<boolean>(false)
    const [updateClick, setUpdateClick] = useState<boolean>(false)
    const [selectedAnnouncement, setselectedAnnouncement] = useState<GetListAnnouncementResponse>();
    const [showAnnouncementUpdateModal, setshowAnnouncementUpdateModal] = useState(false)
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<any>()

    const [projects, setProjects] = useState<Paginate<GetListProjectResponse> | null>(null);



    const handleAddClick = () => {
        setShowModal(true);
        setAddClick(true)
    };

    const handleUpdatedClick = (selectedAnnouncementId: any) => {
        setShowModal(true);
        setUpdateClick(true);
        setSelectedAnnouncementId(selectedAnnouncementId)
    };

    const closeModal = () => {
        setUpdateClick(false);
        setAddClick(false);
        setShowModal(false)
    }


    const handleAnnouncementUpdateModal = (announcement: any) => {
        setshowAnnouncementUpdateModal(true);
        setselectedAnnouncement(announcement);
    }


    useEffect(() => {
        announcementService.getAll(0, 100).then(result => {
            setAnnouncements(result.data);
            setOriginalAnnouncements(result.data);
        });

        announcementTypeService.getAll(0, 100).then(result => {
            setAnnouncementTypes(result.data);

        });

        projectService.getAll(0, 100).then(result => {
            setProjects(result.data);
        })
    }, []);


    const handleDeleteAnnouncement = async (announcement: any) => {
        const deleteAnnouncement: DeleteAnnouncementRequest = {
            id: announcement.id
        }
        await announcementService.delete(deleteAnnouncement);
        getAnnouncement();
    }

    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (originalAnnouncements) {
            if (searchText.length > 0) {
                const newFilteredItems = originalAnnouncements.items.filter(announcement =>
                    announcement.title.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListAnnouncementResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setAnnouncements(filteredItems);
            } else {
                setAnnouncements(originalAnnouncements);
            }
        }
    };


    const updateAnnouncementInitialValues = {
        id: selectedAnnouncementId,
        announcementTypeId: selectedAnnouncement?.announcementTypeName,
        announcementDate: selectedAnnouncement?.announcementDate,
        title: selectedAnnouncement?.title,
        description: selectedAnnouncement?.description
    }

    const addAnnouncementInitialValues = {
        announcementTypeId: "",
        announcementDate: "",
        title: "",
        description: "",
        projectId: "",
    }


    const getAnnouncement = () => {
        announcementService.getAll(0, 100).then((result) => {
            console.log(result.data);
            setAnnouncements(result.data);
        })
    }


    const handleAddAnnouncement = async (announcement: any) => {
        const addAnnouncement: AddAnnouncementRequest = {
            title: announcement.title,
            description: announcement.description,
            announcementDate: announcement.announcementDate,
            announcementTypeId: announcement.announcementTypeId
        }
        var result = await announcementService.add(addAnnouncement);
        console.log(result);

        const addAnnouncementProject: AddAnnouncementProjectRequest = {

            announcementId: result.data.id,
            projectId: announcement.projectId
        }

        await announcementProjectService.add(addAnnouncementProject)
        getAnnouncement();
        closeModal()
    }

    const handleUpdateAnnouncement = async (announcement: any) => {

        const updateAnnouncement: UpdateAnnouncementRequest = {
            id: selectedAnnouncementId,
            title: announcement.title,
            description: announcement.description,
            announcementDate: announcement.announcementDate,
            announcementTypeId: announcement.announcementTypeId
        }

        await announcementService.update(updateAnnouncement);
        getAnnouncement();
        closeModal()

    }


    return (
        <div className='container'>
            <div className="row announcement-panel  ">
                <AdminPanelSideBarCard />
                <div className=" announcement-panel-content col-md-9  ">


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
                                    <th className='announcement-name'>Duyuru İsmi</th>
                                    <th className="announcement-created-date">Oluşturulma Tarihi</th>
                                    <th className='announcement-type'>Türü</th>
                                    <th className='text-center'>İşlem</th>
                                </tr>
                            </thead>

                            <tbody className='announcement-panel-table-body' >

                                {
                                    announcements?.items.map((announcement) => (
                                        <tr>
                                            <td className='announcement-name'>{announcement.title}</td>
                                            <td className="announcement-created-date">{new Date(announcement.announcementDate).toLocaleDateString()}</td>

                                            <td className='announcement-type'>{announcement.announcementTypeName}</td>
                                            <td className='td-icons '>

                                                <Tooltip placement="top" title={"Silme"} >
                                                    <span className="trash-icon" onClick={() => handleDeleteAnnouncement(announcement)}></span>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Düzenleme">
                                                    <RiPencilFill onClick={() => handleUpdatedClick(announcement.id)} className='admin-edit-icon' />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr >
                                    <td className='text-center' onClick={handleAddClick} colSpan={5}>
                                        <span>Yeni duyuru ekle</span>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>

                <Modals
                    className="announcement-modal"
                    show={showModal}
                    onHide={() => closeModal()}
                    header={true}
                    title={
                        updateClick ? "Anons Güncelleme" : "Anons Ekleme"
                    }
                    body={
                        <>

                            <div className="formik-form" style={addClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={addAnnouncementInitialValues}
                                    onSubmit={(values) => {
                                        handleAddAnnouncement(values);
                                    }}>

                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Türü</span>

                                                <TobetoSelect
                                                    name="announcementTypeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Announcement">Seçiniz*</option>
                                                    {announcementTypes?.items.map((announcementType) => (
                                                        <option value={String(announcementType.id)}>
                                                            {announcementType.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Başlığı  </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="title"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Açıklaması</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="description"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="announcementDate"
                                                    type="date"
                                                />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Projesi</span>
                                                <TobetoSelect
                                                    name="projectId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Project">Seçiniz*</option>
                                                    {projects?.items.map((project, index) => (
                                                        <option key={index} value={String(project.id)}>
                                                            {project.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>

                                        </Row>
                                        <div className='form-buttons'>
                                            <Button className="mb-4" onClick={handleAnnouncementUpdateModal} type="submit" style={updateClick ? { display: 'block' } : { display: 'none' }}   >
                                                Güncelle
                                            </Button>
                                            <Button onClick={() => closeModal()} className="mb-4" type="submit" style={addClick ? { display: 'block' } : { display: 'none' }}   >
                                                Kaydet
                                            </Button>
                                            <Button className="mb-4" onClick={() => closeModal()}>
                                                Kapat
                                            </Button>
                                        </div>
                                    </Form>


                                </Formik>
                            </div>

                            <div className="formik-form" style={updateClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={updateAnnouncementInitialValues}
                                    onSubmit={(values) => {
                                        handleUpdateAnnouncement(values);
                                    }}>

                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Türü</span>

                                                <TobetoSelect
                                                    name="announcementTypeId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Announcement">Seçiniz*</option>
                                                    {announcementTypes?.items.map((announcementType) => (
                                                        <option value={String(announcementType.id)}>
                                                            {announcementType.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Başlığı  </span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="title"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Açıklaması</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="description"
                                                    placeholderTextColor="#fff" />
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Tarihi</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="announcementDate"
                                                    type="date"
                                                />
                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Duyuru Projesi</span>
                                                <TobetoSelect
                                                    name="projectId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="Project">Seçiniz*</option>
                                                    {projects?.items.map((project, index) => (
                                                        <option key={index} value={String(project.id)}>
                                                            {project.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>

                                        </Row>
                                        <div className='form-buttons'>
                                            <Button className="mb-4" onClick={handleAnnouncementUpdateModal} type="submit" style={updateClick ? { display: 'block' } : { display: 'none' }}   >
                                                Güncelle
                                            </Button>
                                            <Button onClick={() => closeModal()} className="mb-4" type="submit" style={addClick ? { display: 'block' } : { display: 'none' }}   >
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
        </div >
    )
}
