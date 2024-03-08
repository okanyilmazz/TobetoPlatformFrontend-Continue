import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './ProfileRadar.css';
import GetListCompetenceResultResponse from '../../models/responses/competenceResult/getListCompetenceResultResponse';
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../services/authService';
import { userActions } from '../../store/user/userSlice';
import competenceResultService from '../../services/competenceResultService';
import GetListCompetenceCategoryResponse from '../../models/responses/competenceCategory/getListCompetenceCategoryResponse';
import competenceCategoryService from '../../services/competenceCategoryService';

const ProfileRadarChart: React.FC<{ competenceResult: GetListCompetenceResultResponse[], competenceCategory: GetListCompetenceCategoryResponse[] }> = ({ competenceResult, competenceCategory }) => {
    const chartRef = useRef<any>(null);
    const options = {
        scales: {
            r: {
                beginAtZero: true,
                suggestedMax: 1,
                ticks: {
                    stepSize: 1,
                    minTicksLimit: 11,
                    maxTicksLimit: 11,
                    display: false,
                },
                angleLines: {
                    display: true,
                    drawBorder: false,
                },
                grid: {
                    circular: true,
                },
            },
        },
        elements: {
            line: {
                borderWidth: 2,
                borderColor: 'rgb(204, 204, 204)',
                fill: true,
            },
            point: {
                radius: 6,
                backgroundColor: (context: any) => {
                    const dataIndex = context.dataIndex;
                    const numberOfCategories = 8;
                    const categoryIndex = dataIndex % numberOfCategories;

                    const colorMap: { [key: number]: string } = {
                        0: '#85a0a9',
                        1: '#217925',
                        2: '#eec16d',
                        3: '#6667ab',
                        4: '#e288b6',
                        5: '#af8962',
                        6: '#d75078',
                        7: '#d77e6f',
                    };

                    return colorMap[categoryIndex] || 'rgb(204, 204, 204)';
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        tooltips: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
    };

    useEffect(() => {
        const ctx = document.getElementById('chart') as HTMLCanvasElement | null;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        if (ctx) {
            chartRef.current = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: new Array(competenceCategory.length).fill(''),
                    datasets: [
                        {
                            label: '',
                            data: competenceResult.map(item => parseFloat(item.point)),
                        },
                    ],
                },
                options: options,
            });

        }
    }, [competenceResult, competenceCategory, options]);

    return (
        <div>
            <canvas id="chart" />
        </div>
    );
};

const ProfileRadar: React.FC = () => {
    const [account, setAccount] = useState<GetListAccountResponse>();
    const userState = useSelector((state: any) => state.user);
    const user = authService.getUserInfo();
    const dispatch = useDispatch();
    const [competenceResult, setCompetenceResult] = useState<GetListCompetenceResultResponse[]>([]);
    const [competenceCategory, setCompetenceCategory] = useState<GetListCompetenceCategoryResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userState.user) {
            dispatch(userActions.getUserInfo());
            return;
        }

        competenceResultService.getByAccountId(user.id, 0, 8).then(result => {
            setCompetenceResult(result.data.items);
            setLoading(false);
        })

        competenceCategoryService.getAll(0, 8).then((result) => {
            setCompetenceCategory(result.data.items);
            setLoading(false);
        });

    }, [userState.user, dispatch, user.id]);

    return (
        <div className="profile-radar-container">
            <ProfileRadarChart competenceResult={competenceResult} competenceCategory={competenceCategory} />
            <div className='profile-radar-labels'>
                <div className="radar-labels">
                    {competenceCategory.map((category, index) => (
                        <div key={index} className="label">
                            <span className={`legend legend${index + 1}`}>{competenceResult[index]?.point}</span>
                            <span className="legendName">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileRadar;