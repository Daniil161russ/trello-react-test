import Modal from 'react-modal';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';

import './ConfirmModal.scss';

const ConfirmModal = (props) => {

    const { title, content, show, onAction} = props;
  
  return (
    <>
      <Modal
        isOpen={show}
        onRequestClose={() => onAction(MODAL_ACTION_CLOSE)}
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
            }
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <header className='modal__header'>
            { title }
        </header>
        <div className='modal__content'>
            { content }
        </div>
        <footer className='modal__footer'>
            <button className='btn btn-close' onClick={() => onAction(MODAL_ACTION_CLOSE)}>Close</button>
            <button className='btn btn-confirm' onClick={() => onAction(MODAL_ACTION_CONFIRM)}>Confirm</button>
        </footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;