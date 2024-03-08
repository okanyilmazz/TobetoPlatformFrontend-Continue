import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navi.css';
import { Image, Dropdown, DropdownItem, DropdownMenu, Menu, MenuItem, Button } from 'semantic-ui-react';
import SignedIn from '../SignedIn/SignedIn';
import { useSelector } from 'react-redux';
import SignedOut from '../SignedOut/SignedOut';
import authService from '../../services/authService';
import { ADMIN_ROLE } from '../../environment/environment';

export default function Navi() {

    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    const navigate = useNavigate();
    const authState = useSelector((state: any) => state.auth);
    const user = authService.getUserInfo();

    return (
        <>
            <div style={{
                display: (
                    authState.isAuthenticated &&
                    (
                        lastPathSegment !== "katalog" &&
                        lastPathSegment !== "hakkimizda" &&
                        lastPathSegment !== "blog" &&
                        lastPathSegment !== "basinda-biz" &&
                        lastPathSegment !== "kurumlar-icin" &&
                        lastPathSegment !== "bireyler-icin" &&
                        lastPathSegment !== "takvim-anasayfa" &&
                        lastPathSegment !== "codecademy" &&
                        lastPathSegment !== ""
                    )
                ) ? 'none' : 'block'
            }}
                className={
                    authState.isAuthenticated &&
                        (
                            lastPathSegment !== "katalog" &&
                            lastPathSegment !== "hakkimizda" &&
                            lastPathSegment !== "bireyler-icin" &&
                            lastPathSegment !== "kurumlar-icin" &&
                            lastPathSegment !== "blog" &&
                            lastPathSegment !== "basinda-biz" &&
                            lastPathSegment !== "takvim-anasayfa" &&
                            lastPathSegment !== "codecademy" &&
                            lastPathSegment !== ""
                        ) ? 'header' : 'header bg-front-dark'}>

                {/* Header */}
                <div className='header-banner' >

                    <div className='home container'>
                        <div className='img'   >
                            <Image className='my-custom-image' src="https://tobeto.com/_next/static/media/ik-logo-light.ace655db.svg"></Image>
                        </div>
                        <div>
                            <p>Aradığın <span >"</span>İş<span >"</span> Burada!</p>
                        </div>
                        <div >
                            <Button className='btn' onClick={() => { navigate("/kayit-ol") }}> Başvur</Button>
                        </div>
                    </div>
                </div>


                {/* Navbar */}

                <div id="navbarStyle">
                    <Menu secondary size='large' id="containerStyle">
                        <div id="leftContentStyle">
                            <Image className='tobeto-icon' as={Link} to="/" src='https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTebeto-logo-yatay-beyaz.8c2d6927.png&w=256&q=75' size='small' />
                        </div>
                        <div id="home-messages">
                            <MenuItem as={Link} to="/hakkimizda" name='Biz Kimiz?' />
                            <Dropdown simple item text='Neler Sunuyoruz?'>
                                <DropdownMenu>
                                    <DropdownItem as={Link} to="/bireyler-icin">Bireyler İçin</DropdownItem>
                                    <DropdownItem as={Link} to="/kurumlar-icin">Kurumlar İçin</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <MenuItem as={Link} to="/katalog" name='Katalog' />
                            <MenuItem as={Link} to="/codecademy" name='Codecademy' />
                            <Dropdown simple item text="Tobeto'da Bu Ay">
                                <DropdownMenu>
                                    <DropdownItem as={Link} to="/blog">Blog</DropdownItem>
                                    <DropdownItem as={Link} to="/basinda-biz">Basında Biz</DropdownItem>
                                    <DropdownItem as={Link} to="/takvim-anasayfa">Takvim</DropdownItem>
                                    <DropdownItem>İstanbul Kodluyor</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        <div style={{ display: authState.isAuthenticated ? 'none' : 'block' }}>
                            <SignedOut />
                        </div>

                        <div style={{ display: authState.isAuthenticated ? 'block' : 'none' }}>
                            <SignedIn />
                        </div>
                    </Menu>
                </div>

            </div>

            <div className="login-header bg-front-white" style={{
                display:
                    (
                        authState.isAuthenticated &&
                        (
                            lastPathSegment !== "katalog"
                            && lastPathSegment !== "hakkimizda"
                            && lastPathSegment !== "blog"
                            && lastPathSegment !== "basinda-biz"
                            && lastPathSegment !== "kurumlar-icin"
                            && lastPathSegment !== "bireyler-icin"
                            && lastPathSegment !== "takvim-anasayfa"
                            && lastPathSegment !== "codecademy"
                            && lastPathSegment !== ""
                        )

                    ) ? 'block' : 'none'
            }}>

                <div id="navbarStyle">
                    <Menu secondary size='large' id="containerStyle">
                        <div id="leftContentStyle">
                            <Image className='tobeto-icon' as={Link} to="/" src='/assets/logos/TobetoLogo.png' size='large' />
                        </div>
                        <div id="menu-content">
                            <MenuItem className={lastPathSegment === "platform" ? 'active-item' : ''} as={Link} to="/platform" name='Ana Sayfa' />
                            <MenuItem className={pathArray.includes("profilim") ? 'active-item' : ''} as={Link} to="/profilim" name='Profilim' />
                            <MenuItem className={lastPathSegment === "degerlendirmeler" ? 'active-item' : ''} as={Link} to="/degerlendirmeler">Değerlendirmeler</MenuItem>
                            <MenuItem className={lastPathSegment === "platform-katalog" ? 'active-item' : ''} as={Link} to="/platform-katalog" name='Katalog' />
                            <MenuItem className={lastPathSegment === "takvim" ? 'active-item' : ''} as={Link} to="/takvim" name='Takvim' />
                            <MenuItem name='İstanbul Kodluyor' />
                            <MenuItem style={{ display: user?.role === ADMIN_ROLE ? "block" : "none" }} className={lastPathSegment === "admin-panel" ? 'active-item' : ''} as={Link} to="/admin-panel" name='Admin Panel' />
                        </div>
                        <SignedIn />
                    </Menu>
                </div>

            </div>
        </>

    )
}
