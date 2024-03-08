import { Pagination } from 'antd';
import { useEffect, useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';

export default function LikeButton(props: any) {
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);

    useEffect(() => {
        console.log(isLiked);
    }, [])
    const handleLike = async () => {
        if (isLiked) {
            setIsLiked(false);
            props.onDataFromLikeButton(false);
        } else {
            setIsLiked(true);
            props.onDataFromLikeButton(true);
        }
    }

    const handleLikersPaginate = async (currentPage: any) => {
        props.likersPaginateIndex(currentPage);
    }

    const showLikersModal = () => {
        setIsLikersModalOpen(true);
    };

    const handleClose = () => {
        setIsLikersModalOpen(false);
    }
    return (
        <div className='education-drawer-like-area'>
            <Button key={props.key} className='like-button' onClick={() => { handleLike() }}>
                <svg className={isLiked ? "liked" : "no-like"} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000" viewBox="0 0 256 256"><path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path></svg>
            </Button>

            <div className='like-text'>
                <span onClick={showLikersModal} className={isLiked ? "liked" : "no-like"}>{props.likeCount}</span>
            </div>

            <Modal className='likers-modal' show={isLikersModalOpen} onHide={handleClose}>
                <Modal.Header className='likers-modal-header' closeButton>
                    <Modal.Title className='likers-modal-title'>Beğenenler ({props.likersTotalCount})</Modal.Title>
                </Modal.Header>

                <Modal.Body className='likers-modal-body'>
                    {
                        props.likers?.items.map((liker: GetListAccountResponse) => (
                            <li className='col-md-6'>
                                <div className='user-icon'>
                                    <Image src='/assets/Icons/common_show_picture_cached.png' />
                                </div>
                                <div className='user-name'>
                                    <span>{liker.firstName + " " + liker.lastName}</span>
                                </div>
                            </li>
                        ))
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Pagination onChange={(event: any) => handleLikersPaginate(event)} simple defaultCurrent={1} total={(props.likersPaginateCount * 10)} />
                </Modal.Footer>
            </Modal>
        </div>


    )
}
