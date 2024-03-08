import React from 'react'
import { FaRankingStar } from 'react-icons/fa6'
import { MdOutlineCastForEducation } from 'react-icons/md'
import { TfiEmail } from 'react-icons/tfi'
import { useLocation, useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import './AdminPanelSideBarCard.css'

export default function AdminPanelSideBarCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    return (
        <div className="sidebar-card col-md-3">
            <ul>
                <li onClick={() => navigate("/admin-panel/kullanicilar")} className={lastPathSegment === "kullanicilar" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/users.svg' />

                    </div>
                    <div className='sidebar-text'>
                        <span>Kullanıcılar</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/ogrenciler")} className={lastPathSegment === "ogrenciler" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/user.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Öğrenciler</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/dersler")} className={lastPathSegment === "dersler" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/profile-settings/book.svg' />
                    </div>
                    <div className='sidebar-text'>
                        <span>Dersler</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/duyurular")} className={lastPathSegment === "duyurular" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <TfiEmail />
                    </div>
                    <div className='sidebar-text'>
                        <span>Duyurular</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/egitimler")} className={lastPathSegment === "egitimler" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <MdOutlineCastForEducation />

                    </div>
                    <div className='sidebar-text'>
                        <span>Eğitim Programları</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/oturumlar")} className={lastPathSegment === "oturumlar" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <Image src='/assets/Icons/session.png' width={24} height={24} />


                    </div>
                    <div className='sidebar-text'>
                        <span>Oturumlar</span>
                    </div>
                </li>
                <li onClick={() => navigate("/admin-panel/roller")} className={lastPathSegment === "roller" ? 'active-item active-edit' : ''}>
                    <div className='sidebar-icon'>
                        <FaRankingStar width={24} height={24} />

                    </div>
                    <div className='sidebar-text'>
                        <span>Roller</span>
                    </div>
                </li>


            </ul>
        </div>
    )
}
