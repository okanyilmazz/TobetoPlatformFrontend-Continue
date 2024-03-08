import React from 'react'
import "./AboutUs.css"
import { Col, Container, Image, Row } from 'react-bootstrap'
import '../../components/TeamCard/TeamCard'
import AboutUsTeamMember from '../../components/TeamCard/TeamCard'
import { SocialMediaIcon } from '../../components/SocialMediaIcon/SocialMediaIcon'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AboutUs() {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    const authState = useSelector((state: any) => state.auth);
    return (
        <div className={(authState.isAuthenticated && lastPathSegment === "hakkimizda") ? 'about-content d-flex bg-front-dark' : 'about-content d-flex'} >
            <Container >
                <Row className='aboutUs'>
                    <Col md={2}>
                        <Image className='about-icon' src="https://tobeto.com/_next/static/media/tbtLogo.3fb5d7fd.svg" thumbnail />
                    </Col>
                    <Col md={4}>
                        <p>
                            Tobeto,<br />
                            "headhunting" yaklaşımını<br />
                            <span className='headfarming'>"headfarming" </span>olarak <br />değiştirmeyi <br />
                            hedefleyen, eğitim ve gelişim odaklı <br />dijitalbir platformdur
                        </p>
                    </Col>
                    <Col md={6}>
                        <video controls className='aboutUs-video' src="https://s3.cloud.ngn.com.tr/tobeto/tobeto_final_v2_5c7893fbe0.mp4"    ></video>
                    </Col>
                </Row>
                <Row className='container mt-5'>
                    <Col md={12} >
                        <p className='text-area text-white'>
                            Geleceğin mesleklerindeki yetenek açığını, geleneksel "headhunting" yaklaşımının <b>"headfarming" </b>olarak değişmesiyle çözülebileceğine inanarak yola çıktık. <br /><br />
                            Tobeto, "headfarming" yaklaşımıyla yeteneği potansiyel olarak değerlendirir, en kıymetli olacağı alanda yetiştirir, değer yaratacağı projeler ve kurumlarla eşleştirir. Bu fırsata <b>Y.E.S. (Yetiş-Eşleş-Sürdür) </b>diyen herkesi Tobeto’lu olmaya çağırıyoruz.<br /><br />
                            Günümüzde iş bulmak, bir projeye dahil olmak veya kariyerinde yükselmek gibi değer yaratma yolları için en önemli unsurların başında <b>dijital beceri</b> sahibi olmak geliyor. Tam da bu ihtiyaçları kapsamak üzere, Tobeto'da eğitim içeriklerimizi hem dijital beceri sahibi olmak isteyen yeteneklerin teknik beceri kazanması hem de genç profesyonellerin, ihtiyaçlarına uygun olarak yenilenmeleri ve yetkinliklerini geliştirmelerini kapsayacak şekilde tek platformda birleştirdik.<br /><br />
                            Tobeto’da <b>hem bireylere hem de kurumlara</b> hizmet eden yapımızla, doğru yetenekle doğru pozisyonun sürdürülebilir bir şekilde eşleşmesine ve birlikte gelişmelerine alan açıyoruz. Kurum içi çözümlere destek veriyor, eğitim ve istihdam arasında köprü görevini üstleniyoruz.
                        </p>
                    </Col>
                </Row>
            </Container>
            <div className='text-white'>
                <div className='aboutUs-container'>
                    <div className='container' >
                        <div className="row">
                            <div className="about-list">
                                <ul>
                                    <div className="list-item">
                                        <h1 className='tobeto-header'>Tobeto farkı;</h1>
                                        <li> <b>Codecademy </b> ile uluslararası geçerliliğe sahip sertifika fırsatı</li> <br />
                                        <li> <b>Abonelik</b>modeliyle eğitime erişim</li><br />
                                        <li>Çeşitlendirilmiş <b> değerlendirme </b> araçlarıyla gelişim alanlarını tanıma</li><br />
                                        <li> <b> Fark yaratan </b>  bir gelişim süreci</li><br />
                                        <li>Mesleki eğitimlerin yanı sıra <b>kişisel ve profesyonel gelişim</b> imkanı</li><br />
                                        <li>Alanında uzman eğitmenlerle  <b> canlı dersler</b></li><br />
                                        <li><b> Mentör </b>   desteği</li><br />
                                        <li>Online ve canlı derslerle <b>hibrit</b> yaklaşım</li><br />
                                        <li><b> Zengin </b>   eğitim kütüphanesi</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className='tobeto-slogan'>
                <span>Tobeto ile işe hazırlan, işe yerleş, işinde geliş, yüksel!</span>
            </div>
            <div className='gradient-line2 mt-4' />

            <div className='container'>
                <h1 className='title-card'>Ekibimiz</h1>
                <div className='row'>
                    <div className='Cards1'>
                        <AboutUsTeamMember name={'Elif Kılıç Tuğtan'} title1={'Kurucu Direktör'} title2={''} linkedinUrl={'https://www.linkedin.com/in/eliftugtan/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Felif-kilic.ba3177e2.png&w=3840&q=75'} />
                        <AboutUsTeamMember name={'Kader Yavuz'} title1={'Eğitim ve Proje Koordinatörü'} title2={''} linkedinUrl={'https://www.linkedin.com/in/kader-yavuz/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkader-yavuz.659fb664.png&w=3840&q=75'} />
                        <AboutUsTeamMember name={'Pelin Batır'} title1={'İş Geliştirme Yöneticisi'} title2={''} linkedinUrl={'https://www.linkedin.com/in/eliftugtan/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpelin-batir.3e558dda.png&w=2048&q=75'} />
                        <AboutUsTeamMember name={'Gürkan İlişen'} title1={'Eğitim Teknolojileri ve Platform Sorumlusu'} title2={''} linkedinUrl={'https://www.linkedin.com/in/g%C3%BCrkan-ili%C5%9Fen/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgurkanilisen.caf74ca3.png&w=2048&q=75'} />
                    </div>
                </div>
                <div className='Cards2'>
                    <AboutUsTeamMember name={'İsmail Erden'} title1={'Yazılım Geliştirme Müdürü'} title2={''} linkedinUrl={'https://www.linkedin.com/in/ismail-erden-78a49361/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fismail-erden.569a29be.png&w=2048&q=75'} />
                    <AboutUsTeamMember name={'Ahmet Selim Ergin'} title1={'Yazılım Geliştirici'} title2={''} linkedinUrl={'https://www.linkedin.com/in/selimergin/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fselimergin.f1d7d9ad.png&w=2048&q=75'} />
                    <AboutUsTeamMember name={'Doğukan Bektaş'} title1={'Yazılım Geliştirici'} title2={''} linkedinUrl={'https://www.linkedin.com/in/eliftugtan/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdogukan.ebef6ec9.png&w=2048&q=75'} />
                </div>
                <h1 className='title-card'>Danışma Kurulu</h1>
                <div className='Cards3'>
                    <AboutUsTeamMember name={'Ahmet Hançer'} title1={'Enocta'} title2={'CEO'} linkedinUrl={'https://www.linkedin.com/in/ahmethancer/'} imageSrc={'https://media.licdn.com/dms/image/C4E03AQFYH-aArLhnEg/profile-displayphoto-shrink_800_800/0/1516242874294?e=1710979200&v=beta&t=J4WnfERAkPRjZqbdKIEnlnZz4JCp8z87X6d0zJBHL14'} />
                    <AboutUsTeamMember name={'Dr. Ecmel Ayral'} title1={'Unlearn Academy'} title2={'Kurucu'} linkedinUrl={'https://www.linkedin.com/in/ecmel-ayral-777b823/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fecmel-ayral.9114c7af.png&w=2048&q=75'} />
                    <AboutUsTeamMember name={'Cem Atacık'} title1={'Kampüs365 & Perculus'} title2={'CEO'} linkedinUrl={'https://www.linkedin.com/in/atacik/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcem-atacik.29af3d5b.png&w=2048&q=75'} />
                    <AboutUsTeamMember name={'Mehmet Gürsoy'} title1={'Ledd'} title2={'Kurucu'} linkedinUrl={'https://www.linkedin.com/in/mehmetgursoy/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmehmet-gursoy.7a0af94d.png&w=2048&q=75'} />
                    <AboutUsTeamMember name={'Alpaslan Gürsoy'} title1={'Lidya Ventures'} title2={'Yönetim Kurulu Üyesi'} linkedinUrl={'https://linkedin.com/in/alpaslan-gursoy-97463a90/'} imageSrc={'https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falparslan.ad11a534.png&w=2048&q=75'} />
                </div>
            </div >

            <div className='gradient-line2' />

            <div className='container-fluid tobeto-office'>
                <h2>Ofisimiz</h2>
                <span>Kavacık, Rüzgarlıbahçe Mah. Çampınarı Sok. No:4 Smart Plaza B Blok Kat:3 34805, Beykoz,İstanbul</span>
            </div>

            <div className='container follow-us'>
                <span>Bizi Takip Edin</span>

                <div className='social-media-icons'>
                    <SocialMediaIcon />
                </div>
            </div>
        </div>
    )
}


export default AboutUs

