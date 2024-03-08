import { useState } from 'react'
import { Button, Accordion, Container, Row, Col } from 'react-bootstrap';
import './Homepage.css'
import TrainingCard from '../../components/TrainingCard/TrainingCard'
import IstanbulCard from '../../components/IstanbulCard/IstanbulCard';
import { Card, Image } from 'semantic-ui-react';
import GradientLine from '../../components/GradientLine/GradientLine';
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
    const navigate = useNavigate();
    const [subjectButtonStyle, setSubjectButtonStyle] = useState({
        color: 'black',
        backgroundColor: '#fff'
    });

    const [occupationButtonStyle, setOccupationButtonStyle] = useState({
        color: '#fff',
        backgroundColor: 'black'
    });
    const [buttonClicked, setButtonClicked] = useState(null);

    const handleClick = () => {
        navigate('/kayit-ol');
    };

    const handleButtonClick = (buttonName: any) => {
        setButtonClicked(buttonName);

        if (buttonName === "occupation") {
            setOccupationButtonStyle(
                {
                    color: 'black',
                    backgroundColor: 'white'
                })

            setSubjectButtonStyle({
                color: 'white',
                backgroundColor: '#181717'
            })
        }
        else {
            setOccupationButtonStyle(
                {
                    color: 'white',
                    backgroundColor: '#181717'
                })

            setSubjectButtonStyle({
                color: 'black',
                backgroundColor: 'white'
            })
        }
    };
    return (
        <div className='homepage'>
            <div className='card-group col-md-6 container'>
                <Card className='col-md-6 col-sm-12 tobeto-card'>
                    <Card.Content>
                        <div className='content-left'>
                            <span>Hayalindeki teknoloji kariyerini başlat!</span>
                            <span id="text-italic"> İstediğin
                                <div className='word-container'>
                                    <span className='word1'>yoldan</span>
                                    <span className='word2'>hızda</span>
                                </div>
                            </span>
                            <Button className='mt-4 tobeto-card-btn' onClick={handleClick} >Ücretsiz Üye Ol</Button>
                        </div>
                        <div className='content-right'>
                            <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBANNER-12.4b21c70e.png&w=640&q=75" fluid size='small' />
                        </div>
                    </Card.Content>
                </Card>

                <div className='col-md-6 col-sm-12'>
                    <IstanbulCard title={
                        <span>Aradığın
                            <span className='quote' id='left-quote'>"</span>iş<span className='quote' id='right-quote'>"</span>
                            Burada!</span>}
                        onClick={handleClick} />
                </div>
            </div>
            <GradientLine />
            <div className="container">
                <div className="container tab-button ">
                    <div className="row">
                        <div className="col-md-5">
                            <p className='title text-white'>Hangi Konuda <br /> Kendini<br /> Geliştirmek İstersin?</p>

                            <Button className='button-container'
                                onClick={() => handleButtonClick('subject')}
                                style={{ ...subjectButtonStyle }}>
                                <h1>Teknik ve Profesyonel<br />Eğitimler</h1>
                                <p>Kapsamlı beceri setlerinden, gelişmek istediğin konuyu seç, kariyerinde bir adım öne geç.</p>
                            </Button>

                            <Button onClick={() => handleButtonClick('occupation')} className='button-container2'
                                style={{ ...occupationButtonStyle }}>
                                <h1>Yeni bir meslek</h1>
                                <p>
                                    İhtiyaç duyduğun kapsamlı beceri setlerinden oluşan eğitim yolculuğunu seç, yazılım veya
                                    profesyonel iş alanlarında tercih ettiğin yeni mesleğine doğru ilk adımını at.
                                </p>
                            </Button>
                        </div>
                        <div className="col-md-6 offset-1">
                            <TrainingCard check={buttonClicked} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className="ca">
                    <div className="d-flex">
                        <div>
                            <Image
                                src="https://tobeto.s3.cloud.ngn.com.tr/calogo_d676092a98.png?updated_at=2022-12-28T12:36:58.291Z"
                                alt="Codecademy Logo"
                            />
                        </div>
                        <div>
                            <h1>
                                Dünyanın en büyük kodlama eğitimi
                                platformu içerikleri şimdi Tobeto deneyimi
                                ile!
                            </h1>
                        </div>
                    </div>
                    <p>
                        Codecademy’nin tüm kaynaklarına Tobeto aboneliğinin sağlayacağı
                        avantajlar, alanında uzman eğitmenlerle canlı dersler ve mentörlerin desteği
                        ile erişebilir, yeni kariyerine başlayabilirsin!
                    </p>
                </div>
            </div>

            <div className='container-fluid advertisement'>
                <div className='content-text '>
                    <div className="tab-vector3">
                        <Image src="https://tobeto.s3.cloud.ngn.com.tr/dot_white_1e7b4378ec.svg?updated_at=2022-09-20T12:52:57.424Z" alt="" width="120" height="120" />
                    </div>
                    <p>
                        Tobeto Platform'da ücretsiz olarak; sahip olduğun yetkinlikleri değerlendirir,<br />
                        ilgi ve bilgi seviyene göre yüzlerce eğitim içeriğine ulaşırsın. Bunları nasıl tamamlayacağını<br />
                        hızına, bütçene ve zamanına göre kendin belirlersin.<br /><br />
                        Hemen ücretsiz üye ol, platforma katıl!
                    </p>
                    <div className="tab-vector2">
                        <Image src="https://tobeto.s3.cloud.ngn.com.tr/04_b3b68891d7.svg?updated_at=2022-07-05T11:08:56.797Z" alt="" width="60" height="60" />
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='headfarming-area'>
                    <div className='row fw-bold'>
                        <p>Tobeto , 20. yy''ın “headhunting” yaklaşımını “headfarming” olarak değiştirmeyi hedefler!</p>
                        <p>Headfarming: Genç yetenekleri, sürekli öğrenme hevesi içinde olan profesyonelleri, 360
                            derece eğitmek,değerlendirmek, yönlendirmek ve desteklemektir.</p>
                    </div>
                </div>
            </div>
            <div className='success-model container'>
                <Container>
                    <Row className='hp-success-model'>
                        <Col md={7}>
                            <div>
                                <Image className='success-model-img' src='https://tobeto.s3.cloud.ngn.com.tr/spider_2_75142468a4.gif'></Image>
                            </div>

                        </Col>
                        <Col md={5}>
                            <div>
                                <p className='hp-success-model-header'>
                                    Tobeto 'İşte Başarı
                                    Modeli'mizi Keşfet!
                                </p>
                                <p className='hp-success-model-text'>
                                    Üyelerimize ücretsiz sunduğumuz, iş bulma ve işte
                                    başarılı olma sürecinde gerekli 80 tane davranış
                                    ifadesinden oluşan Tobeto 'İşte Başarı Modeli' ile,
                                    profesyonellik yetkinliklerini ölç,
                                    <br></br>
                                    raporunu gör.
                                </p>
                                <Button className='success-model-btn'>
                                    Hemen Başla
                                </Button>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='container acc'>
                <Accordion defaultActiveKey="0" className='acc-bg'>
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header>Tobeto "Yazılımda Başarı" Testi & Huawei Talent Interview</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span>
                                        Tobeto"da kendini sürekli değerlendirerek, öğrenim yolculuğunu kişiselleştirebilir ve işe hazırlık sürecine yön verebilirsin. <br />
                                        - Ücretsiz sunduğumuz  Tobeto "Yazılımda Başarı" Testi ile teknik bilgi ve yetkinliklerini kolaylıkla ölç. <br />
                                        - Aldığın mesleki eğitimlerin sonunda uluslararası geçerliliğe sahip Huawei Talent Interview teknik bilgi sınavları ile öğrendiğine emin ol, rozetini al. <br />
                                    </span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/a1.png" ></Image>
                                </div>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Tobeto Kişisel Gelişim Envanteri</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span> Yeni bir meslek. Daha yüksek ücret. Uzaktan çalışma. Hedeflediğin ne olursa olsun, hepsine uygun bir yol mutlaka var. Bir sonraki hamleni planlamaya başlamadan önce üyelerimize ücretsiz sunduğumuz Tobeto Kişisel Gelişim Envanteri'mizi yap, kendin için en uygun kariyer alanlarını keşfet.</span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/a2.png" ></Image>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Codeacademy & Tobeto</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span>Codecademy; 50 milyondan fazla üyesinin yeni teknolojik beceriler konusunda meraklanması, projelere imza atması, kariyerini geliştirmesine yardımcı olan bir online kodlama eğitimi platformudur. Tobeto'nun, gerçek zamanlı, kendi hızında, etkileşimli öğrenme ortamıyla öğrenmek daha kolay! Üstelik, Türkçe derslerimiz ve öğrenmeni destekleyici kaynaklarımız bu süreci kolaylaştırmak ve hızlandırmak için senin yanında!</span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/calogo.png" ></Image>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Bilgiyi Beceriye Çevirme</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span> Canlı dersler, becerilerini derinleştirebileceğin uygulamalar, gerçek senaryoları deneyimleyebileceğin projeler ve mentör desteği ile becerilerini geliştir, süreci kendin yönet. </span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/a5.png" ></Image>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Doğru İş İle Eşleşme</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span>Uzmanlığın için yeni becerileri kazanmak (reskill) veya yeni bir role başlamak (upskill) için gelişim yolculuğunu tamamla, profilini güncelle, teknoloji odaklı iş fırsatlarıyla eşleş. </span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/a6.png" ></Image>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Hayat Boyu öğrenme</Accordion.Header>
                        <Accordion.Body>
                            <div className='content'>
                                <div>
                                    <span> Sürekli öğrenme ve sürdürebilir gelişim için Tobeto topluluğuna dahil ol.</span>
                                </div>
                                <div>
                                    <Image src="https://tobeto.com/a4.png" ></Image>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className='container mb-5'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tobeto-partners">
                            <a href="https://www.enocta.com/">
                                <Image className='partners-enocta' src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenocta.9d43f28e.png&w=96&q=75" alt="Enocta" />
                            </a>

                            <a href="https://www.codecademy.com/">
                                <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcodecademy.1a1f5478.png&w=1080&q=75" alt="Codeacademy" />
                            </a>

                            <a href="https://perculus.com/tr">
                                <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fperculus.8d1bf42c.png&w=256&q=75" alt="Perculus" />
                            </a>

                            <a href="https://www.advancity.com.tr/">
                                <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkampus365.801c721d.png&w=256&q=75" alt="Kampüs365" />
                            </a>

                            <a href="https://www.talent-interview.com/tr/">
                                <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhuawei.0004b5e6.png&w=256&q=75" alt="Huawei" />
                            </a>

                            <a href="https://www.talent-interview.com/tr/">
                                <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftalent-interview_logo_disi.dfda1758.png&w=1080&q=75" alt="Talen Interview" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}