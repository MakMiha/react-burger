import React from 'react';
import stylesOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay (props) {
  return (
      <div className={stylesOverlay.overlay} onClick={props.closeModal}/>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};