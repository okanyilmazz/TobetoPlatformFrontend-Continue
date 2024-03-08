import { Button } from "semantic-ui-react"
import "./SignedOut.css"
import { Link } from "react-router-dom"

export default function SignedOut() {
    return (
        <div className='sign-out'>
            <Button as={Link} to="/giris" primary id="buttonStyle">Giriş Yap</Button>

            <Button as={Link} to="/kayit-ol" className='register btn-rainbow'>Ücretsiz Üye Ol</Button>
        </div>
    )
}
