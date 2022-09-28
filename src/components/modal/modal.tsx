import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import stylesModal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TmodalProps = {
  children: any,
  closeModal: () => void;
};

const Modal: FC<TmodalProps> = ({ children, closeModal }) => {
  
  React.useEffect(() => {
    const escClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', escClose, false);
    return () => {
      document.removeEventListener('keydown', escClose, false);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={stylesModal.modal}>
        <button className={stylesModal.closeButton} onClick={closeModal} >
          <CloseIcon type='primary'/>
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    document.getElementById('modal') as HTMLElement
  );
}

export default Modal;