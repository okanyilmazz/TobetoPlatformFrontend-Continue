import Card from 'react-bootstrap/Card'
import './LessonCard.css'
import React from 'react'

export default function LessonCard(props: any) {
    return (
        <Card className='lesson-card-area'>
            {props.header}
            <Card.Body >
                <Card.Title className='lesson-card-title'> {props.title}</Card.Title>
                <Card.Text className='lesson-card-text'>
                    {props.text}
                </Card.Text>
                {props.button}
            </Card.Body>
        </Card>
    );
}
