import React from 'react'
import "./Codecademy.css"
import { Col, Container, Image, Row, Button } from 'react-bootstrap'


export default function Codecademy
    () {
    return (
        <div className='codecademy-page'>
            <Container>
                <Row className='codecademy-row1'>
                    <Col md={12}>
                        <div>
                            <p className='codecademy-header1'>
                                Kodlama, pek çok olasılığı içinde barındıran bir dünya.
                                <br />
                                <br />
                                Başlamak için tek gereken ise merak ve öğrenme dürtüsü.
                            </p>
                        </div>
                    </Col>

                </Row>
                <Row className='codecademy-row2'>
                    <Col md={2}>
                        <Image className='codecademy-logo-img' src='https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fca-1.cf0e22ca.png&w=256&q=75'></Image>
                    </Col>
                    <Col md={10}>
                        <div>
                            <p className='codecademy-text1'>
                                Dünya çapında milyonlarca insanın günümüz dijital dünyasında başarılı

                                olmak için ihtiyaç duyduğu becerileri eğlenceli bir şekilde edinmelerine

                                olanak sağlayan

                                <a href="https://www.codecademy.com/"> Codecademy* </a>

                                içerikleri şimdi Tobeto deneyimi ile sana

                                daha yakın!
                            </p>
                            <p className='codecademy-sub-text'>
                                *Codecademy; 2011'den beri, 50 milyondan fazla üyenin kendi için yeni bir yaşam ve kariyer geliştirmesine, projelerini hayata geçirmesine yardımcı

                                olan bir kodlama eğitimi platformudur.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className='codecademy-row3'>
                    <Col md={12}>
                        <div>
                            <h4 className='codecademy-left-header1'>
                                Codecademy & Tobeto
                            </h4>
                            <p className='codecademy-text2'>
                                Codecademy'nin tüm kaynaklarına Tobeto aboneliği ile erişebilirsin.
                                <br></br>
                                <br></br>
                                Aboneliğin sağlayacağı Türkçe canlı dersler, alanında uzman eğitmenler ve öğrenmeni kolaylaştıracak mentör

                                desteğiyle ile öğrenmeni destekleyici kaynaklarımız bu süreci kolaylaştırmak ve hızlandırmak için senin yanında!
                            </p>
                            <Button className='codecademy-signup-btn'>
                                    Hemen Abone Ol!
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='codecademy-container-gif'>
                <Container>
                    <Row className='codecademy-row4'>
                        <Image className='codecademy-gif' src='https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcacode.e3ffebc4.gif&w=1920&q=75'></Image>
                    </Row>
                </Container>

            </div>
            <div>
                <Container>
                    <Row className='codecademy-row5'>
                        <Col md={12}>
                            <div>
                                <h4 className='codecademy-left-header2'>
                                    Şimdi
                                    <br />
                                    Codecademy'nin
                                    <br></br>
                                    zengin kataloğu ile :
                                </h4>
                                <p className='codecademy-text3'>
                                    Gerçek zamanlı, kendi hızında kod yaz, anında geri bildirim al, etkileşimle yaparak öğren. Öğrenme deneyimine

                                    destek için makaleler, videolar ve projelerden faydalan.
                                </p>
                                <Button className='codecademy-signup-btn'>
                                        Hemen Abone Ol!
                                </Button>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>

    )
}
