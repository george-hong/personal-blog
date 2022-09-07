import { ReactElement, Component } from 'react';
import style from './middle.module.scss';
import type { NextPage } from 'next';

interface MiddleProps {
  children?: Array<ReactElement | Component>;
  type?: 'thin' | 'thin-right'
}

const typeAndClassMapping = {
  thin: 'thin',
  right: 'right',
  'thin-right': 'thin right'
};


/**
 * content layout component
 * @param {Object} [props] component options
 * @param {string} [props.type] layout mode
 * @param {ReactElement | Component} [props.children] children node
 * @constructor
 */
const Middle: NextPage<MiddleProps, Component> = (props) => {
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
