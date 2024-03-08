import { Pagination } from 'antd';
import { useEffect, useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import GetListAccountResponse from '../../models/responses/account/getListAccountResponse';

export default function LikeButton(props: any) {
    const [isLiked, setIsLiked] = useState<boolean>();
    const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);
    useEffect(() => {
        setIsLiked(props.isLiked);
    }, [props.isLiked]);

    const handleLike = async () => {
        if (isLiked) {
            props.onDataFromLikeButton(false);
            setIsLiked(false);
        } else {
            props.onDataFromLikeButton(true);
            setIsLiked(true);
        }
    }

    const handleLikersPaginate = async (currentPage: any) => {
        props.likersPaginateIndex(currentPage);
    }

    const showLikersModal = () => {
        setIsLikersModalOpen(true);
    };

    const handleCloseLikersModal = () => {
        setIsLikersModalOpen(false);
    }

    return (
        <div className='education-drawer-like-area '>
            <Button className='like-button' key={props.buttonKey} onClick={() => { handleLike() }}>
                <svg key={props.buttonKey} className={isLiked ? "liked" : "no-like"} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000" viewBox="0 0 256 256">
                    <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
                </svg>
            </Button>

            <div className='like-text '>
                <span key={props.buttonKey} onClick={showLikersModal} className={isLiked ? "liked" : "no-like"}>{props.likeCount}</span>
            </div>

            <Modal key={props.buttonKey} className='likers-modal' show={isLikersModalOpen} onHide={handleCloseLikersModal}>
                <Modal.Header key={props.buttonKey} className='likers-modal-header' closeButton>
                    <Modal.Title key={props.buttonKey} className='likers-modal-title'>Beğenenler ({props.likersTotalCount})</Modal.Title>
                </Modal.Header>

                <Modal.Body key={props.buttonKey} className='likers-modal-body'>
                    {props.likers?.items.map((liker: GetListAccountResponse, index: number) => (
                        <li key={liker.id ? liker.id.toString() : index.toString()} className='col-md-6'>
                            <div className='user-icon'>
                                <Image src='/assets/Icons/common_show_picture_cached.png' />
                            </div>
                            <div className='user-name'>
                                <span>{liker.firstName + " " + liker.lastName}</span>
                            </div>
                        </li>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <Pagination key={props.buttonKey} onChange={(event: any) => handleLikersPaginate(event)} simple defaultCurrent={0} total={(props.likersPaginateCount * 10)} />
                </Modal.Footer>
            </Modal>
        </div>
    );
}
