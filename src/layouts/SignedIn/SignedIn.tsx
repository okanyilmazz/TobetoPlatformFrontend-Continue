import './SignedIn.css'
import { Button, Dropdown, DropdownDivider, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user/userSlice';
import { useEffect } from 'react';

export default function SignedIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state: any) => state.user);

    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    useEffect(() => {
        dispatch(userActions.getUserInfo());
    }, [])

    function handleLogOut() {
        dispatch(authActions.removeToken())
        dispatch(userActions.removeUserInfo());
        navigate("/giris")
    }
    return (
        <div className='sign-in'>
            <Button className='sign-tobeto-icon'
                style={
                    lastPathSegment === "katalog" ||
                        lastPathSegment === "hakkimizda" ||
                        lastPathSegment === "blog" ||
                        lastPathSegment === "basinda-biz" ||
                        lastPathSegment === "kurumlar-icin" ||
                        lastPathSegment === "" ||
                        lastPathSegment === "bireyler-icin" ||
                        lastPathSegment === "takvim-anasayfa" ? { display: 'none' } : { display: 'block' }}></Button>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <Image src="/assets/logos/sign-in-profile.png" />
                    <span>{userState.user?.firstName + " " + userState.user?.lastName}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profilim">Profil Bilgileri</Dropdown.Item>
                    <DropdownDivider className='divider-1'></DropdownDivider>
                    <DropdownDivider className='divider-2'></DropdownDivider>
                    <Dropdown.Item onClick={() => handleLogOut()}>Oturumu Kapat</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div >
    )
}