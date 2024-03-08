import IstanbulCard from "../../components/IstanbulCard/IstanbulCard";
import { Link, useNavigate } from "react-router-dom";
import "../ForIndividuals/ForIndividuals.css";
import { useEffect, useState } from "react";
import occupationService from "../../services/occupationService";
import GetListOccupationResponse from "../../models/responses/occupation/getListOccupationResponse";
import { Paginate } from "../../models/paginate";
import GetListSubjectResponse from "../../models/responses/subject/getListSubjectResponse";
import subjectService from "../../services/subjectService";
import GradientLine from "../../components/GradientLine/GradientLine";

export const ForIndividuals = () => {
  const [occupations, setOccupations] = useState<Paginate<GetListOccupationResponse>>();
  const [subjects, setSubjects] = useState<Paginate<GetListSubjectResponse>>();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/kayit-ol');
  };

  useEffect(() => {
    occupationService.getAll(0, 100).then(result => {
      setOccupations(result.data);
    })

    subjectService.getAll(0, 100).then(result => {
      setSubjects(result.data);
    })
  }, [])
  return (
    <div className="container for-individuals-page">

      <div className="row for-individuals-content">

        <div className="offset-md-2 row col-md-8 col-8 ik-cards">
          <IstanbulCard title={
            <span>Aradığın  <span className='quote' id='left-quote'>"</span>iş<span className='quote' id='right-quote'>"</span> Burada!</span>}
            onClick={handleClick} />


        </div>

        <div className="container  for-individuals-content-top">
          <div className=" mx-auto position-relative">
            <div className="vector">
              <img src="https://tobeto.s3.cloud.ngn.com.tr/03_005013e668_71411c39a1.svg" alt="" width="100" height="100" />
            </div>

            <h1>Kariyerinin kontrolü</h1>
            <h1 className="mb-4">senin elinde</h1>
            <p className="borderp">
              <span id="text-link">Dijital Bir Meslek</span>  &nbsp; edinmek,&nbsp; <span id="text-link"> Profesyonel Bir Yönetici</span>   &nbsp;olmak ya da &nbsp; <span id="text-link">Kendini Geliştirmek</span>     &nbsp; için İstediğin bölümden, istediğin kadar eğitimi seçip, eş zamanlı
              olarak alabilirsin.
            </p>

            <p className="text-white my-8 codeacademy-p">
              <Link to="http://www.codecademy.com" className="codeacademy-purple">Codecademy</Link> iş birliği ile, fark yaratmak senin elinde!
            </p>

            <span onClick={() => navigate("/kayit-ol")} className=" btn btn-rainbow rainbow-text py-4" > Uzmanlaşmak istediğin alanı seç, Tobeto platformda öğrenmeye
              başla! </span>
          </div>

          <GradientLine />

        </div>

        <div className="container want-to-start">
          <div className="mx-auto position-relative">
            <h4 className="text-white text-center mx-auto position-relative">
              Bir Yerden Başlamak İstiyorum
            </h4>
            <div className="vector-loading">
              <img
                src="https://tobeto.s3.cloud.ngn.com.tr/02_1a87a6ffc1_e4d2b2db45.svg"
                alt=""
              ></img>
            </div>
            <div className="row subjects">
              {
                subjects?.items.map((subject) => (
                  <div className="col-lg-3 col-4 subject">
                    <div className="pack-box">
                      <span  >{subject.name}</span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="see-more-text" >
              <span onClick={() => navigate("/katalog")}>Tümünü İncele &gt;&gt;</span>
            </div>
          </div>

          <GradientLine />

          <div className="row individuals-common">
            <div className="position-relative ">
              <h4> Dijital Bir Meslek İstiyorum</h4>
              <div className="vector-dots">
                <img
                  src="https://tobeto.s3.cloud.ngn.com.tr/dot_gray_8a5a605556_eb3dd4f77d.svg"
                  alt=""
                  width="150"
                  height="150"
                />
              </div>
            </div>

            <div className="row mx-auto occupations">
              {
                occupations?.items.map((occupation) => (
                  <div className="col-lg-3 col-4 occupation">
                    <div className="pack-box ">
                      {occupation.name}
                    </div>
                  </div>
                ))
              }
              <div className="see-more-text" >
                <span onClick={() => navigate("/katalog")}>Tümünü İncele &gt;&gt;</span>
              </div>
            </div>

            <div className="container">
              <div className="row fw-bold">
                <span onClick={() => navigate("/kayit-ol")} className=" btn btn-rainbow rainbow-text py-4" > Uzmanlaşmak istediğin alanı seç, Tobeto platformda öğrenmeye
                  başla! </span>
              </div>
              <GradientLine />
            </div>

            <div className="want-to-start">
              <div className="vector6 justify-content-center">
                <img
                  src="https://tobeto.s3.cloud.ngn.com.tr/comingsoon_4e9690b5a9_84706ccf9b.svg"
                  alt=""
                  width="130"
                />
              </div>
              <h4 className="position-relative want-to-manager">
                Profesyonel Bir Yönetici Olmak İstiyorum
                <div className="vector-star">
                  <img
                    src="https://tobeto.s3.cloud.ngn.com.tr/04_b3b68891d7_5ad2591676.svg"
                    alt=""
                    width="150"
                    height="150"
                  />
                </div>
              </h4>
            </div>
            <div className="management-programs">
              {
                subjects?.items.map((subject) => (
                  <div className="col-lg-2 col-4 management-program">
                    <div className="pack-box">
                      <span>{subject.name}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <GradientLine />

          <div className="position-relative text-white">
            <h4 id="improve"> Kendimi Geliştirmek İstiyorum </h4>
            <div className=" vector-dots-purple">
              <img
                src="https://tobeto.com/_next/static/media/dot-purple.e0e5c9d8.svg"
                alt=""
                width="150"
                height="150" />
            </div>
          </div>


          <div className="shadow-lg  spec-list">
            <div className="loop">
              <div className="inner">
                <div className="spec">Planlama Organize Etme</div>
                <div className="spec">Etik</div>
                <div className="spec">Duygusal Zeka</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Zaman Yönetimi</div>
                <div className="spec">Planlama Organize Etme</div>
                <div className="spec">Etik</div>
                <div className="spec">Duygusal Zeka</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Zaman Yönetimi</div>
              </div>
            </div>

            <div className="loop">
              <div className="inner2">
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Profesyonel Duruş</div>
                <div className="spec">Zaman Yönetimi</div>
                <div className="spec">Anlaşmazlıkların Çözümü</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Profesyonel Duruş</div>
                <div className="spec">Zaman Yönetimi</div>
                <div className="spec">Anlaşmazlıkların Çözümü</div>
                <div className="spec">Yeni Dünya Kavramı</div>
              </div>
            </div>

            <div className="loop">
              <div className="inner">
                <div className="spec">Karar Verme</div>
                <div className="spec">Sürekli Öğrenme</div>
                <div className="spec">Etkili İletişim</div>
                <div className="spec">Müzakere</div>
                <div className="spec">Anlaşmazlıkların Çözümü</div>
                <div className="spec">Karar Verme</div>
                <div className="spec">Sürekli Öğrenme</div>
                <div className="spec">Etkili İletişim</div>
                <div className="spec">Müzakere</div>
                <div className="spec">Anlaşmazlıkların Çözümü</div>
              </div>
            </div>

            <div className="loop">
              <div className="inner2">
                <div className="spec">Sürekli Öğrenme</div>
                <div className="spec">Çeviklik</div>
                <div className="spec">Takım Olma</div>
                <div className="spec">Etik</div>
                <div className="spec">Problem Çözme</div>
                <div className="spec">Sürekli Öğrenme</div>
                <div className="spec">Çeviklik</div>
                <div className="spec">Takım Olma</div>
                <div className="spec">Etik</div>
                <div className="spec">Problem Çözme</div>
              </div>
            </div>

            <div className="loop slider ">
              <div className="inner ">
                <div className="spec">Etik</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Değişime Uyum</div>
                <div className="spec">Takım Olma</div>
                <div className="spec">İnisiyatif Alma</div>
                <div className="spec">Etik</div>
                <div className="spec">Yeni Dünya Kavramı</div>
                <div className="spec">Değişime Uyum</div>
                <div className="spec">Takım Olma</div>
                <div className="spec">İnisiyatif Alma</div>
              </div>
            </div>

            <div className="loop">
              <div className="inner2">
                <div className="spec">Kişisel Motivasyon</div>
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Pozitif Bakış</div>
                <div className="spec">Zaman Yönetimi</div>
                <div className="spec">Etkili İletişim</div>
                <div className="spec">Kişisel Motivasyon</div>
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Pozitif Bakış</div>
                <div className="spec">Zaman Yönetimi</div>
                <div className="spec">Etkili İletişim</div>
              </div>
            </div>

            <div className="loop">
              <div className="inner">
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Değişime Uyum</div>
                <div className="spec">Kişisel Motivasyon</div>
                <div className="spec">Çeviklik</div>
                <div className="spec">Verimlilik</div>
                <div className="spec">Öz Farkındalık</div>
                <div className="spec">Değişime Uyum</div>
                <div className="spec">Kişisel Motivasyon</div>
                <div className="spec">Çeviklik</div>
                <div className="spec">Verimlilik</div>
              </div>
            </div>
            <div className="fades"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
