import { Button, Image, Tab, Tabs } from 'react-bootstrap'
import './PlatformPage.css'
import ApplicationCard from '../../components/ApplicationCard/ApplicationCard'
import EducationCard from '../../components/EducationCard/EducationCard'
import SurveyCard from '../../components/SurveyCard/SurveyCard'
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard'
import { useEffect, useState } from 'react'
import { Paginate } from '../../models/paginate'
import { GetListEducationProgramResponse } from '../../models/responses/educationProgram/getListEducationProgramResponse'
import GetListAnnouncementProjectResponse from '../../models/responses/announcementProject/getListAnnouncementProjectResponse'
import educationProgramService from '../../services/educationProgramService'
import announcementProjectService from '../../services/announcementProjectService'
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton'
import { useSelector } from 'react-redux'
import GetListExamResponse from '../../models/responses/exam/getListExamResponse'
import examService from '../../services/examService'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

export default function PlatformPage() {
    const [educationPrograms, setEducationPrograms] = useState<Paginate<GetListEducationProgramResponse>>();
    const [announcementProjects, setAnnouncementProjects] = useState<Paginate<GetListAnnouncementProjectResponse>>();
    const [exams, setExams] = useState<Paginate<GetListExamResponse>>();

    const userState = useSelector((state: any) => state.user);
    const user = authService.getUserInfo();

    const navigate = useNavigate();


    useEffect(() => {

        examService.getByAccountId(user.id, 0, 2).then(result => {
            setExams(result.data);
        });

        educationProgramService.getByAccountId(user.id, 0, 100).then((result: any) => {
            setEducationPrograms(result.data);
        });
        announcementProjectService.getAll(0, 100).then(result => {
            setAnnouncementProjects(result.data);
        });


    }, [user.id]);

    function formatCustomDate(inputDate: Date) {
        const months = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];

        const date = new Date(inputDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${day} ${months[monthIndex]} ${year} ${hours}:${minutes}`;
        return formattedDate;
    }

    return (
        <div className='platform bg-front-white '>
            <div className="platform-content bg-front-white">
                <section>
                    <div className='container'>
                        <div className='content-title'>
                            <span> <span className='tobeto-text'>TOBETO'</span>ya hoş geldin</span>
                            <span className='user-name'>{userState.user?.firstName}</span>
                        </div>
                        <div className='tobeto-slogan'>
                            <span>Yeni nesil öğrenme deneyimi ile Tobeto kariyer yolculuğunda senin yanında!</span>
                        </div>
                    </div>
                </section>

                <section className='middle-section container'>
                    <div className='row'>
                        <div id='ik-logo'>
                            <Image src='https://tobeto.com/_next/static/media/ik-logo-dark.7938c0de.svg'></Image>
                        </div>

                        <div className="ik-slogan">
                            <span>Ücretsiz eğitimlerle, geleceğin mesleklerinde sen de yerini al.</span>
                            <span>Aradığın
                                <span className='quote' id='left-quote'>”</span>iş<span className='quote' id='right-quote'>”</span>
                                Burada!</span>
                        </div>

                        <div className='platform-tab-menu'>
                            <Tabs
                                defaultActiveKey="applications"
                                id="uncontrolled-tab-example"
                                className="mb-3 tab-menu"
                            >
                                <Tab eventKey="applications" title="Başvurularım">
                                    <div className='tab-application-content'>
                                        <ApplicationCard
                                            projectName={"İstanbul Kodluyor"}
                                            applicationStage1={"İstanbul Kodluyor Başvuru Formu onaylandı."}
                                            applicationStage2={"İstanbul Kodluyor Belge Yükleme Formu onaylandı."}
                                        />
                                    </div>
                                </Tab>
                                <Tab eventKey="educations" title="Eğitimlerim">
                                    <div className='tab-education-content'>
                                        {
                                            educationPrograms?.items.map((educationProgram) => (

                                                <EducationCard
                                                    title={educationProgram.name}
                                                    date={formatCustomDate(educationProgram.startDate)}
                                                    id={educationProgram.id}
                                                    thumbnailPath={educationProgram.thumbnailPath}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div onClick={() => navigate("/egitimlerim")}  >

                                        <ShowMoreButton />
                                    </div>
                                </Tab>
                                <Tab eventKey="announcements" title="Duyuru ve Haberlerim">
                                    <div className='tab-announcement-content'>
                                        {
                                            announcementProjects?.items.slice(0, 3).map((announcementProject) => (
                                                <AnnouncementCard
                                                    announcementTypeName={announcementProject.announcement.announcementTypeName}
                                                    projectName={announcementProject.project.name}
                                                    announcementName={announcementProject.announcement.title}
                                                    announcementDate={formatCustomDate(announcementProject.announcement.announcementDate)}
                                                    announcementDescription={
                                                        announcementProject.announcement.description.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
                                                            <p key={index}>{paragraph}</p>
                                                        ))
                                                    }
                                                />
                                            ))
                                        }
                                    </div>
                                    <div onClick={() => navigate("/duyurular")}  >

                                        <ShowMoreButton />
                                    </div>
                                </Tab>
                                <Tab eventKey="surveys" title="Anketlerim">
                                    <div className='tab-application-content'>
                                        <SurveyCard />
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </section>

                <section className='bottom-section container'>
                    <div className='bottom-section-title'>
                        <span>Sınavlarım</span>
                    </div>
                    <div className='my-exams'>
                        {
                            exams?.items.map((exam) => (

                                <div className='exam-details'>
                                    <div className='exam-details-left'>
                                        <span className='exam-title'>{exam.name} Değerlendirme Sınavı</span>
                                        <span className='exam-name'>{exam.name}</span>
                                        <div className='exam-time'>
                                            <span >{exam.duration} Dakika</span>
                                        </div>
                                    </div>
                                    <div className='exam-details-right'>
                                        <span className='status'></span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </section>

                <section className='section-card container'>
                    <div className='create-profile'>
                        <span>Profilini oluştur</span>
                        <Button onClick={() => navigate("/profilim/profilimi-duzenle/kisisel-bilgilerim")}   >Başla</Button>
                    </div>
                    <div className='self-assessment'>
                        <span>Kendini değerlendir</span>
                        <Button onClick={() => navigate("/degerlendirmeler")}>Başla</Button>
                    </div>
                    <div className='start-learning'>
                        <span>Öğrenmeye başla</span>
                        <Button  >Başla</Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
