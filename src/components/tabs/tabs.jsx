import React from 'react';
import stylesTabs from './tabs.module.css';
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

  const Tabs = ({ current, setCurrent }) => {
    return (
      <div className={stylesTabs.tab + ' mt-5'}>
        <Tab value='one' active={current === 'one'} onClick={() =>(setCurrent('one'))}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={() =>(setCurrent('two'))}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={() =>(setCurrent('three'))}>
          Начинки
        </Tab>
      </div>
    );
  };

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
};
export default Tabs;