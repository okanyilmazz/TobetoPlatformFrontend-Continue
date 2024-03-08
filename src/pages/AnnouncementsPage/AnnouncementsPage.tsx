import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import GetListAnnouncementProjectResponse from '../../models/responses/announcementProject/getListAnnouncementProjectResponse';
import { Paginate } from '../../models/paginate';
import announcementProjectService from '../../services/announcementProjectService';
import { Col, Dropdown, Form, Pagination } from 'react-bootstrap';
import Select, { ActionMeta, MultiValue } from 'react-select';
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard';
import "./AnnouncementsPage.css";
import Tooltip from '@uiw/react-tooltip';
import AddAnnouncementReadRequest from '../../models/requests/announcementRead/addAnnouncementReadRequest';
import authService from '../../services/authService';
import announcementReadService from '../../services/announcementReadService';
import GetListAnnouncementReadResponse from '../../models/responses/announcementRead/getListAnnouncementReadResponse';
import GetListAnnouncementResponse from '../../models/responses/announcement/getListAnnouncementResponse';


export default function AnnouncementsPage() {
    const [announcementProjects, setAnnouncementProjects] = useState<Paginate<GetListAnnouncementProjectResponse> | null>(null);
    const [filteredAnnouncementProjects, setFilteredAnnouncementProjects] = useState<Paginate<GetListAnnouncementProjectResponse> | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [uniqueProjectNames, setUniqueProjectNames] = useState<string[]>([]);
    const [announcementTypes, setAnnouncementTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [ascendingActive, setAscendingActive] = useState<boolean>(true);
    const [pageIndexState, setPageIndexState] = useState<number>(0);
    const [isClicked, setIsClicked] = useState(false);
    const [readAnnouncementIds, setReadAnnouncementIds] = useState<string[]>([]);
    const [announcementReads, setAnnouncementReads] = useState<Paginate<GetListAnnouncementReadResponse>>();
    const user = authService.getUserInfo();
    const [announcements, setAnnouncements] = useState<Paginate<GetListAnnouncementResponse> | null>(null);



    const handleAddAnnouncementRead = async (announcementRead: any) => {
        const addAnnouncementRead: AddAnnouncementReadRequest = {
            accountId: user.id,
            announcementId: announcementRead.announcementId
        }
        await announcementReadService.add(announcementRead);
        getAnnouncementRead();
    }

    const getAnnouncementRead = () => {
        announcementReadService.getByAccountId(user.id, 0, 100).then((result) => {
            console.log(result.data);
            setAnnouncementReads(result.data);
        })
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
        filterAnnouncements();
    };

    useEffect(() => {
        fetchAnnouncementProjects();
    }, []);

    useEffect(() => {
        if (pageIndexState !== undefined) {
            fetchAnnouncementProjects(pageIndexState);
        }
    }, [pageIndexState]);

    useEffect(() => {
        filterAnnouncements();
    }, [searchText, selectedProjects, announcementProjects, selectedType, readAnnouncementIds, isClicked]);

    const fetchAnnouncementProjects = async (pageIndex: number = 0) => {
        const result = await announcementProjectService.getAll(pageIndex, 3);
        setAnnouncementProjects(result.data);
        setFilteredAnnouncementProjects(result.data);
        const names = new Set<string>();
        const types = new Set<string>();
        result.data?.items.forEach(item => {
            if (item.project && item.project.name) {
                names.add(item.project.name);
            }
            types.add(item.announcement.announcementTypeName);
        });
        setUniqueProjectNames(Array.from(names));
        setAnnouncementTypes(Array.from(types));
    };


    const changePageIndex = (pageIndex: number) => {
        setPageIndexState(pageIndex);
    };

    const handleTypeSelect = (type: string | null) => {
        setSelectedType(prevType => prevType === type ? null : type);
    };

    const formatCustomDate = (inputDate: Date) => {
        const months = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];

        const day = inputDate.getDate();
        const monthIndex = inputDate.getMonth();
        const year = inputDate.getFullYear();

        return `${day} ${months[monthIndex]} ${year}`;
    };

    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleProjectSelect = (newValue: MultiValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>) => {
        const selectedProjectNames = newValue ? newValue.map(value => value.value) : [];
        setSelectedProjects(selectedProjectNames);
    };

    const handleAnnouncementRead = (announcementId: string) => {
        setReadAnnouncementIds(prevIds => [...prevIds, announcementId]);
    };


    const filterAnnouncements = () => {
        if (!announcementProjects) return;

        let filteredItems = [...announcementProjects.items];

        if (searchText) {
            filteredItems = filteredItems.filter(entity =>
                entity.announcement.title.toLowerCase().includes(searchText)
            );
        }

        if (selectedProjects.length > 0) {
            filteredItems = filteredItems.filter(entity =>
                selectedProjects.includes(entity.project.name)
            );
        }

        if (selectedType) {
            filteredItems = filteredItems.filter(entity =>
                entity.announcement.announcementTypeName === selectedType
            );
        }

        // Ters filtreleme: "Hepsini Göster" butonuna tıklandığında okunmamış duyuruları göster
        if (isClicked && readAnnouncementIds.length > 0) {
            filteredItems = filteredItems.filter(entity =>
                !readAnnouncementIds.includes(entity.id.toString())
            );
        }

        const filteredProjects: Paginate<GetListAnnouncementProjectResponse> = {
            from: 0,
            index: 0,
            size: filteredItems.length,
            count: filteredItems.length,
            pages: 1,
            items: filteredItems,
            hasPrevious: false,
            hasNext: false,
        };

        setFilteredAnnouncementProjects(filteredProjects);
    };


    const sortAnnouncements = (order: 'ascending' | 'descending') => {
        if (!filteredAnnouncementProjects || !filteredAnnouncementProjects.items) return;

        const sortedItems = [...filteredAnnouncementProjects.items];
        sortedItems.sort((a, b) => {
            const dateA = new Date(a.announcement.announcementDate).getTime();
            const dateB = new Date(b.announcement.announcementDate).getTime();
            return order === 'ascending' ? dateA - dateB : dateB - dateA;
        });

        const sortedProjects: Paginate<GetListAnnouncementProjectResponse> = {
            from: 0,
            index: 0,
            size: sortedItems.length,
            count: sortedItems.length,
            pages: 1,
            items: sortedItems,
            hasPrevious: false,
            hasNext: false,
        };

        setFilteredAnnouncementProjects(sortedProjects);
        setAscendingActive(order === 'ascending');
    };


    const pages = [];
    if (announcementProjects) {
        for (let pageIndex = 0; pageIndex < announcementProjects.pages; pageIndex++) {
            pages.push(
                <Pagination.Item onClick={() => changePageIndex(pageIndex)} key={pageIndex} active={pageIndex === pageIndexState}> {pageIndex + 1} </Pagination.Item>
            );
        }
    }


    return (
        <div className="row">
            <div className="announcements-page-wrapper">
                <h1 className='announcements-page-title'>Duyurularım</h1>
            </div>
            <div className="container announcements-search-area">
                <div className="announcements-search">
                    <div className="input-container">
                        <input type="text" id="search" onChange={handleInputFilter} placeholder="Arama" />
                        <IoSearch className="search-icon" />
                    </div>
                </div>
                <div className="announcements-dropdown-content">
                    <Dropdown>
                        <Dropdown.Toggle className='announcements-dropdown' >
                            Tür
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {announcementTypes.map((type, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={type}
                                    aria-label={type}
                                    onChange={() => handleTypeSelect(type)}
                                    checked={selectedType === type}
                                />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="announcements-dropdown-content">
                    <Select
                        defaultValue={null}
                        options={uniqueProjectNames.map(projectName => ({
                            value: projectName,
                            label: projectName,
                        }))}
                        isMulti
                        name="colors"
                        classNamePrefix="select"
                        placeholder="Organizasyon"
                        onChange={handleProjectSelect}
                    />
                </div>
                <div className="announcements-dropdown-content">
                    <Dropdown>
                        <Dropdown.Toggle >
                            Sıralama
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item active={ascendingActive} onClick={() => sortAnnouncements('ascending')}>Tarihe Göre (Y-E)</Dropdown.Item>
                            <Dropdown.Item active={!ascendingActive} onClick={() => sortAnnouncements('descending')}>Tarihe Göre (E-Y)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Tooltip
                    placement="top"
                    content={isClicked ? " Okunmuş olanları gizle " : "Hepsini Göster"}
                >
                    <div className="read-button" onClick={handleClick}>
                        {isClicked ? (
                            <div className="read-hide">
                            </div>
                        ) : (

                            <div className="read-show">
                            </div>
                        )}
                    </div>
                </Tooltip>
            </div>

            <div className="container announcements-page-content ">
                {filteredAnnouncementProjects && filteredAnnouncementProjects.items && filteredAnnouncementProjects.items.length > 0 ? (
                    <div className="announcements-page-area">
                        {filteredAnnouncementProjects.items.map((announcementProject) => (
                            <AnnouncementCard
                                announcementTypeName={announcementProject.announcement.announcementTypeName}
                                key={announcementProject.id}
                                projectName={announcementProject.project.name}
                                announcementName={announcementProject.announcement.title}
                                announcementDate={formatCustomDate(new Date(announcementProject.announcement.announcementDate))}
                                announcementDescription={announcementProject.announcement.description
                                    .split('\n')
                                    .filter(line => line.trim() !== '')
                                    .map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-announcements">
                        <p>Bir duyuru bulunmamaktadır. </p>
                    </div>
                )}

                <Col className="pagination-area" md={12}>
                    <Pagination style={{ display: announcementProjects && announcementProjects.pages > 1 ? 'flex' : 'none' }}>
                        <Pagination.Prev className="pagination-prev-next" disabled={pageIndexState === 0} onClick={() => changePageIndex(pageIndexState - 1)} >
                            <span aria-hidden="true"> &lt; </span>
                        </Pagination.Prev>
                        {pages}
                        <Pagination.Next className="pagination-prev-next" disabled={pageIndexState + 1 === announcementProjects?.pages} onClick={() => changePageIndex(pageIndexState + 1)}>
                            <span aria-hidden="true"> &gt; </span>
                        </Pagination.Next>
                    </Pagination>
                </Col>
            </div>
        </div>
    );
}
