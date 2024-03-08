import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import TobetoTextInput from '../../utilities/customFormControls/TobetoTextInput';
import userService from '../../services/userService';
import GetUserResponse from '../../models/responses/user/getUserResponse';
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import './ForgotPassword.css'
import * as Yup from 'yup';
import ProfileToaster from '../../components/ProfileToaster/ProfileToaster';
import { EMAIL_SENT, REQUIRED_MESSAGE } from '../../environment/messages';
export default function ForgotPassword() {

    const [user, setUser] = useState<GetUserResponse>();

    const handleCheckUser = async (email: any) => {
        userService.getByMail(email).then(result => {
            setUser(result.data)
        })
    }


    useEffect(() => {
        const handlePasswordReset = async () => {
            if (user) {
                const result = await authService.passwordReset(user.email);
                if (result.data) {
                    const passwordResetCheck = await authService.passwordReset(user.email);
                    if (passwordResetCheck) {
                        ProfileToaster({ name: EMAIL_SENT });
                    }
                }
            }
        };

        handlePasswordReset();
    }, [user]);

    const initialValues = {
        email: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().required(REQUIRED_MESSAGE)
    })

    return (
        <div className="row">
            <div className="container text-center">
                <div className='forgot-password-page col-md-6'>
                    <h1>Şifre Sıfırlama</h1>
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            handleCheckUser(values.email)
                        }}>
                        <Form className="login-form text-center">
                            <Row>
                                <Col className='offset-1  mb-4' md={10}>
                                    <TobetoTextInput
                                        className="text-center"
                                        type="text"
                                        name="email"
                                        placeholder="example@gmail.com" />
                                </Col>
                            </Row>
                            <Button className="mb-4 forgot-button   " type="submit">
                                Gönder
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}