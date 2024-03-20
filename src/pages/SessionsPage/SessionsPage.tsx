import { Collapse, Drawer } from 'antd';
import "./SessionsPage.css";
import { CheckCircleFilled } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { VideoCameraOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import GetListSessionResponse from '../../models/responses/session/getListSessionResponse';
import GetListHomeworkResponse from '../../models/responses/homework/getListHomeworkResponse';
import accountSessionService from '../../services/accountSessionService';
import authService from '../../services/authService';
import GetListAccountSessionResponse from '../../models/responses/accountSession/getListAccountSessionResponse';
import { Paginate } from '../../models/paginate';
import sessionService from '../../services/sessionService';
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';
import accountService from '../../services/accountService';
import GetAccountResponse from '../../models/responses/account/getAccountResponse';
import UpdateAccountSessionRequest from '../../models/requests/accountSession/updateAccountSessionRequest';

export default function SessionsPage(props: any) {

    const user = authService.getUserInfo();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [accountSessions, setAccountSessions] = useState<Paginate<GetListAccountSessionResponse>>();
    const [selectedInstructor, setSelectedInstructor] = useState<GetAccountResponse>();
    const [sessionInstructorsMap, setSessionInstructorsMap] = useState<Map<string, GetListAccountResponse[]>>(new Map());
    const [selectedSessionId, setSelectedSessionId] = useState<any>(null);



    const handleTeacherClick = (instructorId: any) => {
        getInstructorDetail(instructorId);
        setDrawerVisible(true);
    };

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
    };


    const getInstructorDetail = (instructorId: any) => {
        accountService.getById(instructorId).then((result: any) => {
            setSelectedInstructor(result.data)
        })
    }

    const getAccountSessionByAccountAndSessionId = async (accountId: any, sessionId: any) => {
        accountSessionService.getByAccountAndSessionId(accountId, sessionId).then((result: any) => {
            handleUpdateAccountSession(result.data.id)
        })
    }

    const handleUpdateAccountSession = async (accountSessionId: any) => {
        const updateAccountSession: UpdateAccountSessionRequest = {
            id: accountSessionId,
            sessionId: selectedSessionId,
            accountId: user.id,
            status: true
        }
        await accountSessionService.update(updateAccountSession)
        getSessionJoinInfo();
    }



    useEffect(() => {
        if (selectedSessionId) {
            getAccountSessionByAccountAndSessionId(user.id, selectedSessionId)
        }
    }, [selectedSessionId])




    useEffect(() => {
        getSessionJoinInfo();
    }, [props?.lessonId])

    const getSessionJoinInfo = () => {
        if (props?.lessonId) {
            sessionService.getByAccountAndLessonId(user.id, props?.lessonId).then((result: any) => {

                const trueStatusCount = result.data?.count;
                props.onDataFromSessionPage(trueStatusCount);
            })
            accountSessionService.getByAccountId(user.id).then((result: any) => {
                setAccountSessions(result.data);
            })
        }
    }

    const formatDate = (date: Date): string => {
        const parsedDate = date instanceof Date ? date : new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };

        const formattedDate = new Intl.DateTimeFormat('tr-TR', options).format(parsedDate);
        return formattedDate;
    };



    useEffect(() => {
        if (props.sessions?.items) {
            props.sessions.items.forEach((session: GetListSessionResponse) => {
                getSessionInstructor(String(session.id)).then(instructors => {
                    setSessionInstructorsMap(prevMap => new Map(prevMap.set(String(session.id), instructors)));
                });
            });
        }
    }, [props.sessions]);

    const getSessionInstructor = async (sessionId: string): Promise<GetListAccountResponse[]> => {
        const result = await accountService.getInstructorBySessionId(sessionId);
        return result.data.items || [];
    };

    const items = props.sessions?.items?.map((session: GetListSessionResponse, index: number) => {
        const startDateTime = new Date(session.startDate).toISOString();
        const endDateTime = new Date(session.endDate).toISOString();
        const currentDateTime = new Date().toISOString();

        const sessionId = session.id;
        const matchingSession = accountSessions?.items.find(session => session.sessionId === sessionId);
        const sessionStatus = matchingSession?.status;

        const instructors = sessionInstructorsMap.get(String(sessionId)) || [];

        return {
            key: String(index),
            label: (
                <>
                    <div className="session-collapse-title">
                        <span>{index + 1}.Oturum</span>
                        <span className="green-text" style={{ display: sessionStatus ? "flex" : "none" }}><CheckCircleFilled className="green-img" />Katıldın</span>
                        <span className="red-text" style={{ display: sessionStatus ? "none" : "flex" }}>Katılmadın</span>
                    </div>
                </>
            ),
            children: (
                <>
                    <div className="session-collapse-info">
                        <div className="start-date date-info">
                            <span>Başlangıç</span>
                            <p>{formatDate(session.startDate)}</p>
                        </div>
                        <div className="end-date date-info">
                            <span>Bitiş</span>
                            <p>{formatDate(session.endDate)}</p>
                        </div>
                        <hr className="session-divider" />
                        <div className="session-instructor-info">
                            <div className="session-instructor-title">
                                <UserOutlined className='user-icon' />
                                <span>Eğitmen</span>
                            </div>
                            <span className='session-teacher-list'>
                                {instructors.map((instructor: any) => (
                                    <span key={String(instructor.id)} onClick={() => handleTeacherClick(instructor.id)}> {instructor.firstName} {instructor.lastName}</span>
                                ))}
                            </span>
                        </div>

                        <br />
                        <VideoCameraOutlined className='video-icon' /> Oturum Kayıtları
                        <br />

                        <span className='session-video'>Oturumlara ilişkin kayıtlar, canlı oturumlar tamamlandıktan sonra izlenebilir.</span>
                        <br />
                        <br />

                        <div style={{ display: startDateTime < currentDateTime && endDateTime > currentDateTime ? "block" : "none" }}>
                            <Button className='session-join' onClick={() => setSelectedSessionId(session.id)}>KATIL</Button>
                        </div>
                        <div style={{ display: endDateTime > currentDateTime ? "none" : "block" }}>
                            <span className='video-number'>
                                {session.recordPath}
                            </span>
                            <button className='session-video-recording'>
                                <span>KAYDI AÇ</span>
                            </button>
                        </div>
                    </div>
                </>
            )
        };
    }) || [];


    return (
        <div className="unit-detail-session-row LXP-Collapse">
            <div className="session-title">
                Oturumlar
            </div>
            <div className="sessions-title">
                <Collapse className="session-collapse" defaultActiveKey={['1']} ghost items={items} />
            </div>
            <Drawer
                placement="right"
                closable={false}
                onClose={handleCloseDrawer}
                visible={drawerVisible}>

                <div className="col-left">

                    <div className="thumb">
                        <div className="avatar">
                            <img src="https://lms.tobeto.com/tobeto/eep/common_show_picture_cached.aspx?pQS=tWNRDTdmEPeaMJOT7f9rSDlGgl1w7KquIV5xfERtbG3W%2b6csThdF%2bq0W87ySbabuotkO1AP1JT%2fFJ1yrrQer%2bz9Rv0vHES0NXb2LMAd3jcsb1PJKHNmUvPAb%2bxcy7bR9" alt="">
                            </img>
                        </div>
                    </div>
                    <div className='info text-xs-center'>
                        <div className="instructor-fullName text-xs-center">
                            <h4>{selectedInstructor?.firstName} {selectedInstructor?.lastName}</h4>
                        </div>

                    </div>
                </div>
                <div className="col-right">
                    <div className="search-page-result text-xs-center instructor">
                        <div className="no-content">
                            <div className="no-content-icon">
                                <img src="https://lms.tobeto.com/tobeto/eep/Styles/assets/css/img/icon/learning-experience-platform/IconNoContent.svg" alt="no-content" />

                            </div>
                            <h5>Eğitmen için girilmiş herhangi bir künye bilgisi bulunmamaktadır.</h5>
                        </div>

                    </div>
                </div>
            </Drawer>
            <Accordion>
                <Accordion.Item className="homework-accordion-item" eventKey="0">
                    <Accordion.Header className='accordion-works'>Ödevler</Accordion.Header>
                    <Accordion.Body>
                        {props.homeworks && props.homeworks.items.length > 0 ? (
                            props.homeworks.items.map((homework: GetListHomeworkResponse) => (
                                <div className="work-ss " key={String(homework.id)}>
                                    <div className="row-middle-xs">
                                        <div className="work1 col-lg-4 col-md-4 col-sm-3 col-xs-12">
                                            <div className='work-name'>
                                                <p>{homework.name}</p>
                                            </div>
                                        </div>
                                        <div className="work2 col-lg-2 col-md-2 col-sm-3 col-xs-12 text-lg-center text-md-center text-sm-center text-xs-center">
                                            <div className="work-score">
                                                <span className='no-time'>

                                                </span>
                                            </div>
                                        </div>
                                        <div className='work3 col-lg-3 col-md-3 col-sm-3 col-xs-12 text-lg-center text-md-center text-sm-center text-xs-center'>
                                            <div className="work-status"> Gönderildi</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Ödev atanmamıştır.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}