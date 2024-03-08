import React from 'react'
import { Button } from 'react-bootstrap';
import { Card, Image } from 'semantic-ui-react'

const ApplyCard = () => {
    return (
        <Card className='col-md-6 col-sm-12 ik-card'>
            <Card.Content>
                <div className='content-top'>
                    <div className='content-left'>
                        <div className='text-ik'>
                            <span>Aradığın
                                <span style={{ color: 'rgb(0, 176, 120)', marginRight: '0', marginLeft: '5px' }}>"</span>iş<span style={{ color: 'rgb(0, 176, 120)', marginLeft: '0', marginRight: '5px', }}>"</span>
                                Burada!</span>
                            <div id='circle'></div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <Image src="https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBANNER-12.4b21c70e.png&w=640&q=75" fluid size='small' />
                    </div>
                </div>

                <div className='content-bottom'>
                    <Button>Başvur</Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default ApplyCard
