import { ReactNode } from 'react';
import style from './middle.module.scss';
import type { NextPage } from 'next';

interface MiddleProps {
  children?: ReactNode;
  type?: 'thin' | 'thin-right';
  className?: string;
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
 * @param {string} [props.className] custom class name
 * @param {ReactElement | Component} [props.children] children node
 * @constructor
 */
const Middle: NextPage<MiddleProps, ReactNode> = (props) => {
  const { children, type, className: userClassName } = props;
  let outerClassName = style['middle-container'];
  let className = style['middle-content'];
  const extraClassName = type && typeAndClassMapping[type];
  if (userClassName) outerClassName += ` ${userClassName}`;
  if (extraClassName) className += ` ${style[extraClassName]}`;
  return (
    <div className={outerClassName}>
      <div className={className}>{ children || null }</div>
    </div>
  );
};

export default Middle;
