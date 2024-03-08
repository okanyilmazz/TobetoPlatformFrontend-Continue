import { useEffect, useState } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import "./AssesmentsPage.css";
import examService from '../../services/examService';
import { Paginate } from '../../models/paginate';
import GetListExamResponse from '../../models/responses/exam/getListExamResponse';
import { useDispatch, useSelector } from 'react-redux';
import GetListExamResultResponse from '../../models/responses/examResult/getListExamResultResponse';
import examResultService from '../../services/examResultService';
import { userActions } from '../../store/user/userSlice';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Modals from '../../components/Modal/Modals';
import { Link, useNavigate } from 'react-router-dom';
import questionService from '../../services/questionService';
import GetListQuestionResponse from '../../models/responses/question/getListQuestionResponse';
import AddExamResultRequest from '../../models/requests/examResult/addExamResultRequest';
import AddAccountAnswerRequest from '../../models/requests/accountAnswer/addAccountAnswerRequest';
import accountAnswerService from '../../services/accountAnswerService';


export default function AssesmentsPage() {

    const [exams, setExams] = useState<Paginate<GetListExamResponse>>()
    const [examResults, setExamResults] = useState<Paginate<GetListExamResultResponse>>();
    const [showExamModal, setShowExamModal] = useState<boolean>(false);
    const [selectedExamId, setSelectedExamId] = useState<any>();
    const [examQuestions, setExamQuestions] = useState<Paginate<GetListQuestionResponse>>();
    const [allExamQuestions, setAllExamQuestions] = useState<Paginate<GetListQuestionResponse>>();
    const [pageIndexState, setPageIndexState] = useState<any>(0)
    const [selectedOptionId, setSelectedOptionId] = useState<any>()
    const userState = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subjectStates, setSubjectStates] = useState<{ [key: string]: boolean }>({});

    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 dakika (saniye cinsinden)
    const [startTimer, setStartTimer] = useState(false);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;



    const handleCheckActive = (selectedOption: any, questionId: any) => {
        setSelectedOptionId(selectedOption);
        if (localStorage.getItem(questionId)) {
            localStorage.setItem(String(questionId), selectedOption)
        } else {
            localStorage.setItem(String(questionId), selectedOption)
        }
    };


    useEffect(() => {
        if (!userState.user) {
            dispatch(userActions.getUserInfo());
            return;
        }

        examResultService.getByAccountId(userState.user.id).then(result => {
            setExamResults(result.data);
        });

        examService.getByAccountId(userState.user.id, 0, 5).then(result => {
            setExams(result.data);
        });

    }, [userState])


    const handleShow = (subjectName: string) => {
        setSubjectStates((prevStates) => ({
            ...prevStates,
            [subjectName]: true,
        }));
    };


    const handleExamModalShow = (selectedExamId: any) => {
        setSelectedExamId(selectedExamId)
        setShowExamModal(true);

        questionService.getByExamId(selectedExamId, 0, 1).then((result: any) => {
            setExamQuestions(result.data);
        })
        questionService.getByExamId(selectedExamId, 0, 100).then((result: any) => {
            setAllExamQuestions(result.data);
        })

        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prev => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    };

    const handleAddExamAnswer = async () => {
        let correctOptionCount: number = 0;
        let inCorrectOptionCount: number = 0;
        let emptyOptionCount: number = 0;
        if (allExamQuestions && allExamQuestions.items) {
            allExamQuestions.items.forEach(item => {
                const selectedAnswer = localStorage.getItem(String(item.id));
                switch (true) {
                    case selectedAnswer === null:
                        emptyOptionCount++;
                        break;
                    case item.correctOption === selectedAnswer:
                        correctOptionCount++;
                        break;
                    case item.correctOption !== selectedAnswer:
                        inCorrectOptionCount++;
                        break;
                    default:
                        break;
                }
                localStorage.removeItem(String(item.id));

                const addAccountAnswer: AddAccountAnswerRequest = {
                    accountId: userState.user.id,
                    examId: selectedExamId,
                    givenAnswer: selectedAnswer!,
                    questionId: item.id
                }
                accountAnswerService.add(addAccountAnswer);
            });

            const successPercentage = (correctOptionCount / allExamQuestions.items.length) * 100;
            const addExamResults: AddExamResultRequest = {
                accountId: userState.user.id,
                correctOptionCount: correctOptionCount,
                emptyOptionCount: emptyOptionCount,
                inCorrectOptionCount: inCorrectOptionCount,
                examId: selectedExamId,
                result: successPercentage
            };
            await examResultService.add(addExamResults);
        }
        navigate("/degerlendirmeler")
        setShowExamModal(false);
        examService.getByAccountId(userState.user.id, 0, 5).then(result => {
            setExams(result.data);
        });

        examResultService.getByAccountId(userState.user.id).then(result => {
            setExamResults(result.data);
        });
    }

    const handleClose = (subjectName: string) => {
        setSubjectStates((prevStates) => ({
            ...prevStates,
            [subjectName]: false,
        }));

        setShowExamModal(false); // Modalı kapat
    };
    function changePageIndex(pageIndex: any) {
        setPageIndexState(pageIndex);
    }


    useEffect(() => {
        if (pageIndexState !== undefined || pageIndexState !== 0) {
            questionService.getByExamId(selectedExamId, pageIndexState, 1).then(result => {
                setExamQuestions(result.data);
            });
        }
    }, [pageIndexState]);

    return (
        <div className="container bg-front-white reviews-page">
            <div className="row bg-front-white">
                <div className="assesment-head container">
                    <h1 className='assesment-title'><span className='assesment-span'>Yetkin</span>liklerini ücretsiz ölç, <span className='assesment-span'>bilgi</span>lerini test et.</h1>
                </div>
                <div className='assesment-img'>
                    <img src='https://tobeto.com/_next/static/media/dot-purple.e0e5c9d8.svg' />
                </div>
                <div className='assesment-rapor container'>

                    <h1 >Tobeto İşte Başarı Modeli</h1>
                    <p>80 soru ile yetkinliklerini <b>ölç,</b> önerilen eğitimleri <b>tamamla,</b> rozetini <b>kazan.</b></p>

                    <button onClick={() => navigate("profilim/degerlendirmeler/rapor/tobeto-iste-basari-yetkinlikleri/1")} className="assesment-btn">Raporu Görüntüle</button>

                </div>

                <div className="col-md-6">
                    <div className="reviews-cart-1">
                        <span>Yazılımda Başarı Testi</span>
                        <p>Çoktan seçmeli sorular ile teknik bilgini <b>test et.</b> </p>
                        <label className="text-white">&gt;&gt;&gt;</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="reviews-cart-2">
                        {exams?.items.map((exam, index) => {
                            const filteredResults = examResults?.items.filter(examResult =>
                                examResult.examId === exam.id
                            );
                            return (
                                <div className={filteredResults && filteredResults?.length > 0 ? 'cart-slim  has-results' : 'cart-slim'} key={index}>
                                    {
                                        filteredResults && filteredResults?.length > 0 ?
                                            (<div className='exam-circle-bar'>

                                                <CircularProgressbar
                                                    value={filteredResults[0].result}
                                                    text={String(filteredResults[0].result)}
                                                    styles={buildStyles({ textColor: '#fff', pathColor: '#9d3dfd' })}
                                                />
                                            </div>) :
                                            null
                                    }

                                    <span>
                                        {exam.name}
                                    </span>

                                    <div className='cart-slim-button'  >
                                        <Button onClick={() => handleShow(exam.name)} style={{ display: filteredResults && filteredResults.length > 0 ? "block" : "none" }}>
                                            Raporu Görüntüle
                                        </Button>

                                        <Button onClick={() => handleExamModalShow(exam.id)} style={{ display: filteredResults && filteredResults.length > 0 ? "none" : "block" }}>
                                            Başla
                                        </Button>
                                    </div>
                                    <Modals
                                        className="assesments-modal"
                                        header={true}
                                        show={subjectStates[exam.name] || false}
                                        onHide={() => handleClose(exam.name)}
                                        title={exam.name}

                                        body={
                                            <>
                                                {filteredResults && filteredResults.length > 0 ? (
                                                    <div className="exam-result-box">
                                                        <div className="correct">
                                                            <span>{filteredResults[0].correctOptionCount}</span> <br />
                                                            Doğru
                                                        </div>
                                                        <div className="inCorrect">
                                                            <span>{filteredResults[0].inCorrectOptionCount}</span> <br />
                                                            Yanlış
                                                        </div>
                                                        <div className="empty">
                                                            <span> {filteredResults[0].emptyOptionCount}</span> <br /> Boş
                                                        </div>
                                                        <div className="result">
                                                            <span> {(filteredResults[0].result)} </span> <br /> puan
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="exam-details-box">
                                                        <p>
                                                            Bu sınav {exam.questionCount} sorudan oluşmakta olup sınav süresi {exam.duration} dakikadır. Sınavın türü {exam.questionTypeNames.join(', ')} şeklinde olup sınavı
                                                            yarıda bıraktığınız taktirde çözdüğünüz kısım kadarıyla değerlendirileceksiniz.
                                                        </p>
                                                        <br />
                                                        <span> Sınav Süresi: {exam.duration} dakika</span> <br />
                                                        <span> Soru Sayısı: {exam.questionCount}</span> <br />
                                                        <span> Soru Tipi: {exam.questionTypeNames.join(', ')}</span> <br />
                                                    </div>
                                                )}
                                            </>
                                        }
                                        footerShow={true}
                                        footer={
                                            <div className='footer-modal-button text-center  '  >
                                                <Button className='cart-slim-close-button' variant="modal-button" onClick={() => handleClose(exam.name)}>
                                                    Kapat
                                                </Button>
                                            </div>
                                        }
                                    />
                                    <Modals
                                        className="assesments-exam-modal"
                                        header={false}
                                        show={showExamModal}
                                        onHide={() => setShowExamModal(false)}
                                        title=""
                                        body={
                                            <>
                                                <div className="exam-modal-header">
                                                    <span>{(examQuestions && examQuestions.index + 1)} / {examQuestions?.pages}</span>
                                                    <span className="countdown-timer">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                                </div>

                                                {
                                                    examQuestions?.items.map((question, index) => (
                                                        <div className="exam-modal-description" key={String(question.id)}>
                                                            <p>{question.description}</p>
                                                            <div className={`exam-modal-question ${question.optionA === selectedOptionId ? 'answer-active' : ''}`} onClick={() => handleCheckActive(question.optionA, question.id)}>
                                                                <span>{question.optionA}</span>
                                                            </div>
                                                            <div className={`exam-modal-question ${question.optionB === selectedOptionId ? 'answer-active' : ''}`} onClick={() => handleCheckActive(question.optionB, question.id)}>
                                                                <span>{question.optionB}</span>
                                                            </div>
                                                            <div className={`exam-modal-question ${question.optionC === selectedOptionId ? 'answer-active' : ''}`} onClick={() => handleCheckActive(question.optionC, question.id)}>
                                                                <span>{question.optionC}</span>
                                                            </div>
                                                            <div className={`exam-modal-question ${question.optionD === selectedOptionId ? 'answer-active' : ''}`} onClick={() => handleCheckActive(question.optionD, question.id)}>
                                                                <span>{question.optionD}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        }
                                        footerShow={true}
                                        footer={
                                            <div className="assesment-paginate">
                                                <Pagination>
                                                    <Pagination.Prev className="pagination-prev-next" disabled={pageIndexState === 0} onClick={() => changePageIndex(pageIndexState - 1)}>
                                                        <span aria-hidden="true"> &lt; </span>
                                                    </Pagination.Prev>
                                                    <Pagination.Next className="pagination-prev-next" style={{ display: pageIndexState + 1 === examQuestions?.pages ? "none" : "block" }} onClick={() => changePageIndex(pageIndexState + 1)}>
                                                        <span aria-hidden="true"> &gt; </span>
                                                    </Pagination.Next>
                                                    <Button onClick={() => handleAddExamAnswer()} className='paginate-button' style={{ display: pageIndexState + 1 === examQuestions?.pages ? "block" : "none" }}>Sınavı Bitir</Button>
                                                </Pagination>
                                            </div>
                                        }
                                    />

                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className='assesment-line '>
                </div>
                <div className='assesment-text '>
                    <h1 className='assesment-title'><span className='assesment-span'>Aboneliğe özel</span> değerlendirme araçları için</h1>

                </div>
                <div className='container mt-5'>
                    <div className='assesment-content row'>
                        <div className='assesment-col1 col-md-6'>
                            <h1>Kazanım Odaklı Testler</h1><br />
                            <p>Dijital gelişim kategorisindeki eğitimlere <br />
                                başlamadan öncekonuyla ilgili bilgin <br />
                                ölçülür ve seviyene göre yönlendirilirsin.</p>
                        </div>
                        <div className='assesment-col2 col-md-6'>
                            <h1>Huawei Talent Interview <br />
                                Teknik Bilgi Sınavı*</h1>
                            <p><b><i>Sertifika alabilmen için,</i> </b>eğitim <br />
                                yolculuğunun sonunda teknik <br />
                                yetkinliklerin ve kod bilgin ölçülür. <br />

                                <br />
                                4400+ soru | 30+ programlama dili <br />
                                4 zorluk seviyesi
                                <br /></p>
                            <span> *Türkiye Ar-Ge Merkezi tarafından tasarlanmıştır.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )


}