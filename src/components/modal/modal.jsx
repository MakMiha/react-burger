import React from 'react';
import ReactDOM from 'react-dom';
import stylesModal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

export default function Modal(props) {
  
  React.useEffect(() => {
    const escClose = (evt) => {
      if (evt.key === 'Escape') {
        props.closeModal();
      }
    }

    document.addEventListener('keydown', escClose, false);
    return () => {
      document.removeEventListener('keydown', escClose, false);
    };
  }, [props.closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={stylesModal.modal}>
        <button className={stylesModal.closeButton} onClick={props.closeModal} >
          <CloseIcon />
        </button>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.closeModal} />
    </>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};