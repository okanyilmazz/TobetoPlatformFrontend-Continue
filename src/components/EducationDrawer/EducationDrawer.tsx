import { Drawer } from 'antd';

function EducationDrawer(props: any) {

    return (
        <div className='slide-modal-page'>
            <Drawer className='education-drawer' onClose={props.onClose} open={props.open}>
                {
                    props.body
                }
            </Drawer>
        </div>
    )
}

export default EducationDrawer;
