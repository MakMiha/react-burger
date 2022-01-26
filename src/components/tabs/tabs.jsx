import React from 'react';
import stylesTabs from './tabs.module.css';
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

  const Tabs = () => {
    const [current, setCurrent] = React.useState('one');
    return (
      <div className={stylesTabs.tab + ' mt-5'}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    );
  };

export default Tabs;