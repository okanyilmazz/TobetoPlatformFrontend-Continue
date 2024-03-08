import React, { useState, useEffect } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import "./CatalogFilter.css"
import { Paginate } from '../../models/paginate';
import { GetListEducationProgramLevelResponse } from '../../models/responses/educationProgramLevel/getListEducationProgramLevelResponse';
import educationProgramLevelService from '../../services/educationProgramLevelService';
import EducationProgramFilterRequest from '../../models/requests/filter/educationProgramFilterRequest';
import GetListSubjectResponse from '../../models/responses/subject/getListSubjectResponse';
import subjectService from '../../services/subjectService';
import { useSelector } from 'react-redux';
import educationProgramDevelopmentService from '../../services/educationProgramDevelopmentService';
import GetListEducationProgramDevelopmentResponse from '../../models/responses/educationProgramDevelopment/getListEducationProgramDevelopmentResponse';
import programmingLanguageService from '../../services/programmingLanguageService';
import GetListProgrammingLanguageResponse from '../../models/responses/programmingLanguage/getListProgrammingLanguageResponse';
import { NIL as NIL_UUID } from 'uuid';
import { useLocation } from 'react-router-dom';
import userService from '../../services/userService';
import GetListUserResponse from '../../models/responses/user/getListUserResponse';


export default function CatalogFilter(props: any) {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];

    const [selectedEducationLevelId, setSelectedEducationLevelId] = useState<any>(NIL_UUID);
    const [selectedInstructorId, setSelectedInstructorId] = useState<any>(NIL_UUID);
    const [selectedSubjectId, setSelectedSubjectId] = useState<any>(NIL_UUID);
    const [selectedProgrammingLanguageId, setSelectedProgrammingLanguageId] = useState<any>(NIL_UUID);
    const [selectedEducationProgramDevelopmentId, setSelectedEducationProgramDevelopmentId] = useState<any>(NIL_UUID);
    const [selectedPaidId, setSelectedPaidId] = useState(-1);
    const [selectedStatusId, setSelectedStatusId] = useState(-1);
    const [selectedSpecialForMe, setSelectedSpecialForMe] = useState(false);


    const [subjects, setSubjects] = useState<Paginate<GetListSubjectResponse>>();
    const [educationProgramDevelopments, setEducationProgramDevelopments] = useState<Paginate<GetListEducationProgramDevelopmentResponse>>();
    const [programmingLanguages, setProgrammingLanguages] = useState<Paginate<GetListProgrammingLanguageResponse>>();
    const [educationProgramLevels, setEducationProgramLevels] = useState<Paginate<GetListEducationProgramLevelResponse>>();
    const [instructors, setInstructors] = useState<Paginate<GetListUserResponse>>();



    const [filteredSubjects, setFilteredSubjects] = useState<Paginate<GetListSubjectResponse>>();
    const [filteredEducationProgramDevelopments, setFilteredEducationProgramDevelopments] = useState<Paginate<GetListEducationProgramDevelopmentResponse>>();
    const [filteredProgrammingLanguages, setFilteredProgrammingLanguages] = useState<Paginate<GetListProgrammingLanguageResponse>>();
    const [filteredEducationProgramLevels, setFilteredEducationProgramLevels] = useState<Paginate<GetListEducationProgramLevelResponse>>();
    const [filteredInstructors, setFilteredInstructors] = useState<Paginate<GetListUserResponse>>();

    const [initialRender, setInitialRender] = useState<boolean>(false);
    const userState = useSelector((state: any) => state.user);
    const authState = useSelector((state: any) => state.auth);



    useEffect(() => {
        educationProgramLevelService.getAll(0, 100).then((result) => {
            setEducationProgramLevels(result.data);
            setFilteredEducationProgramLevels(result.data);
        });

        subjectService.getAll(0, 6).then((result) => {
            setSubjects(result.data);
            setFilteredSubjects(result.data);
        });

        educationProgramDevelopmentService.getAll(0, 100).then((result) => {
            setEducationProgramDevelopments(result.data);
            setFilteredEducationProgramDevelopments(result.data);
        });

        programmingLanguageService.getAll(0, 100).then((result) => {
            setProgrammingLanguages(result.data);
            setFilteredProgrammingLanguages(result.data);
        });

        userService.getInstructorList().then((result) => {
            setInstructors(result.data);
            setFilteredInstructors(result.data);
        });

    }, []);


    useEffect(() => {
        if (initialRender)
            handleFilter();
        else setInitialRender(true);
    }, [selectedEducationProgramDevelopmentId, selectedEducationLevelId, selectedSubjectId, selectedProgrammingLanguageId, selectedStatusId, selectedPaidId, selectedSpecialForMe])


    function handleInputFilter<T extends { name: string }>(
        e: React.ChangeEvent<HTMLInputElement>,
        entities: Paginate<T> | undefined,
        setFilteredItems: React.Dispatch<React.SetStateAction<Paginate<T> | undefined>>
    ) {
        const searchText = e.target.value.toLowerCase();

        if (entities && entities.items) {
            const newFilteredItems = entities.items.filter(entity =>
                entity.name.toLowerCase().includes(searchText)
            );

            const filteredItems: Paginate<T> = {
                from: 0,
                index: 0,
                size: newFilteredItems.length,
                count: newFilteredItems.length,
                pages: 1,
                items: newFilteredItems,
                hasPrevious: false,
                hasNext: false,
            };

            setFilteredItems(filteredItems);
        }
    }

    function handleFilter() {
        const filterRequest: EducationProgramFilterRequest = {
            requestingAccountId: userState.user.id,
            educationProgramLevelId: selectedEducationLevelId,
            subjectId: selectedSubjectId,
            programmingLanguageId: selectedProgrammingLanguageId,
            educationProgramDevelopmentId: selectedEducationProgramDevelopmentId,
            accountId: userState.user.id,
            completeStatus: selectedStatusId,
            specialForMe: selectedSpecialForMe,
            paid: selectedPaidId,
        }

        props.onDataFromChild(filterRequest);
    }

    const statuses = [
        { id: 0 as number, name: "Alınan Tüm Eğitimler" as string },
        { id: 1 as number, name: "Henüz Başlanmamış Eğitimler" as string },
        { id: 2 as number, name: "Tamamlanan Eğitimler" as string },
        { id: 3 as number, name: "Devam Eden Eğitimler" as string },
    ];

    const handleRadioChange = (value: any, stateModel: any): void => {
        stateModel(value);
    };

    return (
        <div className="row ">
            <div
                className={(authState.isAuthenticated && lastPathSegment !== "katalog") ? 'catalog-filter-content bg-front-white' : 'catalog-filter-content'}
            >

                <Accordion alwaysOpen defaultActiveKey="0">

                    <Accordion.Item eventKey="0">
                        <h2 className='accordion-title' style={authState.isAuthenticated && lastPathSegment !== "katalog" ? { color: 'Black' } : { color: 'White' }}>Filtrele</h2>
                        <hr className='accordion-hr' />
                        <Accordion.Header className='accordion-forMe' onClick={() => handleRadioChange(!selectedSpecialForMe, setSelectedSpecialForMe)}>Bana Özel</Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className='accordion-title'>Kategori</Accordion.Header>
                        <Accordion.Body>
                            <Form >
                                <Form.Control type="text" placeholder="Arama" />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Eğitimler"
                                    name="category"
                                    type='radio'
                                    id={'-1'}
                                    onChange={(event) => handleRadioChange(Number(event?.target.id), setSelectedPaidId)}
                                />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Ücretli Eğitimler"
                                    name="category"
                                    type='radio'
                                    id={'0'}
                                    onChange={(event) => handleRadioChange(Number(event?.target.id), setSelectedPaidId)}
                                />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Ücretsiz Eğitimler"
                                    name="category"
                                    type='radio'
                                    id={'1'}
                                    onChange={(event) => handleRadioChange(Number(event?.target.id), setSelectedPaidId)}
                                />
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='accordion-title'>Eğitimler</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Control type="text" placeholder="Arama" onChange={(event: any) => handleInputFilter<GetListEducationProgramDevelopmentResponse>(event, educationProgramDevelopments, setFilteredEducationProgramDevelopments)} />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Eğitimler"
                                    name="development"
                                    type='radio'
                                    id={NIL_UUID}
                                    onChange={(event) => handleRadioChange(event.target.id, setSelectedEducationProgramDevelopmentId)} />

                                {filteredEducationProgramDevelopments?.items.map((educationProgramDevelopment, index) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        key={index}
                                        type="radio"
                                        id={String(educationProgramDevelopment.id)}
                                        name="development"
                                        label={educationProgramDevelopment.name}
                                        value={String(educationProgramDevelopment.id)}
                                        checked={selectedEducationProgramDevelopmentId === educationProgramDevelopment.id}
                                        onChange={() => handleRadioChange(educationProgramDevelopment.id, setSelectedEducationProgramDevelopmentId)}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header className='accordion-title'>Seviye</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Control type="text" placeholder="Arama" onChange={(event: any) => handleInputFilter<GetListEducationProgramLevelResponse>(event, educationProgramLevels, setFilteredEducationProgramLevels)} />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Seviyeler"
                                    name="educationProgramLevel"
                                    type='radio'
                                    id={NIL_UUID}
                                    onChange={(event) => handleRadioChange(event.target.id, setSelectedEducationLevelId)} />

                                {filteredEducationProgramLevels?.items.map((educationProgramLevel) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        type="radio"
                                        id={String(educationProgramLevel.id)}
                                        name="educationProgramLevel"
                                        label={educationProgramLevel.name}
                                        value={String(educationProgramLevel.id)}
                                        checked={selectedEducationLevelId === educationProgramLevel.id}
                                        onChange={() => handleRadioChange(educationProgramLevel.id, setSelectedEducationLevelId)}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header className='accordion-title' >Konu</Accordion.Header>
                        <Accordion.Body className='scrollable-content' >
                            <Form>

                                <Form.Control type="text" placeholder="Arama" onChange={(event: any) => handleInputFilter<GetListSubjectResponse>(event, subjects, setFilteredSubjects)} />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Konular"
                                    name="subject"
                                    type='radio'
                                    id={NIL_UUID}
                                    onChange={(event) => handleRadioChange(event?.target.id, setSelectedSubjectId)}
                                />

                                {filteredSubjects?.items.map((subject, index) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        key={index}
                                        type="radio"
                                        id={String(subject.id)}
                                        name="subject"
                                        label={subject.name}
                                        value={String(subject.id)}
                                        checked={selectedSubjectId === subject.id}
                                        onChange={() => handleRadioChange(subject.id, setSelectedSubjectId)}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header className='accordion-title' >Yazılım Dili</Accordion.Header>
                        <Accordion.Body className='scrollable-content' >
                            <Form>
                                <Form.Control type="text" placeholder="Arama" onChange={(event: any) => handleInputFilter<GetListProgrammingLanguageResponse>(event, programmingLanguages, setFilteredProgrammingLanguages)} />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Diller"
                                    name="programmingLanguage"
                                    type='radio'
                                    id={NIL_UUID}
                                    onChange={(event) => handleRadioChange(event.target.id, setSelectedProgrammingLanguageId)} />

                                {filteredProgrammingLanguages?.items.map((programmingLanguage, index) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        key={index}
                                        type="radio"
                                        id={String(programmingLanguage.id)}
                                        name="programmingLanguage"
                                        label={programmingLanguage.name}
                                        value={String(programmingLanguage.id)}
                                        checked={selectedProgrammingLanguageId === programmingLanguage.id}
                                        onChange={() => handleRadioChange(programmingLanguage.id, setSelectedProgrammingLanguageId)}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header className='accordion-title' >Eğitmen</Accordion.Header>
                        <Accordion.Body className='scrollable-content'>
                            <Form>
                                <Form.Control type="text" placeholder="Arama" />
                                {instructors?.items.map((instructor, index) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        key={index}
                                        type="radio"
                                        id={instructor.id.toString()}
                                        name="instructor"
                                        label={instructor.firstName + " " + instructor.lastName}
                                        value={String(instructor.id)}
                                        checked={selectedInstructorId === instructor.id}
                                        onChange={() => handleRadioChange(instructor.id, setSelectedInstructorId)} />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header className='accordion-title' >Durum</Accordion.Header>
                        <Accordion.Body className='scrollable-content' style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Form>
                                <Form.Control type="text" placeholder="Arama" />
                                <Form.Check
                                    className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                    inline
                                    label="Tüm Eğitimler"
                                    name="status"
                                    type='radio'
                                    id={"-1"}
                                    onChange={(event) => handleRadioChange(Number(event.target.id), setSelectedStatusId)} />

                                {statuses.map((status) => (
                                    <Form.Check
                                        className={authState.isAuthenticated && lastPathSegment !== "katalog" ? 'is-authenticated' : 'is-not-authenticated'}
                                        key={status.id}
                                        type="radio"
                                        id={String(status.id)}
                                        name="status"
                                        label={status.name}
                                        value={status.id}
                                        checked={selectedStatusId === status.id}
                                        onChange={() => handleRadioChange(status.id, setSelectedStatusId)}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>

    );
}