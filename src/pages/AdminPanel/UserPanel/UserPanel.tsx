import React, { useEffect, useState } from 'react';
import "./UserPanel.css";
import { Tooltip } from 'antd';
import Modals from '../../../components/Modal/Modals';
import { Form, Formik } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import TobetoSelect from '../../../utilities/customFormControls/TobetoSelect';
import { IoSearch } from 'react-icons/io5';
import GetListUserResponse from '../../../models/responses/user/getListUserResponse';
import { Paginate } from '../../../models/paginate';
import { RiPencilFill } from 'react-icons/ri';
import userService from '../../../services/userService';
import TobetoTextInput from '../../../utilities/customFormControls/TobetoTextInput';
import operationClaimService from '../../../services/operationClaimService';
import GetListOperationClaimResponse from '../../../models/responses/operationClaim/getListOperationClaimResponse';
import SidebarCard from '../../../components/SidebarCard/SidebarCard';
import AdminPanelSideBarCard from '../../../components/AdminPanelSideBarCard/AdminPanelSideBarCard';
import GetUserResponse from '../../../models/responses/user/getUserResponse';
import userOperationClaimService from '../../../services/userOperationClaimService';
import authService from '../../../services/authService';
import UpdateUserOperationClaimRequest from '../../../models/requests/userOperationClaim/updateUserOperationClaimRequest';
import GetUserOperationClaimResponse from '../../../models/responses/userOperationClaim/getUserOperationClaimResponse';
import GetListUserOperationClaimResponse from '../../../models/responses/userOperationClaim/getListUserOperationClaimResponse';

export default function UserPanel() {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<Paginate<GetListUserResponse>>();
    const [filteredUsers, setFilteredUsers] = useState<Paginate<GetListUserResponse>>();
    const [addClick, setAddClick] = useState<boolean>(false)
    const [updateClick, setUpdateClick] = useState<boolean>(false)
    const [operationClaims, setOperationClaims] = useState<Paginate<GetListOperationClaimResponse>>();
    const [selectedUser, setSelectedUser] = useState<GetUserResponse>();
    const user = authService.getUserInfo();
    const [selectedUserOperationClaimId, setSelectedUserOperationClaimId] = useState<any>();
    const [userOperationClaims, setUserOperationClaims] = useState<Paginate<GetListUserOperationClaimResponse>>();
    const [selectedOperationClaimId, setSelectedOperationClaimId] = useState<any>();




    const handleAddClick = () => {
        setShowModal(true);
        setAddClick(true)
    };

    const handleUpdatedClick = (selectedUserId: any) => {
        setShowModal(true);
        setUpdateClick(true);

        userService.getById(selectedUserId).then((result: any) => {
            setSelectedUser(result.data)
        })
    };

    const closeModal = () => {
        setUpdateClick(false);
        setAddClick(false);
        setShowModal(false)
    }

    useEffect(() => {
        userService.getAll(0, 100).then(result => {
            setUsers(result.data);
            setFilteredUsers(result.data);
        });
        operationClaimService.getAll(0, 100).then((result: any) => {
            setOperationClaims(result.data)
        })
        userOperationClaimService.getAll(0, 100).then((result: any) => {
            setUserOperationClaims(result.data);
        })


    }, [updateClick])



    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (filteredUsers) {
            if (searchText.length > 0) {
                const newFilteredItems = filteredUsers.items.filter(user =>
                    user.roleName.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListUserResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setUsers(filteredItems);
            } else {
                setUsers(filteredUsers);
            }
        }
    };


    const handleUserOperationClaimUpdate = async (userOperationClaim: any) => {

        const updateUserOperationClaim: UpdateUserOperationClaimRequest = {
            id: selectedUserOperationClaimId!,
            operationClaimId: userOperationClaim.role,
            userId: user.id
        }
        await userOperationClaimService.update(updateUserOperationClaim)
        closeModal();
    }


    const handleSelectedUserOperationClaimId = (event: any) => {
        setSelectedUserOperationClaimId(event.target.value);
    }

    const handleSelectedOperationClaimId = (event: any) => {
        setSelectedOperationClaimId(event.target.value);
    }


    return (
        <div className='container'>
            <div className="row user-panel">

                <AdminPanelSideBarCard />
                <div className=" col-md-9   student-panel-content">
                    <div className="search ">
                        <div className="input-container">
                            <input type="text" id="search" onChange={handleInputFilter} placeholder="Arama" />

                            <IoSearch className="search-icon" />
                        </div>
                    </div>

                    <div className="table-responsive-sm">
                        <table className="mt-8 corpTable table table-hover">
                            <thead>
                                <tr>
                                    <th >Ad Soyad</th>
                                    <th >Rol</th>
                                    <th >E-mail</th>
                                    <th className='text-center' >İşlem</th>
                                </tr>
                            </thead>

                            <tbody className='student-panel-table-body'>
                                {

                                    users?.items.map((user) => (
                                        <tr key={String(user.id)}>
                                            <td className='student-id'>{user.firstName + " " + user.lastName}</td>
                                            <td className='student-id'>
                                                <div>
                                                    <select
                                                        name="operationClaimId"
                                                        className="user-panel-select"
                                                        onChange={(event: any) => handleSelectedUserOperationClaimId(event)}
                                                    >
                                                        <option value="operationClaimId">Seçiniz*</option>
                                                        {
                                                            userOperationClaims?.items.filter(operation => operation.userId === user.id).map((userOperationClaim) => (
                                                                <option key={String(userOperationClaim.id)} value={String(userOperationClaim.id)}>
                                                                    {String(userOperationClaim.operationClaimName)}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </td>
                                            <td className='student-id'>{user.email}</td>
                                            <td className='td-icons '>
                                                <Tooltip placement="top" title={"Silme"}>
                                                    <span className="trash-icon"></span>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Düzenleme">
                                                    <RiPencilFill onClick={() => handleUpdatedClick(user.id)} className='admin-edit-icon' />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modals
                    className="user-modal"
                    show={showModal}
                    onHide={() => closeModal()}
                    header={true}
                    title={
                        updateClick ? "Rol Atama" : ""
                    }
                    body={
                        <div className="formik-form">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: selectedUser?.email,
                                    role: null
                                }}
                                onSubmit={(values) => {
                                    console.log(values)

                                    handleUserOperationClaimUpdate(values)
                                }}>
                                <Form className="update-modal-form" >
                                    <Row >
                                        <Col md={4}>
                                            <TobetoSelect
                                                name="role"
                                                onChange={(event: any) => handleSelectedOperationClaimId(event)}
                                                className="mb-4"
                                                component="select">
                                                <option value="Role">Rol Seçiniz</option>
                                                {operationClaims?.items.map((operationClaim) => (
                                                    <option value={String(operationClaim.id)}>
                                                        {operationClaim.name}
                                                    </option>
                                                ))}
                                            </TobetoSelect>
                                        </Col>
                                        <Col md={8}>
                                            <TobetoTextInput
                                                disabled
                                                className="mb-4"
                                                name="name"
                                                value="Ad Soyad"
                                                placeholderTextColor="#fff" />
                                        </Col>
                                    </Row>
                                    <div className='form-buttons'>
                                        <Button className="mb-4" type="submit" style={updateClick ? { display: 'block' } : { display: 'none' }}   >
                                            Güncelle
                                        </Button>
                                        <Button className="mb-4" type="submit" style={addClick ? { display: 'block' } : { display: 'none' }}   >
                                            Kaydet
                                        </Button>
                                        <Button className="mb-4" onClick={() => closeModal()}>
                                            Kapat
                                        </Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    }
                />
            </div>
        </div>
    )
}