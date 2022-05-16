import React, { useRef, FC } from 'react';
import stylesCostruct from './ingredient-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';
import { TIngredient } from '../../utils/types';

type TIngredientConstructorProps = {
  data: TIngredient,
  index: number,
  moveItem: (dragIndex: number, hoverIndex: number) => void,
}

const IngredientConstructor: FC<TIngredientConstructorProps> = ({ data, index, moveItem }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: 'moveIngredient',
    item: { data, index },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'moveIngredient',
    collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        };
    },
    hover(item: any, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref));

  const dispatch = useDispatch();
  const deleteIngredient = (data: TIngredient) => {
    dispatch({
      type: DELETE_INGREDIENT,
      data: data,
    });
  };

  return (
    <li ref={ref} style={{opacity}} className={stylesCostruct.listItem + ' mt-4'} >
      <DragIcon type='primary' />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => deleteIngredient(data)}
      />
    </li>
  );
}

export default IngredientConstructor;