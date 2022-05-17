import React from 'react';
import stylesPreloader from './preloader.module.css';

export default function Preloader() {
  return (
    <div className={stylesPreloader.preloader}>
      <div className={stylesPreloader.spinner}></div>
      <div className={stylesPreloader.spinner}></div>    
    </div>
  );
}