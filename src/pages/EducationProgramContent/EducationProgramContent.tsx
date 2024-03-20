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
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import LikeButton from '../../components/LikeButton/LikeButton';
import { Accordion, Image, OverlayTrigger, Tab, Tabs, Tooltip } from 'react-bootstrap';
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
import AddAccountViewLessonRequest from '../../models/requests/accountViewLesson/addAccountViewLessonRequest';
import accountViewLessonService from '../../services/accountViewLessonService';
import GetListAccountViewLessonResponse from '../../models/responses/accountViewLesson/getListAccountViewLessonResponse';
import accountFavoriteEducationProgramService from '../../services/accountFavoriteEducationProgramService';
import AddAccountFavoriteEducationProgramRequest from '../../models/requests/accountFavoriteEducationProgram/addAccountFavoriteEducationProgramRequest';
import ProfileToaster from '../../components/ProfileToaster/ProfileToaster';
import DeleteAccountFavoriteEducationProgramRequest from '../../models/requests/accountFavoriteEducationProgram/deleteAccountFavoriteEducationProgramRequest';
import { ASYNCHRONOUS_LESSON, PDF_LESSON, TOAST_SUCCESS } from '../../environment/environment';
import moment, { duration } from 'moment';
export default function EducationProgramContent() {
    const [selectedLessonId, setSelectedLessonId] = useState<any>();
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

    const [accountViewLessonCount, setAccountViewLessonCount] = useState<number>(0);

    const [isFavoriteEducationProgram, setIsFavoritedEducationProgram] = useState<boolean>(false);


    const { educationProgramId } = useParams();
    const user = authService.getUserInfo();

    const navigate = useNavigate();

    /*Video */

    const playerRef = useRef<ReactPlayer | null>(null);
    const [watchPercentage, setWatchPercentage] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);

    const [totalPlayedSeconds, setTotalPlayedSeconds] = useState(0);
    const [lessonWatchDurations, setLessonWatchDurations] = useState<{ [key: string]: number }>({});

    const [isDoneSession, setIsDoneSession] = useState<number>();
    const [sessions, setSessions] = useState<Paginate<GetListSessionResponse>>();
    const [homeworks, setHomeworks] = useState<Paginate<GetListHomeworkResponse>>();
    const [educationProgramLessons, setEducationProgramLessons] = useState<Paginate<GetListEducationProgramLessonResponse>>();

    useEffect(() => {

        getEducationProgramById(educationProgramId);
        getIsLikedEducationProgram();
        getEducationProgramLikeCount();
        getEducationProgramLikers();
        getAccountEducationProgram();
        getLessons();
        getAccountLesson();
        getFavoriteEducationProgram();
    }, [])

    const getEducationProgramById = (educationProgramId: any) => {
        educationProgramService.getById(educationProgramId).then((result: any) => {
            setSelectedEducationProgram(result.data)
        })
    }

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
            sessionService.getByLessonId(selectedLessonId).then((result: any) => {
                setSessions(result.data);
            })

            homeworkService.getByLessonIdAsync(selectedLessonId).then((result: any) => {
                setHomeworks(result.data);
            })
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
            setEducationProgramLikeCount(result?.data.count);
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
            setLessonLikeCount(result?.data.count);
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
        getViewLesson();
    };

    const getViewLesson = () => {
        accountViewLessonService.getByLessonId(selectedLessonId).then((result: any) => {
            if (result.data) {
                setAccountViewLessonCount(result.data.count)
            }
        })
    }
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
        setTotalVideoDuration(videoDuration + parseInt((duration / 60).toFixed(1)));
        setVideoDuration(parseInt((duration / 60).toFixed(1)));
    };


    const startVideoActions = async (lessonId: any) => {
        await handleAddAccountLessonStatus(lessonId);
        await handleAddAccountViewLessonStatus(lessonId);
    }


    const handleAddAccountViewLessonStatus = async (lessonId: any) => {
        var result = await accountViewLessonService.getByAccountIdAndLessonId(user.id, lessonId);
        if (!result.data) {
            const addAccountViewLesson: AddAccountViewLessonRequest = {
                accountId: user.id,
                lessonId: lessonId,
            };
            await accountViewLessonService.add(addAccountViewLesson);
        }
    }

    /*Favorite Button */

    const getFavoriteEducationProgram = () => {
        accountFavoriteEducationProgramService.getByAccountIdAndEducationProgramId(user.id, String(educationProgramId)).then((result) => {
            if (result.data) setIsFavoritedEducationProgram(true);
            else setIsFavoritedEducationProgram(false);
        })
    }

    const handleChangeFavoriteStatus = async (favoriteStatus: boolean) => {
        if (favoriteStatus) {
            await handleAddFavorite();
        }
        else {
            await handleDeleteFavorite();
        }
    }
    const handleAddFavorite = async () => {
        const addFavoriteEducationProgram: AddAccountFavoriteEducationProgramRequest = {
            accountId: user.id,
            educationProgramId: String(educationProgramId)
        }
        await accountFavoriteEducationProgramService.add(addFavoriteEducationProgram);
        ProfileToaster({
            name: ADDED_FAVORITE
        })
        await getFavoriteEducationProgram();
    }

    const handleDeleteFavorite = async () => {
        const deleteFavoriteEducationProgram: DeleteAccountFavoriteEducationProgramRequest = {
            accountId: user.id,
            educationProgramId: String(educationProgramId)
        }
        await accountFavoriteEducationProgramService.deleteByAccountIdAndEducationProgramId(deleteFavoriteEducationProgram);
        ProfileToaster({
            name: DELETED_FAVORITE,
            type: TOAST_SUCCESS
        })
        await getFavoriteEducationProgram();
    }


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

                const lessonDurationsArray = Object.values(lessonWatchDurations);
                let totalSeconds = 0;

                lessonDurationsArray.forEach(seconds => {
                    totalSeconds! += seconds;
                });
                setTotalPlayedSeconds(parseInt(totalSeconds!.toFixed(1)));
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

    const formatMinuteSecond = (second: any) => {
        const minutes: number = Math.floor(second / 60);
        const remainingSeconds: number = second % 60;

        if (minutes > 0) {
            if (remainingSeconds > 0) {
                return `${minutes} dk ${remainingSeconds} sn`;
            } else {
                return `${minutes} dk`;
            }
        } else {
            return `${remainingSeconds} sn`;
        }
    };

    const formatHourMinute = (minute: any) => {
        const hours = Math.floor(minute / 60);
        const minutes = minute % 60;

        if (hours > 0) {
            return `${hours} sa ${minutes} dk`;
        } else {
            return `${minutes} dk`;
        }
    }
    const handleAddAccountEducationProgramStatus = async (statusPercent: any) => {
        if (selectedEducationProgram?.id) {
            const addAccountEducationProgram: AddAccountEducationProgramRequest = {
                accountId: user.id,
                educationProgramId: selectedEducationProgram?.id,
                statusPercent: statusPercent,
                timeSpent: totalPlayedSeconds
            };
            await accountEducationProgramService.add(addAccountEducationProgram);
            getAccountEducationProgram();
        }
    }


    const handleUpdateAccountEducationProgramStatus = async (statusPercent: any) => {
        if (selectedAccountEducationProgram?.id) {
            const updateAccountEducationProgram: UpdateAccountEducationProgramRequest = {
                id: selectedAccountEducationProgram.id,
                accountId: user.id,
                educationProgramId: selectedEducationProgram?.id!,
                statusPercent: statusPercent,
                timeSpent: totalPlayedSeconds || selectedAccountEducationProgram.timeSpent
            };
            await accountEducationProgramService.update(updateAccountEducationProgram);
            getAccountEducationProgram();
        }
    }
    let openedWindow: any;
    const goToLessonPath = (lesson: any) => {
        openedWindow = window.open(lesson?.lessonPath!, '_blank');
        handleAddAccountLessonStatus(lesson.id);
    }

    const checkWindowClosed = setInterval(function () {
        if (openedWindow && openedWindow.closed) {
            clearInterval(checkWindowClosed);
            setWatchPercentage(100);
            handleUpdateAccountLessonStatus();
        }
    }, 1000);

    const countByLessonSubTypeName: { [key: string]: number } = lessons?.items.reduce((acc: any, lesson) => {
        const { lessonSubTypeName } = lesson;
        acc[lessonSubTypeName] = (acc[lessonSubTypeName] || 0) + 1;
        return acc;
    }, {});

    /* ProgressBar */
    const totalLessonCount = lessons?.count || 0;
    const completedLessonCount = accountLessonList?.items.filter(item => item.statusPercent > 99.2).length || 0;
    const completionPercentage = totalLessonCount > 0 ? (completedLessonCount / totalLessonCount) * 100 : 0;

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

    useEffect(() => {
        if (educationProgramId) {
            educationProgramLessonService.getByEducationProgramId(educationProgramId).then((result: any) => {
                setEducationProgramLessons(result.data);
            });
        }

    }, [educationProgramId])

    const handleDataFromSessionPage = (dataFromSessionPage: any) => {
        setIsDoneSession(dataFromSessionPage)
    };
    return (
        <div>
            <div className='container education-program-content mt-5'>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="activity-detail-header">
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
                                                                <div className="date-tooltip" style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>
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

                                                                <div className="date-tooltip" style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }} >
                                                                    <div className="lesson-title">
                                                                        Eğitimi nasıl tamamlayabilirim?
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-content">
                                                                        Eğitimde yer alan tüm içerikleri tamamladığında (
                                                                        {`${((isDoneSession === sessions?.count ? educationProgramLessons?.count : 0)) || 0}/${educationProgramLessons?.count || 0}`})
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-title">
                                                                        Eğitimi nasıl başarabilirim?
                                                                    </div>
                                                                    <br />
                                                                    <div className="lesson-content">
                                                                        Eğitimde yer alan tüm içerikleri tamamladığında (
                                                                        {`${((isDoneSession === sessions?.count ? educationProgramLessons?.count : 0)) || 0}/${educationProgramLessons?.count || 0}`})
                                                                    </div>
                                                                </div>
                                                            </Tooltip>
                                                        }>
                                                        <div className="date-info">
                                                            <div style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>
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

                                                            <div style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }} >
                                                                {(isDoneSession! / sessions?.count!) * 100 === 100 ? (
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
                                                <div className="activity-score" style={{ justifyContent: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "end" : "space-between" }}>
                                                    <div className="activity-button" style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "none" : "block" }}>
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
                                                    <Image
                                                        onClick={() => handleChangeFavoriteStatus(!isFavoriteEducationProgram)}
                                                        src={
                                                            isFavoriteEducationProgram
                                                                ? "https://lms.tobeto.com/tobeto/eep/Styles/assets/css/img/icon/learning-experience-platform/remove-favorite.svg"
                                                                : "https://lms.tobeto.com/tobeto/eep/Styles/assets/css/img/icon/learning-experience-platform/add-favorite.svg"}
                                                        alt={isFavoriteEducationProgram ? "remove-favorite-icon" : "add-favorite-icon"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>
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

                                        <div className="row" style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }} >
                                            <div className="progress-wrapper col-xs-12">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-top"><div className="tooltip-color">
                                                        Eğitim Tamamlama Oranı
                                                    </div></Tooltip >}>
                                                    <Progress percent={(isDoneSession! / sessions?.count!) * 100} />
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>

                <div className='education-program-tab-menu'>
                    <Tabs
                        defaultActiveKey="content"
                        id="education-program-tab-menu"
                        className="tab-menu mt-4">
                        <Tab eventKey="content" title="İçerik">
                            <div className="row">
                                <div className='col-md-5 mt-3'>
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
                                                                <Accordion.Body style={lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? { display: 'block' } : { display: 'none' }} className={selectedLessonId === lesson.id ? "active-accordion" : ""} onClick={() => handleSelectLesson(lesson.id)}>
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

                                                                <Accordion.Body style={lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? { display: 'block' } : { display: 'none' }} className={selectedLessonId === lessonId ? "active-accordion" : ""} onClick={() => handleSelectLesson(lessonId)} key={String(lessonId)}>
                                                                    <div className='lesson-info'>
                                                                        <span>{lesson.name}</span>
                                                                        <span className='unit-ongoing' style={isDoneSession === 0 || isDoneSession === sessions?.count ? { display: 'none' } : { display: 'block' }}>
                                                                            <Image src='/assets/Icons/unit-ongoing.svg' width={14} height={14}></Image>
                                                                        </span>
                                                                        <span className="unit-end" style={isDoneSession === sessions?.count ? { display: 'flex' } : { display: 'none' }}>
                                                                            <Image src='/assets/Icons/unit-completed.svg' width={14} height={14}></Image>
                                                                        </span>
                                                                    </div>
                                                                    <div className='lesson-type-info'>
                                                                        <span>{lesson.lessonSubTypeName} -</span> <span>{lesson?.duration} dk</span>
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
                                    <div style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }}>
                                        <LessonCard header={
                                            <div className="lesson-card-content"  >
                                                <ReactPlayer
                                                    key={String(lesson?.id)}
                                                    ref={playerRef}
                                                    className="lesson-card-video"
                                                    url={lesson?.lessonPath}
                                                    width='100%'
                                                    height='100%'
                                                    onStart={() => startVideoActions(lesson?.id)}
                                                    onPause={() => handleUpdateAccountLessonStatus()}
                                                    onProgress={({ playedSeconds, played, loaded }) => {
                                                        const duration = playerRef.current?.getDuration() || 0;
                                                        const updatedLessonWatchDurations = { ...lessonWatchDurations };
                                                        updatedLessonWatchDurations[String(lesson?.id)] = playedSeconds;
                                                        setLessonWatchDurations(updatedLessonWatchDurations);
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

                                    <div style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }}>
                                        <LessonCard header={
                                            <div className="lesson-card-content">
                                                <Image src={lesson?.lessonPath === null || lesson?.lessonPath === undefined ? "" : lesson?.lessonPath}></Image>
                                            </div>}
                                            title={<div className='lesson-title'>{lesson?.name}</div>}
                                            text={
                                                <div className='lesson-text d-flex'>
                                                    <span>{lesson?.lessonSubTypeName}</span>
                                                    {isDoneSession === undefined || isDoneSession === 0 ? (
                                                        <span className='session-lesson' style={{ display: 'block' }}>
                                                            <FaCircle className='lesson-card-icon-first' /> Başlamadın
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span style={isDoneSession === 0 || isDoneSession === sessions?.count ? { display: 'none' } : { display: 'flex' }}>
                                                                <div className='unit-icon unit-ongoing'></div>
                                                                Devam Ediyor
                                                            </span>
                                                            <span className="unit-end" style={isDoneSession === sessions?.count ? { display: 'flex' } : { display: 'none' }}>
                                                                <div className="unit-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3DCB79" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
                                                                </div>
                                                                Tebrikler, tamamladın!
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            }
                                            button={
                                                <>
                                                    <Button onClick={showDrawer} className='lesson-card-btn'>DETAY</Button>
                                                    <SessionsPage style={{ display: sessions && sessions.count > 0 && lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }} onDataFromSessionPage={handleDataFromSessionPage} sessions={sessions} homeworks={homeworks} lessonId={selectedLessonId}></SessionsPage>

                                                </>
                                            } />
                                    </div>

                                    <div style={{ display: lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>
                                        <LessonCard header={
                                            <div className="lesson-card-content">
                                                <Image src={lesson?.lessonPath === null || lesson?.lessonPath === undefined ? "" : lesson?.lessonPath}></Image>
                                            </div>}
                                            title={<div className='lesson-title'>{lesson?.name}</div>}
                                            text={
                                                <div className='lesson-text d-flex'>
                                                    <span>{lesson?.lessonSubTypeName}</span>
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
                                            button={
                                                <>

                                                    <div className="lesson-card-pdf-buttons">
                                                        <Button className='lesson-card-btn' onClick={() => goToLessonPath(lesson)}>Başla</Button>
                                                        <Button onClick={showDrawer} className='lesson-card-btn'>DETAY</Button>
                                                    </div>
                                                </>
                                            } />
                                    </div>
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="about" title="Hakkında">
                            <div className='education-program-about'>
                                <div className="content">
                                    <div className="education-program-info">
                                        <div className='education-program-date-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
                                            </svg>
                                            <span>Başlangıç</span>
                                        </div>
                                        <div className='education-program-date text'>
                                            <span>{moment(selectedEducationProgram?.startDate).format("DD MMM YYYY HH:mm")}</span>
                                        </div>

                                        <div className='education-program-deadline-title title'>
                                            <span>Bitiş</span>
                                        </div>
                                        <div className='education-program-date text'>
                                            <span>{moment(selectedEducationProgram?.deadline).format("DD MMM YYYY HH:mm")}</span>
                                        </div>
                                    </div>
                                    <div className="education-program-info">
                                        <div className='education-program-time-spent-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path></svg>
                                            <span>Geçirdiğin Süre</span>
                                        </div>
                                        <div className='education-program-time-spent text'>
                                            <span>{formatMinuteSecond(selectedAccountEducationProgram?.timeSpent)}</span>
                                        </div>
                                    </div>
                                    <div className="education-program-info">
                                        <div className='education-program-estimated-time-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path></svg>
                                            <span>Tahmini Süre</span>
                                        </div>
                                        <div className='education-program-estimated-time text'>
                                            <span>{formatHourMinute(videoDuration)}</span>
                                        </div>
                                    </div>
                                    <div className="education-program-info">
                                        <div className='education-program-type-title title'>
                                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="partition" width="14px" height="14px" fill="currentColor" aria-hidden="true"><defs><style></style></defs>
                                                <path d="M640.6 429.8h257.1c7.9 0 14.3-6.4 14.3-14.3V158.3c0-7.9-6.4-14.3-14.3-14.3H640.6c-7.9 0-14.3 6.4-14.3 14.3v92.9H490.6c-3.9 0-7.1 3.2-7.1 7.1v221.5h-85.7v-96.5c0-7.9-6.4-14.3-14.3-14.3H126.3c-7.9 0-14.3 6.4-14.3 14.3v257.2c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3V544h85.7v221.5c0 3.9 3.2 7.1 7.1 7.1h135.7v92.9c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3v-257c0-7.9-6.4-14.3-14.3-14.3h-257c-7.9 0-14.3 6.4-14.3 14.3v100h-78.6v-393h78.6v100c0 7.9 6.4 14.3 14.3 14.3zm53.5-217.9h150V362h-150V211.9zM329.9 587h-150V437h150v150zm364.2 75.1h150v150.1h-150V662.1z"></path>
                                            </svg>
                                            <span>Eğitim Türü</span>
                                        </div>
                                        <div className='education-program-type text'>
                                            <span>{lesson?.lessonSubTypeName}</span>
                                        </div>
                                    </div>

                                    <div className="education-program-info">
                                        <div className='education-program-categories-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f6c6c" viewBox="0 0 256 256" transform="rotate(90)">
                                                <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
                                            </svg>
                                            <span>Kategori</span>
                                        </div>
                                        <div className='education-program-categories text'>
                                            <span>{lesson?.lessonCategoryName}</span>
                                        </div>
                                    </div>
                                    <div className="education-program-info">
                                        <div className='education-program-content-count-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
                                            </svg>
                                            <span>İçerik</span>
                                        </div>
                                        <div className='education-program-content-count text'>
                                            <span>{lessons?.count}</span>
                                        </div>

                                        <div >
                                            {countByLessonSubTypeName && Object.entries(countByLessonSubTypeName).map(([typeName, count]) => (
                                                <div key={typeName} className='education-program-info'>
                                                    <div className='education-program-content-name text'>
                                                        <span>{typeName}</span>
                                                    </div>
                                                    <div className='education-program-content-count text'>
                                                        <span>{count}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="education-program-info">
                                        <div className='education-program-production-company-title title'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path>
                                            </svg>
                                            <span>Üretici Firma</span>
                                        </div>
                                        <div className='education-program-production-company text'>
                                            <span>{lesson?.productionCompanyName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>

                    </Tabs>
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
                                            <span>{accountViewLessonCount}</span>
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

                                    <div className='ed-drawer-sub-content' style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>
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

                                    <div className='ed-drawer-sub-content' style={{ display: lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }}>
                                        <div className='ed-drawer-text-area'>
                                            <div className='ed-drawer-course-status-info not-start' style={isDoneSession === undefined || isDoneSession === 0 ? { display: 'block' } : { display: 'none' }}>
                                                <FaCircle className='lesson-card-icon-first' />
                                                <span >
                                                    Başlamadın</span>
                                            </div>
                                            <div className='ed-drawer-course-status-info' style={isDoneSession === 0 || isDoneSession === sessions?.count ? { display: 'none' } : { display: 'flex' }}>
                                                <span >
                                                    <div className='unit-icon unit-ongoing'></div>
                                                    Devam Ediyor</span>
                                            </div>


                                            <div className='ed-drawer-course-status-info' style={isDoneSession === sessions?.count ? { display: 'flex' } : { display: 'none' }}>
                                                <span className="unit-end" >
                                                    <div className="unit-icon" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3DCB79" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
                                                    </div>
                                                    Tebrikler, tamamladın!</span>

                                                <div className='ed-drawer-course-status-score ' style={accountLesson?.statusPercent === 0 ? { display: 'none' } : { display: 'block' }}>
                                                    <span className='unit-end-text'></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                            </div >
                            <div className='education-drawer-content-bottom' style={{ display: lesson?.lessonSubTypeName.toLocaleUpperCase() === ASYNCHRONOUS_LESSON || lesson?.lessonSubTypeName === PDF_LESSON ? "grid" : "none" }} >
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
                            <div className='e-education-drawer-content-bottom' style={{ display: lesson?.lessonSubTypeName.toUpperCase() === PDF_LESSON ? "block" : "none" }}>

                                <div className="education-drawer-info">
                                    <div className='education-drawer-lesson-description-title title'>
                                        <span>Hedefleri</span>
                                        <p>Bu eğitim ile</p>
                                        <ul>
                                            <li>Tanıştığınız kişilerin kullandığı kalıpları daha kolay anlayıp, yorumlayıp daha doğru ve etkili yanıtlayacak,</li>
                                            <li>Bu eğitim ile İngilizce’de artık ne konuştuğunuzdan emin olarak yeni insanlarla tanışmaya başlayacak,</li>
                                            <li>Konuşma anında karar verme ve uygulamayı kolaylaştıracak araçları ve yöntemleri tanıyacak,</li>
                                        </ul>
                                    </div>
                                    <div className='education-drawer-lesson-description-title title'>
                                        <span>Konu Başlıkları</span>
                                        <ul>
                                            <li>Tanıştığınız kişilerin kullandığı kalıpları daha kolay anlayıp, yorumlayıp daha doğru ve etkili yanıtlayacak,</li>
                                            <li>Bu eğitim ile İngilizce’de artık ne konuştuğunuzdan emin olarak yeni insanlarla tanışmaya başlayacak,</li>
                                            <li>Konuşma anında karar verme ve uygulamayı kolaylaştıracak araçları ve yöntemleri tanıyacak,</li>
                                        </ul>
                                    </div>
                                    <div className='education-drawer-lesson-description-title title'>
                                        <span>Hedef Kitle</span>
                                        <br />
                                        <p>İngilizce dilinde tanışmanın temelini kavramak, formal ve informal tanışma kalıpları ve amaçlarına göre en sık kullanılan tanışma diyalog şablonları yardımı ile bu alanda kendilerini geliştirme, bilgilerini güncelleme ve yorum yapabilme becerilerini geliştirmek isteyen herkes.</p>
                                    </div>
                                    <div className='education-drawer-lesson-description-title title'>
                                        <span>İlgi Alanları</span>
                                        <br />
                                        <div className="tag-list">
                                            <span className='tag-link'  >İngilizce</span>
                                            <span className='tag-link'  >Tanışma</span>
                                            <span className='tag-link'  >English</span>
                                            <span className='tag-link'  >Learning steps</span>
                                            <span className='tag-link'  >smes </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ display: sessions && sessions.count > 0 && lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }}>
                                {
                                    <SessionsPage style={{ display: sessions && sessions.count > 0 && lesson?.lessonSubTypeName.toUpperCase() === ASYNCHRONOUS_LESSON ? "block" : "none" }} onDataFromSessionPage={handleDataFromSessionPage} sessions={sessions} homeworks={homeworks} lessonId={selectedLessonId}></SessionsPage>
                                }
                            </div>
                        </>
                    }
                />
            </div >
        </div >
    )
}