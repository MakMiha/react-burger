import React, { FC } from 'react';
import stylesOverlay from './modal-overlay.module.css';

type TModalOverlayProps = {
  closeModal: () => void,
}

const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal }) => {
  return (
      <div className={stylesOverlay.overlay} onClick={closeModal}/>
  )
}

export default ModalOverlay;