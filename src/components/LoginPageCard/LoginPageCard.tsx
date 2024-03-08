import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap'
import TobetoTextInput from '../../utilities/customFormControls/TobetoTextInput';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginPageCard.css"
import { authActions } from '../../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user/userSlice';

export default function LoginPageCard() {
    const initialValues = { email: "", password: "" }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (

        <div className="container login-page-card bg-front-white">
            <div className="row">
                <div className="col-md-6 login-content">
                    <div className="login-container">
                        <img className='tobeto-icon' src="https://tobeto.com/_next/static/media/tobeto-logo.29b55e1c.svg" alt="" />
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                authService.login(values).then(response => {
                                    if (response.data !== undefined) {
                                        dispatch(authActions.addToken({ token: response.data.token }));
                                        dispatch(userActions.getUserInfo());
                                        authService.getUserInfo();
                                        navigate("/platform");
                                    }
                                })
                            }}>
                            <Form className='login-form'>
                                <TobetoTextInput className="mb-4" name="email" placeholder="E-Posta" placeholderTextColor="#fff" />
                                <TobetoTextInput className="mb-4" name="password" type="password" placeholder="Şifre" />
                                <Button className="mb-4" type="submit">Giriş Yap</Button>
                                <Button className='transparent-button' onClick={() => navigate('/sifremi-unuttum')}>Şifremi Unuttum</Button>
                                <p>
                                    Henüz üye değil misin?{" "}
                                    <span className='register-button' onClick={() => navigate('/kayit-ol')}>
                                        Kayıt Ol
                                    </span>
                                </p>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    )
}
