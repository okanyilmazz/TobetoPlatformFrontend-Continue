import { useNavigate } from 'react-router';
import './EducationCard.css';
import { Button, Card } from 'react-bootstrap';

export default function EducationCard(props: any) {

    const navigate = useNavigate();
    console.dir(props)
    return (
        <div className='education-card-content'>
            <div className='content'>
                {
                    <Card className='education-card'>
                        <Card.Img variant="top" src={props.thumbnailPath} />
                        <Card.Body>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text>
                                {props.date}
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate("/egitimlerim/egitim-detaylari/" + props.id)}>Eğitime Git</Button>
                        </Card.Body>
                    </Card>
                }
            </div>
        </div>
    )
}
