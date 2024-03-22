import React, { useEffect, useState } from 'react'
import "./SkillPage.css"
import skillService from '../../services/skillService';
import { Paginate } from '../../models/paginate';
import GetListSkillResponse from '../../models/responses/skill/getListSkillResponse';
import GetListAccountSkillResponse from '../../models/responses/accountSkill/getListAccountSkillResponse';
import ProfileToaster from '../../components/ProfileToaster/ProfileToaster';
import accountSkillService from '../../services/accountSkillService';
import { Button, Col, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import AddAccountSkillRequest from '../../models/requests/accountSkill/addAccountSkillRequest';
import authService from '../../services/authService';
import SidebarCard from '../../components/SidebarCard/SidebarCard';
import { ADDED_SKILL, DELETED_SKILL, DO_NOT_SELECTED_SKILL } from '../../environment/messages';


export default function SkillPage() {
    const user = authService.getUserInfo();

    const [skills, setSkills] = useState<Paginate<GetListSkillResponse>>();
    const [accountSkillRequests, setAccountSkillRequests] = useState<any[]>([]);
    const [accountSkill, setAccountSkill] = useState<Paginate<GetListAccountSkillResponse>>();

    useEffect(() => {
        skillService.getAll(0, 25).then((result) => {
            setSkills(result.data);
        });
        getAccountSkill();

    }, []);


    const getAccountSkill = async () => {
        await accountSkillService.getAll(0, 100).then((result) => {
            setAccountSkill(result.data);
        });
    }

    const handleAddAccountSkill = async () => {
        if (accountSkillRequests.length > 0) {
            await accountSkillService.addRange(accountSkillRequests);
            ProfileToaster({ name: ADDED_SKILL })
            getAccountSkill();
        }
        else {
            ProfileToaster({ name: DO_NOT_SELECTED_SKILL });
        }
    }

    const handleDeleteAccountSkill = async (accountSkill: any) => {
        await accountSkillService.delete(accountSkill.id)
        ProfileToaster({ name: DELETED_SKILL });
        getAccountSkill();
    }

    const handleSkillChange = (selectedOptions: any) => {
        if (selectedOptions) {
            const requests: AddAccountSkillRequest[] = selectedOptions.map((option: any) => ({
                accountId: user.id,
                skillId: option.value
            }));
            setAccountSkillRequests(requests);
        } else {
            setAccountSkillRequests([]);
        }
    };

    const filteredOptions = skills?.items
        .filter(skill => !accountSkill?.items.some(accountSkill => accountSkill.skillName === skill.name))
        .map(skill => ({ value: skill.id, label: skill.name }));

    return (

        <div className='skill-page container'>

            <div className='side-bar-card'>
                <SidebarCard />
            </div>

            <div className="col-md-12 skill-area">
                <Row>
                    <div className="col-md-12 formik-form">
                        <Row>
                            <Col md={12}>
                                <span className="skill-input-label">Yetkinlik</span>

                                <div className='skill-select-area'>
                                    <CreatableSelect
                                        isMulti
                                        isClearable
                                        options={filteredOptions}
                                        placeholder="Seçiniz"
                                        className="skill-select"
                                        onChange={(event: any) => handleSkillChange(event)} />
                                </div>
                            </Col>
                        </Row>
                        <Button className="skill-add-button" onClick={handleAddAccountSkill}>
                            Kaydet
                        </Button>
                    </div>
                </Row>
                <Row>
                    <div className='col-md-12'>
                        {
                            accountSkill?.items.map((accountSkill) => (
                                <div className="my-grade">
                                    <div className="grade-details">
                                        <div className="grade-details-col">

                                            <span className="grade-details-content">{accountSkill.skillName}</span>
                                        </div>
                                        <span onClick={() => handleDeleteAccountSkill(accountSkill)} className="grade-delete g-del"></span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Row>
            </div>

        </div>
    )
}
