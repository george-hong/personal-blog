import { ReactElement } from 'react';
import style from './middle.module.scss';
import type { NextPage } from 'next';

interface MiddleProps {
  children?: ReactElement;
  type?: 'thin'
}

const typeAndClassMapping = {
  thin: 'thin',
};

const Middle: NextPage<MiddleProps> = (props) => {
  const { children, type } = props;
  let className = style['middle-content'];
  const extraClassName = type && typeAndClassMapping[type];
  if (extraClassName) className += ` ${style[extraClassName]}`
  return (
    <div className={style['middle-container']}>
      <div className={className}>{ children || null }</div>
    </div>
  );
};

export default Middle;
