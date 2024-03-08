import { useEffect, useRef, useState } from 'react'
import LessonCard from '../../components/LessonCard/LessonCard'
import { Progress } from 'antd'
import { FaCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import './EducationProgramContent.css'
import { Paginate } from '../../models/paginate';
import GetListLessonResponse from '../../models/responses/lesson/getListLessonResponse';
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';
import authService from '../../services/authService';
import lessonService from '../../services/lessonService';
import lessonLikeService from '../../services/lessonLikeService';
import accountService from '../../services/accountService';
import AddLessonLikeRequest from '../../models/requests/lessonLike/addLessonLikeRequest';
import DeleteLessonLikeRequest from '../../models/requests/lessonLike/deleteLessonLikeRequest';
import { Link, useParams } from 'react-router-dom';
import LikeButton from '../../components/LikeButton/LikeButton';
import { Accordion, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EducationDrawer from '../../components/EducationDrawer/EducationDrawer';
import AddEducationProgramLikeRequest from '../../models/requests/educationProgramLike/addEducationProgramLikeRequest';
import DeleteEducationProgramLikeRequest from '../../models/requests/educationProgramLike/deleteEducationProgramLikeRequest';
import { toast } from 'react-toastify';
import { GetListEducationProgramResponse } from '../../models/responses/educationProgram/getListEducationProgramResponse';
import educationProgramService from '../../services/educationProgramService';
import { QuestionCircleOutlined } from "@ant-design/icons";
import educationProgramLikeService from '../../services/educationProgramLikeService';
import GetListAccountLessonResponse from '../../models/responses/accountLesson/getListAccountLessonResponse';
import GetListEducationProgramLessonResponse from '../../models/responses/educationProgramLesson/getListEducationProgramLessonResponse';
import accountLessonService from '../../services/accountLessonService';
import educationProgramLessonService from '../../services/educationProgramLessonService';
import UpdateAccountLessonRequest from '../../models/requests/accountLesson/updateAccountLessonRequest';
import ReactPlayer from "react-player"
import AddAccountLessonRequest from '../../models/requests/accountLesson/addAccountLessonRequest';
import { ADDED_FAVORITE, DELETED_FAVORITE } from '../../environment/messages';
import SessionsPage from '../SessionsPage/SessionsPage';
import sessionService from '../../services/sessionService';
import GetListSessionResponse from '../../models/responses/session/getListSessionResponse';
import homeworkService from '../../services/homeworkService';
import GetListHomeworkResponse from '../../models/responses/homework/getListHomeworkResponse';
import AddAccountBadgeRequest from '../../models/requests/accountBadge/addAccountBadgeRequest';
import accountBadgeService from '../../services/accountBadgeService';
import AddAccountEducationProgramRequest from '../../models/requests/accountEducationProgram/addEducationProgramRequest';
import accountEducationProgramService from '../../services/accountEducationProgramService';
import UpdateAccountEducationProgramRequest from '../../models/requests/accountEducationProgram/updateEducationProgramRequest';
import GetListAccountEducationProgramResponse from '../../models/responses/accountEducationProgram/getAccountListEducationProgramResponse';
import GetLessonResponse from '../../models/responses/lesson/getLessonResponse';
import React from 'react';

export default function EducationProgramContent() {
    const [selectedLessonId, setSelectedLessonId] = useState<any>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedEducationProgram, setSelectedEducationProgram] = useState<GetListEducationProgramResponse>();
    const [selectedAccountEducationProgram, setSelectedAccountEducationProgram] = useState<GetListAccountEducationProgramResponse>();
    const [isLikedEducationProgram, setIsLikedEducationProgram] = useState<boolean>(false);
    const [educationProgramLikeCount, setEducationProgramLikeCount] = useState<number>(0);
    const [educationProgramLikers, setEducationProgramLikers] = useState<any>();

    const [isLikedLesson, setIsLikedLesson] = useState<boolean>(false);
    const [lessonLikeCount, setLessonLikeCount] = useState<number>(0);
    const [lessonLikers, setLessonLikers] = useState<any>();

    const [lessons, setLessons] = useState<Paginate<GetListLessonResponse>>();
    const [lesson, setLesson] = useState<GetLessonResponse>();
    const [accountLesson, setAccountLesson] = useState<GetListAccountLessonResponse>();
    const [accountLessonList, setAccountLessonList] = useState<Paginate<GetListAccountLessonResponse>>();
    const { educationProgramId } = useParams();
    const user = authService.getUserInfo();

    /*Video */

    const playerRef = useRef<ReactPlayer | null>(null);
    const [watchPercentage, setWatchPercentage] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>();


    useEffect(() => {
        educationProgramService.getById(String(educationProgramId)).then((result: any) => {
            setSelectedEducationProgram(result.data)
        })

        getIsLikedEducationProgram();
        getEducationProgramLikeCount();
        getEducationProgramLikers();
        getAccountEducationProgram();
        getLessons();
        getAccountLesson();
    }, [])

    const getAccountLesson = () => {
        accountLessonService.getByAccountId(user.id).then((result: any) => {
            setAccountLessonList(result.data)
        })
    }

    const getAccountEducationProgram = () => {
        accountEducationProgramService.getByAccountIdAndEducationProgramId(user.id, String(educationProgramId)).then((result: any) => {
            setSelectedAccountEducationProgram(result.data)
        })
    }

    useEffect(() => {
        if (selectedLessonId) {
            accountLessonService.getByAccountIdAndLessonId(user.id, selectedLessonId).then((result: any) => {
                setAccountLesson(result.data)
            });
            getLessonById(selectedLessonId);
        }

    }, [selectedLessonId]);

    useEffect(() => {
        getEducationProgramLikeCount();
        getEducationProgramLikers();
    }, [isLikedEducationProgram]);



    /* Like Button - EducationProgram */
    const getIsLikedEducationProgram = () => {
        educationProgramLikeService.getByEducationProgramIdAndAccountId(String(educationProgramId), user.id).then((result: any) => {
            setIsLikedEducationProgram(result.data);
        })
    }

    const getEducationProgramLikeCount = () => {
        educationProgramLikeService.getByEducationProgramId(String(educationProgramId)).then((result: any) => {
            setEducationProgramLikeCount(result.data.count);
        })
    }

    const getEducationProgramLikers = (likersPaginateIndex: number = 0) => {
        accountService.getByEducationProgramIdForLike(String(educationProgramId), likersPaginateIndex, 10).then((result: any) => {
            setEducationProgramLikers(result.data);
        })
    }

    const handleEducationProgramLikersPaginate = (likersPaginateIndex: number) => {
        getEducationProgramLikers(likersPaginateIndex);
    }

    const handleEducationProgramLikeFromChild = async (isLiked: any) => {

        if (isLiked) {
            const addEducationProgramLike: AddEducationProgramLikeRequest = {
                accountId: user.id,
                educationProgramId: String(educationProgramId)
            };
            await educationProgramLikeService.add(addEducationProgramLike);
        } else {
            const deleteEducationProgramLike: DeleteEducationProgramLikeRequest = {
                accountId: user.id,
                educationProgramId: String(educationProgramId)
            };
            await educationProgramLikeService.deleteByAccountIdAndEducationProgramId(deleteEducationProgramLike);
        }
        setIsLikedEducationProgram(isLiked);
    };



    /* Like Button - Lesson */
    const getIsLikedLesson = () => {
        lessonLikeService.getByLessonIdAndAccountId(String(selectedLessonId), user.id).then((result: any) => {
            setIsLikedLesson(result.data);
        })
    }

    const getLessonLikeCount = () => {
        lessonLikeService.getByLessonId(String(selectedLessonId)).then((result: any) => {
            setLessonLikeCount(result.data.count);
        })
    }

    const getLessonLikers = (likersPaginateIndex: number = 0) => {
        accountService.getByLessonIdForLike(selectedLessonId, likersPaginateIndex, 10).then((result: any) => {
            setLessonLikers(result.data);
        })
    }

    const handleLessonLikersPaginate = (likersPaginateIndex: number) => {
        getLessonLikers(likersPaginateIndex);
    }

    const handleLessonLikeFromChild = async (isLiked: any) => {
        if (isLiked) {
            const addLessonLike: AddLessonLikeRequest = {
                accountId: user.id,
                lessonId: selectedLessonId
            };
            await lessonLikeService.add(addLessonLike);
        } else {
            const deleteLessonLikeRequest: DeleteLessonLikeRequest = {
                accountId: user.id,
                lessonId: selectedLessonId
            };
            await lessonLikeService.deleteByAccountIdAndLessonId(deleteLessonLikeRequest);
        }
        setIsLikedLesson(isLiked);
        getLessonLikeCount();
    };



    const showDrawer = () => {
        setOpenDrawer(true);
        getIsLikedLesson();
        getLessonLikeCount();
        getLessonLikers();
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const getLessons = () => {
        lessonService.getByEducationProgramId(String(educationProgramId)).then((result: any) => {
            setLessons(result.data);
            setLesson(result.data.items[0]);
            setSelectedLessonId(result.data.items[0].id);
        })
    }

    const getLessonById = (selectedLessonId: any) => {
        if (selectedLessonId) {
            lessonService.getById(String(selectedLessonId)).then((result: any) => {
                setLesson(result.data);
            })
        }
    }

    const handleSelectLesson = async (selectedLessonId: any) => {
        accountLessonService.getByAccountIdAndLessonId(user.id, selectedLessonId).then((result: any) => {
            setAccountLesson(result.data)
        });
        getLessonById(selectedLessonId);
        setSelectedLessonId(selectedLessonId)

    };

    const calculateWatchPercentage = (playedSeconds: number, duration: number) => {
        const percentage = (playedSeconds / duration) * 100;
        const formattedPercentage = parseFloat(percentage.toFixed(1));
        setWatchPercentage(formattedPercentage);
        setVideoDuration(parseInt((duration / 60).toFixed(1)));
    };

    const handleAddAccountLessonStatus = async (lessonId: any) => {
        if (!accountLesson) {
            const addAccountLesson: AddAccountLessonRequest = {
                accountId: user.id,
                lessonId: lessonId,
                statusPercent: 0
            };
            await accountLessonService.add(addAccountLesson);
            accountLessonService.getByAccountIdAndLessonId(user.id, lessonId).then((result: any) => {
                setAccountLesson(result.data)
            });
            getAccountLesson();
        }
    }

    const handleUpdateAccountLessonStatus = async () => {
        if (accountLesson) {
            if (watchPercentage > accountLesson.statusPercent) {
                const updateAccountLesson: UpdateAccountLessonRequest = {
                    id: accountLesson.id,
                    accountId: user.id,
                    lessonId: lesson?.id!,
                    statusPercent: watchPercentage
                };
                await accountLessonService.update(updateAccountLesson);
                accountLessonService.getByAccountIdAndLessonId(user.id, String(lesson?.id)).then((result: any) => {
                    setAccountLesson(result.data)
                });
                getAccountLesson();
            }
        }
    };

    const handleAddAccountBadge = async () => {
        const badgeId = selectedEducationProgram?.badgeId;
        var result = await accountBadgeService.getByAccountAndBadgeId(user.id, badgeId!)
        if (!result.data) {
            const addAccountBadgeRequest: AddAccountBadgeRequest = {
                accountId: user.id,
                badgeId: badgeId!
            }
            await accountBadgeService.add(addAccountBadgeRequest)
        }
    }

    const handleAddAccountEducationProgramStatus = async (statusPercent: any) => {
        if (selectedEducationProgram?.id) {
            const addAccountEducationProgram: AddAccountEducationProgramRequest = {
                accountId: user.id,
                educationProgramId: selectedEducationProgram?.id,
                statusPercent: statusPercent
            };
            await accountEducationProgramService.add(addAccountEducationProgram);
        }
    }

    const handleUpdateAccountEducationProgramStatus = async (statusPercent: any) => {
        if (selectedAccountEducationProgram?.id) {
            const updateAccountEducationProgram: UpdateAccountEducationProgramRequest = {
                id: selectedAccountEducationProgram.id,
                accountId: user.id,
                educationProgramId: selectedEducationProgram?.id!,
                statusPercent: statusPercent
            };
            await accountEducationProgramService.update(updateAccountEducationProgram);
        }
    }


    /* ProgressBar */
    const totalLessonCount = lessons?.count || 0;
    const completedLessonCount = accountLessonList?.items.filter(item => item.statusPercent > 99.2).length || 0;
    const completionPercentage = totalLessonCount > 0 ? (completedLessonCount / totalLessonCount) * 100 : 0;
    if (completionPercentage > 99.2) { handleAddAccountBadge() }


    const totalStatusPercent = accountLessonList?.items.reduce((acc, item) => acc + item.statusPercent, 0) || 0;
    let calculatedPoints = (totalStatusPercent / (totalLessonCount * 100)) * 100;
    calculatedPoints = calculatedPoints > 99.2 ? 100 : parseFloat(calculatedPoints.toFixed(1));

    useEffect(() => {
        if (selectedEducationProgram) {
            accountEducationProgramService.getByAccountIdAndEducationProgramId(user.id, String(selectedEducationProgram?.id)).then((result: any) => {
                setSelectedAccountEducationProgram(result.data)
                if (result.data) handleUpdateAccountEducationProgramStatus(calculatedPoints);
                else handleAddAccountEducationProgramStatus(calculatedPoints);
            })
        }

        if (calculatedPoints > 99.2) handleAddAccountBadge()

    }, [calculatedPoints])


    return (
        <div>
            <div className='container education-program-content mt-5'>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="Activity-Detail-Header">
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-1">
                                        <Image
                                            className="activity-image "
                                            src={selectedEducationProgram?.thumbnailPath}
                                            alt="lesson-image" />
                                    </div>
                                    <div className="col-md-11">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="Activity-title">
                                                    <h3>{selectedEducationProgram?.name}</h3>
                                                </div>
                                                <div className="date-info-container">
                                                    <OverlayTrigger
                                                        placement="right"
                                                        overlay={
                                                            <Tooltip id="tooltip-right" >
                                                                <div className="date-tooltip">
                                                                    <div className="lesson-title">
                                                                        Eğitimi nasıl tamamlayabilirim?
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-content">
                                                                        Eğitimde yer alan tüm içerikleri tamamladığında (
                                                                        {`${(accountLessonList?.items.filter(item => item.statusPercent > 99.2).length || 0)}/${lessons?.count || 0}`}
                                                                        )
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-title">
                                                                        Eğitimi nasıl başarabilirim?
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-content">
                                                                        Eğitimde yer alan tüm içerikleri tamamladığında
                                                                        ({`${(accountLessonList?.items.filter(item => item.statusPercent > 99.2).length || 0)}/${lessons?.count || 0}`})
                                                                    </div>
                                                                </div>
                                                            </Tooltip>
                                                        }>
                                                        <div className="date-info">
                                                            <div>
                                                                {selectedAccountEducationProgram && selectedAccountEducationProgram?.statusPercent > 99.2 ? (
                                                                    <div className="unit-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3DCB79" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
                                                                        <span className='tooltip-congrats-text'>Başardın!</span>
                                                                    </div>
                                                                ) : (
                                                                    <span>
                                                                        Bitirmek için {(selectedEducationProgram?.deadline) ? Math.round(((new Date(selectedEducationProgram?.deadline)).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24)) : ""} günün var
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="question-icon">
                                                                <QuestionCircleOutlined />
                                                            </div>
                                                        </div>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                            <div className="activity-process col-md-3">
                                                <div className="activity-score" >
                                                    <div className="activity-button" >
                                                        {selectedAccountEducationProgram?.statusPercent || 0} PUAN
                                                    </div>
                                                    {
                                                        <LikeButton
                                                            key={String(educationProgramId)}
                                                            isLiked={isLikedEducationProgram}
                                                            likeCount={educationProgramLikeCount}
                                                            likers={educationProgramLikers}
                                                            likersPaginateCount={educationProgramLikers?.pages}
                                                            likersTotalCount={educationProgramLikers?.count}
                                                            onDataFromLikeButton={handleEducationProgramLikeFromChild}
                                                            likersPaginateIndex={handleEducationProgramLikersPaginate} />
                                                    }
                                                    <Image src={
                                                        isFavorite
                                                            ? "https://lms.tobeto.com/tobeto/eep/Styles/assets/css/img/icon/learning-experience-platform/remove-favorite.svg"
                                                            : "https://lms.tobeto.com/tobeto/eep/Styles/assets/css/img/icon/learning-experience-platform/add-favorite.svg"}
                                                        alt={isFavorite ? "remove-favorite-icon" : "add-favorite-icon"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="progress-wrapper col-xs-12">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top"><div className="tooltip-color">
                                                        Eğitim Tamamlama Oranı
                                                    </div></Tooltip >}>
                                                    <Progress percent={selectedAccountEducationProgram?.statusPercent} />
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>

                <div className="row">
                    <div className='col-md-5 mt-5'>
                        <div className='accordion-area'>
                            {
                                <Accordion className='accordion-education-program-lesson'>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>{selectedEducationProgram?.name}</Accordion.Header>
                                        {lessons?.items.map((lesson) => {
                                            const lessonId = lesson.id;
                                            const matchingLesson = accountLessonList?.items.find(lesson => lesson.lessonId === lessonId);
                                            const statusPercent = matchingLesson?.statusPercent || 0;

                                            return (
                                                <React.Fragment key={String(lessonId)}>
                                                    <Accordion.Body className={selectedLessonId === lesson.id ? "active-accordion" : ""} onClick={() => handleSelectLesson(lesson.id)}>
                                                        <div className='lesson-info'>
                                                            <span>{lesson.name}</span>
                                                            <span className='unit-ongoing' style={statusPercent! > 99.2 || statusPercent === 0 ? { display: 'none' } : { display: 'flex' }}>
                                                                <Image src='/assets/Icons/unit-ongoing.svg' width={14} height={14}></Image>
                                                            </span>
                                                            <span className="unit-end" style={statusPercent > 99.2 ? { display: 'flex' } : { display: 'none' }}>
                                                                <Image src='/assets/Icons/unit-completed.svg' width={14} height={14}></Image>
                                                            </span>
                                                        </div>
                                                        <div className='lesson-type-info'>
                                                            <span>{lesson.lessonSubTypeName} -</span> <span>{videoDuration} dk</span>
                                                        </div>
                                                    </Accordion.Body>
                                                </React.Fragment>
                                            );
                                        })}
                                    </Accordion.Item>
                                </Accordion>
                            }
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div>
                            <LessonCard header={
                                <div className="lesson-card-content"  >
                                    <ReactPlayer
                                        ref={playerRef}
                                        className="lesson-card-video"
                                        url={lesson?.lessonPath}
                                        width='100%'
                                        height='100%'
                                        onStart={() => handleAddAccountLessonStatus(lesson?.id)}
                                        onPause={() => handleUpdateAccountLessonStatus()}
                                        onProgress={({ playedSeconds }) => {
                                            const duration = playerRef.current?.getDuration() || 0;
                                            calculateWatchPercentage(playedSeconds, duration);
                                        }}
                                        controls={true} />
                                </div>}
                                title={<div className='lesson-title'>{lesson?.name}</div>}
                                text={
                                    <div className='lesson-text d-flex'>
                                        <span>{lesson?.lessonSubTypeName} - {videoDuration} dk </span>
                                        {accountLesson?.id === undefined || accountLesson?.statusPercent === 0 ? (
                                            <span style={{ display: 'block' }}>
                                                <FaCircle className='lesson-card-icon-first' /> Başlamadın
                                            </span>
                                        ) : (
                                            <>
                                                <span style={accountLesson && (accountLesson?.statusPercent === 0 || accountLesson?.statusPercent > 99.2) ? { display: 'none' } : { display: 'flex' }}>
                                                    <div className='unit-icon unit-ongoing'></div>
                                                    Devam Ediyor
                                                </span>
                                                <span className="unit-end" style={accountLesson?.statusPercent > 99.2 ? { display: 'flex' } : { display: 'none' }}>
                                                    <div className='unit-point'>
                                                        {accountLesson?.statusPercent > 99.2 ? 100 : ""}  Puan
                                                    </div>
                                                    <div className="unit-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3DCB79" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
                                                    </div>
                                                    Tebrikler, tamamladın!
                                                </span>
                                            </>
                                        )}
                                    </div>
                                }
                                button={<Button onClick={showDrawer} className='lesson-card-btn'>DETAY</Button>} />
                        </div>

                    </div>
                </div>
            </div>

            <div className='education-drawer-page'>
                <EducationDrawer
                    open={openDrawer}
                    onClose={onCloseDrawer}
                    body={
                        <>
                            <div className='education-drawer-content'>
                                <div className='education-drawer-content-left'>
                                    <Image src='https://lms.tobeto.com/tobeto/eep/common_show_picture_cached.aspx?pQS=DiBldjEKnwJCe69nG2MNII%2bkPM%2fmZBEP' />
                                </div>
                                <div className='education-drawer-content-middle'>
                                    <div className='education-title'>
                                        <span>{lesson?.name}</span>
                                    </div>
                                    <div className='education-sub-details'>
                                        <div className='tag-blue'>
                                            <span>{lesson?.lessonSubTypeName}</span>
                                        </div>
                                        <div className='course-detail-info'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path></svg>
                                            <span>{videoDuration} dk</span>
                                        </div>
                                        <div className='course-detail-info'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                                            <span>59</span>
                                        </div>
                                    </div>
                                    <LikeButton
                                        key={String(selectedLessonId)}
                                        isLiked={isLikedLesson}
                                        likeCount={lessonLikeCount}
                                        likers={lessonLikers}
                                        likersPaginateCount={lessonLikers?.pages}
                                        likersTotalCount={lessonLikers?.count}
                                        onDataFromLikeButton={handleLessonLikeFromChild}
                                        likersPaginateIndex={handleLessonLikersPaginate} />

                                </div>
                                <div className='education-drawer-content-right'>
                                    <div className='ed-drawer-top-content'>
                                        <div className='ed-drawer-button-area'>
                                            <Button className='go-education'>EĞİTİME  GİT</Button>
                                            <Button className='more'>
                                                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="ellipsis" width="2em" height="2em" fill="currentColor" aria-hidden="true"><path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='ed-drawer-sub-content'>
                                        <div className='ed-drawer-text-area'>
                                            <div className='ed-drawer-course-status-info not-start' style={accountLesson === undefined || accountLesson.statusPercent === 0 ? { display: 'block' } : { display: 'none' }}>
                                                <FaCircle className='lesson-card-icon-first' />
                                                <span>Başlamadın</span>
                                            </div>
                                            <div className='ed-drawer-course-status-info' style={accountLesson && (accountLesson?.statusPercent === 0 || accountLesson?.statusPercent > 99.2) ? { display: 'none' } : { display: 'block' }}>
                                                <span><div className='unit-icon unit-ongoing'></div> Devam Ediyor</span>
                                            </div>


                                            <div className='ed-drawer-course-status-info' style={accountLesson && accountLesson?.statusPercent > 99.2 ? { display: 'flex' } : { display: 'none' }}>
                                                <span className="unit-end" >
                                                    <div className="unit-icon" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3DCB79" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
                                                    </div>
                                                    Tebrikler, tamamladın!

                                                    <div className='unit-point'>
                                                        {accountLesson && accountLesson?.statusPercent > 99.2 ? 100 : ""}  PUAN
                                                    </div>
                                                </span>

                                                <div className='ed-drawer-course-status-score ' style={accountLesson?.statusPercent === 0 ? { display: 'none' } : { display: 'block' }}>
                                                    <span className='unit-end-text'></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                            </div >
                            <div className='education-drawer-content-bottom' >
                                <div className="education-drawer-info">
                                    <div className='education-drawer-categories-title title'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f6c6c" viewBox="0 0 256 256" transform="rotate(90)">
                                            <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
                                        </svg>
                                        <span>Kategori</span>
                                    </div>
                                    <div className='education-drawer-categories'>
                                        <span>{lesson?.lessonCategoryName}</span>
                                    </div>
                                </div>
                                <div className="education-drawer-info">
                                    <div className='education-drawer-languages-title title'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path></svg>
                                        <span>Dili</span>
                                    </div>
                                    <div className='education-drawer-languages'>
                                        <span>{lesson?.languageName}</span>
                                    </div>
                                </div>
                                <div className="education-drawer-info">
                                    <div className='education-drawer-lesson-sub-type-title title'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                                        <span>Alt Tip</span>
                                    </div>
                                    <div className='education-drawer-lesson-sub-type'>
                                        <span>{lesson?.lessonSubTypeName}</span>
                                    </div>
                                </div>
                                <div className="education-drawer-info">
                                    <div className='education-drawer-production-company-title title'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v72H40V72Zm0,128H40V160H216v40Z"></path></svg>
                                        <span>Üretici Firma</span>
                                    </div>
                                    <div className='education-drawer-production-company'>
                                        <span> <Link to={"https://www.enocta.com/"} >{lesson?.productionCompanyName}</Link></span>
                                    </div>
                                </div>
                                <div className="education-drawer-info">
                                    <div className='education-drawer-lesson-description-title title'>
                                        <span>İçerik</span>
                                    </div>
                                    <div className='education-drawer-lesson-description'>
                                        <span>{lesson?.name}</span>
                                    </div>
                                </div>
                            </div>

                        </>
                    }
                />
            </div >
        </div >
    )

}