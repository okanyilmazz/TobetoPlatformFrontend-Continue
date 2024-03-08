
import LoginPageCard from "../../components/LoginPageCard/LoginPageCard";
import './LoginPage.css';
import IstanbulCard2 from '../../components/IstanbulCard2/IstanbulCard2';
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
    return (
        <div className='bg-front-white login-page-content'>
            <div className="container">
                <div className="row content-center">
                    <div className="login-page col-md-6">
                        <LoginPageCard />
                    </div>
                    <div className='istanbul-kodluyor-card col-md-6'>
                        <IstanbulCard2
                            title={
                                <>
                                    <span className="greenLine2"> </span>
                                    <span className="job">Aradığın
                                        <span style={{ color: 'rgb(0, 176, 120)', marginRight: '0', marginLeft: '5px' }}>"</span>İş<span style={{ color: 'rgb(0, 176, 120)', marginLeft: '0', marginRight: '5px', }}>"</span>
                                        Burada!</span>
                                </>
                            }
                        />
                    </div>

                </div>
            </div>

        </div>



    )
}


