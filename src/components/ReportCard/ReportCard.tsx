import React from 'react'
import { Accordion } from 'react-bootstrap';
import './ReportCard.css';

export default function ReportCard() {
    return (
        <div className='row report-card'>
            <div className="report-card-content py-8 px-6">
                <div className=" report-container rounded-end  border-4 border-start ">
                    <div className=" report d-flex justify-content-between ">
                        <h1 className='report-title'>Yeni dünyaya hazırlanıyorum </h1>
                        <p className="score badge">Yetkinlik Puanı: 4.3</p>
                    </div>
                </div>
            </div>
            <Accordion defaultActiveKey="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='accordion-title'>Bu yetkinlik nedir ve neden önemli?</Accordion.Header>
                    <Accordion.Body className='accordion1'>
                        <span>

                            Tobeto ‘İşte Başarı Modeli’nin son yetkinliği yeni dünya ile ilgilidir. Bu yetkinlik, diğer yedi yetkinlikten farklı olarak, yeni dünya
                            ile ilgili farkındalık yaratmak ve herkesin kendisini olabildiğince buna hazırlaması konusunda yönlendirici olması için
                            modele eklenmiştir. Zira içinde bulunduğumuz zamanlar önemli bir geçiş sürecine işaret etmektedir. Dijital teknolojilerle
                            birlikte yaşanan dönüşümler hayatın her alanını yeninden şekillendirmektedir.

                            <br />
                            <br />

                            İş dünyası ve şirketler de bu dönüşümün hem lokomotifi hem de etkilenenidir. Teknolojinin bu kadar yaygınlaşması ve
                            karmaşık hale gelmesi, onu kullanabilecek nitelikte donanımlı insanlar gerektirmektedir. Birçok araştırma göstermektedir ki,
                            hızlı teknolojik gelişmeler karşısında gereken yetenek altyapısı oluşturulamamıştır. Bu yüzden birçok şirket, özellikle teknoloji
                            yoğun pozisyonlarda yetenek açığı çekmektedir. Bu açığı kapatmak için kendi içinde gelişim programları düzenleyen pek
                            çok şirket var. İşin daha dramatik boyutu, bazı meslekler artık kendini tamamen teknolojiye bırakmış durumda ve artık bu
                            meslek alanlarında çalışanların kendilerini başka alanlarda çalışacak şekilde geliştirmesi bir zorunluluk.

                            <br />
                            <br />

                            Tüm bu dönüşüm süreci içinde; yeni dünyayı anlamış, bu dünyada başarılı olabilecek dijital ve teknoloji yetkinliklerine sahip
                            adayların istihdamı kuşkusuz daha kolay. Bu konudaki gelişim ihtiyacı sadece istihdamla ilgili de değil çünkü bu beceriler
                            gündelik yaşamda da çok önemli hale gelmiş durumda. İnterneti iyi kullanan, aradığı tüm bilgilere ulaşabilen, ihtiyacına
                            göre dijital uygulamaları arayıp bulan, siber dünyada güvenliğini koruyabilen tüm bireyler birçok alanda öne çıkıyor. Ayrıca
                            bu dünya fırsatlar dünyasıdır. Yeni mecralar, yeni işler, yeni para kazanma biçimleri ortaya çıkarken bu fırsatları ancak
                            yeterli donanıma sahip bireyler yakalayabilecek. Tüm bu açılardan bakıldığında bu yetkinlik, diğer tüm yetkinliklerin gücünü
                            artırması açısından önemli.
                        </span>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Geliştirmek için ne yapmalı?</Accordion.Header>
                    <Accordion.Body className='accordion2'>
                        <ul>
                            <li>Tobeto size yeni teknolojileri ve yeni dünyanın kodlarını tanıtan eğitimler sunmaktadır. Bu eğitimleri tamamlayın.</li>
                            <li>Bununla birlikte bu alan son derece dinamik ve sürekli olarak yeniliklerin ortaya çıktığı bir alandır. Bir alışkanlık olarak tüm bu yenilikleri takip edin.</li>
                            <li>“Dijital okuryazarlık”, “teknoloji okuryazarlığı”, “yeni medya okuryazarlığı”, “bilgi okuryazarlığı” gibi anahtar kelimelerle yeni okuryazarlıkları araştırın.</li>
                            <li>Özellikle çalışmak istediğiniz alandaki en yeni teknolojilerle ilgili araştırmalar yaparak buradaki bilgi ve beceri altyapınızı taze tutun.</li>
                            <li>Yeni dünya, 21. yy. becerileri ile ilgili birçok araştırma ve rapor yayınlanmaktadır. Bunları bulup inceleyin. Özellikle hangi beceriler ön plana çıkıyor ya da çıkacak, o konularda gelişime öncelik verin.</li>
                            <li>Tüm bu eğitim ve araştırmalarınız sonrasında, kritik gördüğünüz kriterler üzerinden kendiniz için bir analiz yapın ve kendinize bir puan verin.</li>
                            <li>Dijital teknolojilerde sadece tüketici olmak değil aynı zamanda üretici olmak için de çaba gösterin. En basitinden dijital içerik üretme tarafında temel sosyal medya paylaşımlarının ötesinde daha profesyonel denemeler yapabilirsiniz.</li>
                            <li>Yazılım alanında çalışmasanız bile fırsatınız varsa temel düzeyde yazılım öğrenmeye çalışın. En azından yazılımcılarla birlikte çalışabilecek kadar, yazılım dünyasının temel kavramlarına aşina olun.</li>
                            <li>Yine benzer şekilde, veri bilimi alanında çalışmasanız bile bu alanda kendinizi olabildiğince geliştirin.</li>
                            <li>Dijital dünyada iş fırsatlarını araştırın. Kendi adınıza ya da çalıştığınız kurum için girişim denemelerinde bulunabilirsiniz.</li>
                            <li>‘Netiket’ kavramını araştırın ve dijital mecralardaki varlığınızı olabildiğince bu sınırlar içinde tutmaya özen gösterin.</li>
                            <li>Özellikle bireysel düzeyde siber güvenlik risklerini ve önlemlerini araştırın. Buradaki önemleri olabildiğince uygulamaya çalışın. Özellikle bu konularda deneyimsiz olan yakınlarınıza yardımcı olun.</li>
                            <li>Dijital dünyaya hâkim, yeni teknolojileri yakından takip eden kişilerle birlikte öğrenme ve paylaşım grupları kurun. Herkesin bilgisi ve deneyimini ortak bir akla dönüştürün. Burada üretilen bilgilerle başkalarına olabildiğince destek olun.</li>
                        </ul>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Bu alanda önerilen eğitimler</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div >
    )
}
