import React from 'react'
import { Image } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import "./AdminPanel.css"
import { useSelector } from 'react-redux';
import StudentPanel from './StudentPanel/StudentPanel';
import EducationPanel from './EducationPanel/EducationPanel';
import AnnouncementPanel from './AnnouncementPanel/AnnouncementPanel';
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import LessonPanel from './LessonPanel/LessonPanel';
import SessionPanel from './SessionPanel/SessionPanel';
import RolePanel from './RolePanel/RolePanel';
import UserPanel from './UserPanel/UserPanel';


export default function AdminPanel() {

    const navigate = useNavigate();
    const userState = useSelector((state: any) => state.user);


    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];


    return (
        <div className="container admin-panel ">
            <div className="row">
                <section >
                </section>



                {/* <div className="col-md-9" style={lastPathSegment === "kullanicilar" ? { display: 'block' } : { display: 'none' }}>
                    <UserPanel />
                </div> */}
                <div className="col-md-9" style={lastPathSegment === "ogrenciler" ? { display: 'block' } : { display: 'none' }}>
                    <StudentPanel />
                </div>
                <div className="col-md-9" style={lastPathSegment === "dersler" ? { display: 'block' } : { display: 'none' }}>
                    <LessonPanel />
                </div>

                <div className="col-md-9" style={lastPathSegment === "duyurular" ? { display: 'block' } : { display: 'none' }}>
                    <AnnouncementPanel />
                </div>

                <div className="col-md-9" style={lastPathSegment === "egitimler" ? { display: 'block' } : { display: 'none' }}>
                    <EducationPanel />
                </div>
                <div className="col-md-9" style={lastPathSegment === "oturumlar" ? { display: 'block' } : { display: 'none' }}>
                    <SessionPanel />
                </div>

                <div className="col-md-9" style={lastPathSegment === "roller" ? { display: 'block' } : { display: 'none' }}>
                    <RolePanel />
                </div>

            </div >
        </div >



    )
}
