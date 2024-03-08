import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "./IstanbulCard2.css"

export default function IstanbulCard2(props: any) {
    const navigate = useNavigate();
    return (
        <div className="login-page-ik ">
            <div className="login-ik-container">
                <img className="tobeto-icon" src="https://tobeto.com/_next/static/media/ik-logo-dark.7938c0de.svg" alt="" />
            </div>
            {props.title}
            <Button className="Apply-button" onClick={() => navigate("https://tobeto.com/istanbul-kodluyor")}>
                Başvur
            </Button>
        </div>
    )
}


