import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Paginate } from '../../../models/paginate';
import GetListSessionResponse from '../../../models/responses/session/getListSessionResponse';
import sessionService from '../../../services/sessionService';
import "./SessionPanel.css"
import { RiPencilFill } from 'react-icons/ri';
import Modals from '../../../components/Modal/Modals';
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap';
import TobetoSelect from '../../../utilities/customFormControls/TobetoSelect';
import TobetoTextInput from '../../../utilities/customFormControls/TobetoTextInput';
import AdminPanelSideBarCard from '../../../components/AdminPanelSideBarCard/AdminPanelSideBarCard';
import GetListLessonResponse from '../../../models/responses/lesson/getListLessonResponse';
import lessonService from '../../../services/lessonService';
import AddSessionRequest from '../../../models/requests/session/addSessionRequest';
import UpdateSessionRequest from '../../../models/requests/session/updateSessionRequest';
import GetSessionResponse from '../../../models/responses/session/getSessionResponse';
import GetListOccupationClassResponse from '../../../models/responses/occupationClass/getListOccupationClassResponse';
import occupationClassService from '../../../services/occupationClassService';



export default function SessionPanel() {

    const [sessions, setSessions] = useState<Paginate<GetListSessionResponse>>();
    const [filteredSessions, setFilteredSessions] = useState<Paginate<GetListSessionResponse>>();

    const [addClick, setAddClick] = useState<boolean>(false)
    const [updateClick, setUpdateClick] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false);
    const [lessons, setLessons] = useState<Paginate<GetListLessonResponse>>();
    const [selectedSessionId, setSelectedSessionId] = useState<any>()
    const [selectedSession, setSelectedSession] = useState<GetSessionResponse>();
    const [occupationClasses, setOccupationClasses] = useState<Paginate<GetListOccupationClassResponse>>();




    const handleAddClick = () => {
        setShowModal(true);
        setAddClick(true)
    };

    const handleUpdatedClick = (selectedSessionId: any) => {
        setShowModal(true);
        setUpdateClick(true);
        setSelectedSessionId(selectedSessionId);
    };

    const closeModal = () => {
        setUpdateClick(false);
        setAddClick(false);
        setShowModal(false)
    }

    useEffect(() => {
        sessionService.getAll(0, 100).then(result => {
            setSessions(result.data);
            setFilteredSessions(result.data);
        });

        lessonService.getAll(0, 100).then(result => {
            setLessons(result.data)
        })

        occupationClassService.getAll(0, 100).then(result => {
            setOccupationClasses(result.data)
        })

    }, []);

    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (filteredSessions) {
            if (searchText.length > 0) {
                const newFilteredItems = filteredSessions.items.filter(session =>
                    session.occupationClassName.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListSessionResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setSessions(filteredItems);
            } else {
                setSessions(filteredSessions);
            }
        }
    };


    const updateInitialValues = {
        lessonId: selectedSession?.lessonId,
        startDate: selectedSession?.startDate,
        endDate: selectedSession?.endDate,
        recordPath: selectedSession?.recordPath,
    }

    const addInitialValues = {
        lessonId: "",
        startDate: "",
        endDate: "",
        recordPath: "",
        occupationClassId: "",
    }


    const getSession = () => {
        sessionService.getAll(0, 100).then(result => {
            setSessions(result.data);
        })
    }

    const handleAddSession = async (session: any) => {
        console.log("session" + session);

        const addSession: AddSessionRequest = {
            lessonId: session.lessonId,
            startDate: session.startDate,
            endDate: session.endDate,
            recordPath: session.recordPath,
        }

        await sessionService.add(addSession);
        console.log("addsession" + addSession);


        getSession();
        closeModal()
    }

    const handleUpdateSession = async (session: any) => {
        console.log("session" + session);

        const updateSession: UpdateSessionRequest = {
            id: selectedSessionId,
            lessonId: session.lessonId,
            startDate: session.startDate,
            endDate: session.endDate,
            recordPath: session.recordPath,
        }

        await sessionService.update(updateSession);

        getSession();
        closeModal()
    }

    const handleDeleteSession = async (sessionId: any) => {
        await sessionService.delete(sessionId);
        getSession();
    }


    return (
        <div className='container '>

            <div className="row session-panel  " >
                <AdminPanelSideBarCard />

                <div className="session-panel-content col-md-9">

                    <div className="search">
                        <div className="input-container">
                            <input type="text" id="search" onChange={handleInputFilter} placeholder="Arama" />
                            <IoSearch className="search-icon" />
                        </div>
                    </div>


                    <div className="table-responsive-sm col-md-12">
                        <table className="mt-8 corpTable table table-hover">
                            <thead>
                                <tr>
                                    <th className='session-occupation-name'>Sınıf Adı</th>
                                    <th className="session-start-date">Başlangıç Tarihi</th>
                                    <th className='session-end-date'>Bitiş Tarihi</th>
                                    <th className='td-icons text-center'>İşlem</th>
                                </tr>
                            </thead>

                            <tbody className='session-panel-table-body' >
                                {
                                    sessions?.items.map((session) => (
                                        <tr>
                                            <td className='session-occupation-name'>{session.lessonName}</td>
                                            <td className="session-start-date">{new Date(session.startDate).toLocaleDateString()}</td>
                                            <td className='session-end-date'>{new Date(session.endDate).toLocaleDateString()}</td>
                                            <td className='td-icons '>

                                                <Tooltip placement="top" title={"Silme"}>
                                                    <span onClick={() => handleDeleteSession(session.id)} className="trash-icon"></span>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Düzenleme">
                                                    <RiPencilFill onClick={() => handleUpdatedClick(session.id)} className='admin-edit-icon' />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr >
                                    <td className='text-center add-new-data' onClick={handleAddClick} colSpan={5}>
                                        <span>Yeni oturum ekle</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modals
                    className="session-modal"
                    show={showModal}
                    onHide={() => closeModal()}
                    header={true}
                    title={
                        updateClick ? "Oturum Güncelleme" : "Oturum  Ekleme"
                    }
                    body={
                        <>
                            <div className=" session-add-form  formik-form " style={addClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={addInitialValues}
                                    onSubmit={(values) => {
                                        handleAddSession(values)

                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Adı</span>

                                                <TobetoSelect
                                                    name="lessonId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {lessons?.items.map((lesson) => (
                                                        <option value={String(lesson.id)}>
                                                            {lesson.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Kayıt Link</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="recordPath"
                                                    placeholder="http://"
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
                                                    name="endDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

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

                            <div className=" session-update-form  formik-form" style={updateClick ? { display: 'block' } : { display: 'none' }}>
                                <Formik
                                    initialValues={updateInitialValues}
                                    onSubmit={(values) => {
                                        handleUpdateSession(values)

                                    }}>
                                    <Form className="update-modal-form" >
                                        <Row >
                                            <Col md={6}>
                                                <span className="input-area-title">Ders Adı</span>

                                                <TobetoSelect
                                                    name="lessonId"
                                                    className="mb-4"
                                                    component="select">
                                                    <option value="SocialMedia">Seçiniz*</option>
                                                    {lessons?.items.map((lesson) => (
                                                        <option value={String(lesson.id)}>
                                                            {lesson.name}
                                                        </option>
                                                    ))}
                                                </TobetoSelect>
                                            </Col>
                                            <Col md={6}>
                                                <span className="input-area-title">Kayıt Link</span>

                                                <TobetoTextInput
                                                    className="mb-4"
                                                    name="recordPath"
                                                    placeholder="http://"
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
                                                    name="endDate"
                                                    type="date"
                                                    placeholderTextColor="#fff" />

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