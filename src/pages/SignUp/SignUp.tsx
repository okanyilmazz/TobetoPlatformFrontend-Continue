import "./SignUp.css"
import { Col, Container, Image, Button, Row } from 'react-bootstrap'
import { Form, Formik } from 'formik';
import TobetoTextInput from '../../utilities/customFormControls/TobetoTextInput';
import authService from '../../services/authService';
import IstanbulCard2 from "../../components/IstanbulCard2/IstanbulCard2";
import { authActions } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/user/userSlice";

export default function SignUp() {
    const initialValues = { firstName: "", lastName: "", email: "", password: "", passwordControl: "" }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <Container className="sign-up-page">
                <Col md={6}>
                    <div className='rainbow-card'>
                        <Image className='tobeto-logo' src="https://tobeto.com/_next/static/media/tobeto-logo.29b55e1c.svg" thumbnail />
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                authService.register(values).then(response => {
                                    if (response.data !== undefined) {
                                        dispatch(authActions.addToken({ token: response.data.token }));
                                        dispatch(userActions.getUserInfo());
                                        navigate("/platform");
                                    }
                                })
                            }}>

                            <Form className='sign-up-form'>
                                <span className="mb-5">Hemen Kayıt Ol</span>
                                <TobetoTextInput className="form-name mb-4" name="firstName" type="text" placeholder="Ad*" />
                                <TobetoTextInput className="form-lastname mb-4" name="lastName" type="text" placeholder="Soyad*" />
                                <TobetoTextInput className="form-email mb-4" name="email" type="text" placeholder="E-Posta*" />
                                <TobetoTextInput className="form-password mb-4" name="password" type="password" placeholder="Şifre*" />
                                <TobetoTextInput className="form-password-control mb-4" name="passwordControl" type="password" placeholder="Şifre Tekrar*" />
                                <Button className="rainbow-card-button" type="submit">  Kayıt Ol</Button>
                            </Form>
                        </Formik>

                        <Col md={12}>
                            <div className='rainbow-card-2'>
                                <span>
                                    Zaten bir hesabın var mı?
                                    <span className="decorated-text-login" onClick={() => navigate("/giris")}>  Giriş Yap</span>
                                </span>
                            </div>
                        </Col>
                    </div>
                </Col>
                <Col md={6}>
                    <IstanbulCard2 />
                </Col>$$
            </Container>
        </>
    )
}