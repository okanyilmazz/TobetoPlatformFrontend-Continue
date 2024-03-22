import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Link, useLocation } from "react-router-dom";
import './Footer.css';
import { SocialMediaIcon } from "../../components/SocialMediaIcon/SocialMediaIcon";

const Footer = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const lastPathSegment = pathArray[pathArray.length - 1];
  return (
    <>
      <MDBFooter className="fontFooter"

        style={
          lastPathSegment === "platform" ||
            lastPathSegment === "egitimlerim" ||
            pathArray.includes("profilimi-duzenle") ||
            pathArray.includes("egitim-detaylari") ||
            lastPathSegment === "admin-panel" ||
            lastPathSegment === "ogrenciler" ||
            lastPathSegment === "dersler" ||
            lastPathSegment === "duyurular" ||
            lastPathSegment === "egitimler" ||
            lastPathSegment === "roller" ||
            lastPathSegment === "kullanıcılar" ||
            lastPathSegment === "degerlendirmeler" ||
            lastPathSegment === "platform-katalog" ||
            lastPathSegment === "basvuru" ||
            lastPathSegment === "takvim" ||
            lastPathSegment === "1" ||
            pathArray.includes("egitim-detaylari") ||
            pathArray.includes("reset-password") ||
            pathArray.includes("admin-panel") ||

            lastPathSegment === "profilim" ? { display: 'none' } : { display: 'block' }}>


        <hr />
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-white fw-bold ">Site Haritası</h5>
              <br />
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to='/' className='text-white'>
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Bireyler İçin
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Kurumlar için
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Kurumsal Kimlik
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    S.S.S.
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    İletişim
                  </Link>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-white fw-bold">Kaynaklar</h5>
              <br />
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to='/' className='text-white'>
                    Üyelik Sözleşmesi ve Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    KVKK Aydınlatma Metni
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    İlgili kişi başvuru formu
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Çerez Politikası
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Cayma Formu
                  </Link>
                </li>
              </ul>
            </MDBCol>


            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-white fw-bold">Eğitim Yolculukları</h5>
              <br />

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to='/' className='text-white'>
                    Front End
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Full Stack
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Web & Mobile
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Cayma Formu
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Siber Güvenlik
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    UI / UX
                  </Link>
                </li>
              </ul>
            </MDBCol>


            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-white fw-bold">Blog</h5>
              <br />
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to='/' className='text-white'>
                    Web API Nedir? Programlama Yazılımının Arayüzü Nasıl Çalışır?
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Yapay Zeka Chatbot: İşte Geleceğin İletişim Aracı!
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Yazılım Test Otomasyonu: İş Akışınızı Daha Verimli Hale Getirin!
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Node.js Nedir ve Nasıl Kullanılır? İşte Sana Basit ve Etkili Kılavuz
                  </Link>
                </li>
                <li>
                  <Link to='/' className='text-white'>
                    Robotlar ve Yapay Zeka İçin Hangi Yazılım Dili Kullanılır?
                  </Link>
                </li>
              </ul>
            </MDBCol>

          </MDBRow>
        </MDBContainer>

        <MDBContainer className="p-4 ">
          <MDBCol lg="12" md="3" className="custom-class text-white">
            <div className="d-flex justify-content-around">
              <div>
                <a href="https://tobeto.com/"><img style={{ width: '200px' }} src="../../Assets/Logos/TobetoLogo.png" alt="Tobeto" /></a>
              </div>
              <div className="mt-2 ps-2 pe-4 ">
                <p>© 2022 Tobeto | Her Hakkı Saklıdır</p>
              </div>
              <div> <SocialMediaIcon /> </div>
            </div>
          </MDBCol>
        </MDBContainer>

      </MDBFooter>
      <MDBFooter style={
        lastPathSegment === "katalog" ||
          lastPathSegment === "codecademy" ||
          lastPathSegment === "kayit-ol" ||
          lastPathSegment === "giris" ||
          lastPathSegment === "hakkimizda" ||
          lastPathSegment === "blog" ||
          lastPathSegment === "basinda-biz" ||
          lastPathSegment === "kurumlar-icin" ||
          lastPathSegment === "" ||
          lastPathSegment === "bireyler-icin" ||
          lastPathSegment === "sifremi-unuttum" ||



          lastPathSegment === "takvim-anasayfa" ? { display: 'none' } : { display: 'block' }}>

        <div className="fontFooter small"
        >
          <div className="footer-container">
            <div className="row">
              <div className="footer-tobeto-logo col-6 col-lg-4 mb-lg-0 my-4">
                <a href="#">
                  <img src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTebeto-logo-yatay-beyaz.8c2d6927.png&w=256&q=75" alt="tobeto-logo" />
                </a>
              </div>
              <div className="footer-tobeto-contact col-6 col-lg-8 my-4">
                <div className="footer-contact">
                  <button className="footer-tobeto-contact-button">
                    <a href="https://tobeto.com/iletisim" >Bize Ulaşın</a>
                  </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBFooter>

    </>
  );
};

export default Footer;
