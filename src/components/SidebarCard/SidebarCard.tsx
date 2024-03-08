import React from 'react'
import { Image } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import "./SidebarCard.css"
export default function SidebarCard() {

    const navigate = useNavigate();
    const location = useLocation();

    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];

    return (
        <div className="sidebar-card col-md-3 col-lg-3 col-12">
            <ul>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/kisisel-bilgilerim")} className={lastPathSegment === "kisisel-bilgilerim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/user.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Kişisel Bilgilerim</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/deneyimlerim")} className={lastPathSegment === "deneyimlerim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/business.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Deneyimlerim</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/egitim-hayatim")} className={lastPathSegment === "egitim-hayatim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/book.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Eğitim Hayatım</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/yetkinliklerim")} className={lastPathSegment === "yetkinliklerim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/award.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Yetkinliklerim</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/sertifikalarim")} className={lastPathSegment === "sertifikalarim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/certificates.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Sertifikalarım</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/medya-hesaplarim")} className={lastPathSegment === "medya-hesaplarim" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/globe.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Medya Hesaplarım</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/yabanci-dil")} className={lastPathSegment === "yabanci-dil" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/translate.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Yabancı Dillerim</span>
                    </div>
                </li>
                <li onClick={() => navigate("/profilim/profilimi-duzenle/ayarlar")} className={lastPathSegment === "ayarlar" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/settings.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Ayarlar</span>

                    </div>
                </li>
            </ul>
        </div>
    )
}
