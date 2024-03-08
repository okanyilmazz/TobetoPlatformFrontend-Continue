import { useEffect, useState } from 'react';
import './EducationsPage.css';
import { IoSearch } from 'react-icons/io5';
import Select from 'react-select';
import { Tab, Tabs } from 'react-bootstrap';
import EducationCard from '../../components/EducationCard/EducationCard';
import { useDispatch, useSelector } from 'react-redux';
import educationProgramService from '../../services/educationProgramService';
import { GetListEducationProgramResponse } from '../../models/responses/educationProgram/getListEducationProgramResponse';
import GetListProjectResponse from '../../models/responses/project/getListProjectResponse';
import authService from '../../services/authService';

import projectService from '../../services/projectService';
import { userActions } from '../../store/user/userSlice';
import GetAccountEducationProgramResponse from '../../models/responses/accountEducationProgram/getAccountEducationProgramResponse';
import accountEducationProgramService from '../../services/accountEducationProgramService';
import { Paginate } from '../../models/paginate';

const EducationsPage = () => {
    const userState = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const user = authService.getUserInfo();
    const [educationPrograms, setEducationPrograms] = useState<GetListEducationProgramResponse[]>([]);


    const [filteredEducationPrograms, setFilteredEducationPrograms] = useState<GetListEducationProgramResponse[]>([]);
    const [accountEducationPrograms, setAccountEducationPrograms] = useState<Paginate<GetAccountEducationProgramResponse>>();
    const [projects, setProjects] = useState<GetListProjectResponse[]>([]);
    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [institutionOption, setInstitutionOption] = useState<string[]>([]);

    const formatStartDate = (startDate: Date) => {
        return startDate.toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    const projectOptions = projects.map(project => ({
        value: project.name,
        label: project.name
    }));

    useEffect(() => {
        if (!userState.user) {
            dispatch(userActions.getUserInfo());
            return;
        }

        projectService.getAll(0, 1).then((result) => {
            setProjects(result.data.items);
        });

        educationProgramService.getByAccountId(user.id, 0, 100).then((result: any) => {
            console.log(result.data)
            const programs = result.data.items.map((program: GetListEducationProgramResponse) => ({
                ...program,
                startDate: new Date(program.startDate)
            }));
            setEducationPrograms(programs);
            setFilteredEducationPrograms(programs);
            console.log(programs);
        });

        accountEducationProgramService.getByAccountId(user.id).then((result: any) => {
            setAccountEducationPrograms(result.data);
            console.log(result.data);
            console.log(user.id);
        }
        )
    }, [user.id]);

    useEffect(() => {
        let filteredPrograms = educationPrograms.filter(program =>
            program.name.toLowerCase().includes(searchText.toLowerCase())
        );

        switch (sortOption) {
            case 'Adına Göre (A-Z)':
                filteredPrograms.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Adına Göre (Z-A)':
                filteredPrograms.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'Tarihe Göre (E-Y)':
                filteredPrograms.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
                break;
            case 'Tarihe Göre (Y-E)':
                filteredPrograms.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
                break;
            default:
                break;
        }

        setFilteredEducationPrograms(filteredPrograms);
    }, [searchText, educationPrograms, sortOption]);

    return (
        <>
            <div className='educations'>
                <h1>Eğitimlerim</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5 col-12'>
                            <div className="educations-input">
                                <input
                                    className='educations-input-text'
                                    type="text"
                                    id="search"
                                    placeholder='Arama'
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <IoSearch className="educations-search-icon" />
                            </div>
                        </div>
                        <div className='col-md-3 col-12'>
                            <Select
                                defaultValue={null}
                                isMulti
                                name="projects"
                                value={institutionOption.map(option => ({ value: option, label: option }))}
                                onChange={(selectedOption) => {
                                    const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
                                    setInstitutionOption(selectedValues);
                                }}
                                className="projectSelect"
                                classNamePrefix="select"
                                placeholder="Kurum Seçiniz"
                                options={projectOptions}
                            />
                        </div>
                        <div className='col-md-3 col-12'>
                            <Select
                                defaultValue={null}
                                isMulti
                                name="EducationSort"
                                value={sortOption ? [{ value: sortOption, label: sortOption }] : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption && selectedOption[0]) {
                                        setSortOption(selectedOption[0].value);
                                    } else {
                                        setSortOption('');
                                    }
                                }}
                                className="projectSelect"
                                classNamePrefix="select"
                                placeholder="Adına Göre (A-Z)"
                                options={[
                                    { value: 'Adına Göre (A-Z)', label: 'Adına Göre (A-Z)' },
                                    { value: 'Adına Göre (Z-A)', label: 'Adına Göre (Z-A)' },
                                    { value: 'Tarihe Göre (Y-E)', label: 'Tarihe Göre (Y-E)' },
                                    { value: 'Tarihe Göre (E-Y)', label: 'Tarihe Göre (E-Y)' },
                                ]}
                            />
                        </div>
                        <div className='col-md-1'></div>

                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='educations-tabs col-md-12'>
                        <Tabs
                            defaultActiveKey="allEducations"
                            className="educations-tabs-container"
                        >
                            <Tab eventKey="allEducations" title="Tüm Eğitimlerim">
                                <div className='educations-all'>
                                    {filteredEducationPrograms.map(program => (
                                        <EducationCard
                                            key={program.id}
                                            title={program.name}
                                            date={formatStartDate(new Date(program.startDate))}
                                            id={program.id}
                                            thumbnailPath={program.thumbnailPath}
                                        />
                                    ))}
                                </div>
                            </Tab>
                            <Tab eventKey="continueEducations" title="Devam Ettiklerim">
                                <div className='educations-continue'>
                                    {filteredEducationPrograms
                                        .filter(program => accountEducationPrograms?.items.some(accProgram => accProgram.educationProgramName === program.name && accProgram.statusPercent < 99.2))
                                        .map(program => (
                                            <EducationCard
                                                key={program.id}
                                                title={program.name}
                                                date={formatStartDate(new Date(program.startDate))}
                                                id={program.id}
                                            />
                                        ))}
                                </div>
                            </Tab>
                            <Tab eventKey="finishedEducations" title="Tamamladıklarım">
                                <div className='educations-finished'>
                                    {filteredEducationPrograms
                                        .filter(program => accountEducationPrograms?.items.some(accProgram => accProgram.educationProgramName === program.name && accProgram.statusPercent > 99.2))
                                        .map(program => (
                                            <EducationCard
                                                key={program.id}
                                                title={program.name}
                                                date={formatStartDate(new Date(program.startDate))}
                                                id={program.id}
                                            />
                                        ))}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EducationsPage;
