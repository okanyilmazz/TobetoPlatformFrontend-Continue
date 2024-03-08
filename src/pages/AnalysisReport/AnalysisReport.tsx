import React from 'react'
import ProfileRadar from '../../components/ProfileRadar/ProfileRadar';
import ReportCard from '../../components/ReportCard/ReportCard';
import "./AnalysisReport.css";

export default function AnalysisReport() {
    return (
        <div className='row'>
            <div className=' analysis bg-light'>
                <div className='analysis'>
                    <h6 className='analysis-title text-center'> Tobeto "İşte Başarı Modeli"</h6>
                    <h6 className='analysis-title2 text-center'> Analiz Raporum </h6>
                </div>
            </div>
            <div className='analysis-report py-2'>
                <div className='container mb-6 mt-6 col-12'>
                    <div className="radar-report p-6 mb-6 tobeto-light-bg">
                        <div className="radar-container">
                            <ProfileRadar />
                        </div>
                        <div className='accordion'>
                            <div className='report-title'>
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />
                                <ReportCard />

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
