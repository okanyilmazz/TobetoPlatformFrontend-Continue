import { Card } from 'react-bootstrap'
import "./PhotoCard.css"

export default function PhotoCard(props: any) {
    function formatCustomDate(inputDate: Date) {
        const months = [
            "Oca", "Şub", "Mar", "Nis", "May", "Haz",
            "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
        ];

        const date = new Date(inputDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();


        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;
    }
    return (
        <div className="photo-card">
            <div className="main-bc">
                <Card>
                    <div className='photo-card-img'>
                        <Card.Img src={props.thumbnailPath} />
                    </div>
                    <div className="card-content">
                        <Card.Title className="card-content-title mt-5">
                            <h1>{props.title.slice(0, 48)}...</h1>
                        </Card.Title>
                        <Card.Text className="card-content-text">
                            <p>{props.description.slice(0, 120)}... </p>
                        </Card.Text>
                    </div>
                    <div className="date">{formatCustomDate(props.releaseDate)}</div>
                </Card>
            </div>
        </div >
    )
}
