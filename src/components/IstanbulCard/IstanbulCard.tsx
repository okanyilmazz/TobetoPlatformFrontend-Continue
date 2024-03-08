import { Card, Image } from 'semantic-ui-react'
import "./IstanbulCard.css"

export default function IstanbulCard(props: any) {
    return (
        <Card className='ik-card'>
            <div className="content">
                <div className="content-top">
                    <div className="content-left">
                        <div className="text-ik">
                            {props.title}
                            <div id="circle"></div>
                        </div>
                    </div>
                    <div className="content-right">
                        <Image src="https://tobeto.com/_next/static/media/ik-logo-light.ace655db.svg" />
                    </div>
                </div>
                <div className="content-bottom">
                    <button onClick={props.onClick}>Başvur</button>
                </div>
            </div>
        </Card>
    )
}
