import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
import Link from 'next/link';
import type { NextPage } from 'next';

interface IHeaderRefProps {
  visibility?: boolean;
}
interface IHeaderProps {
  autoHide?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
}

const menuLinkContrast = {
  Home: '/',
  Article: '/article/detail',
  About: '/article/edit',
  List: '/article/list',
}

const HeaderRef: NextPage<IHeaderRefProps> = React.forwardRef((props, ref) => {
  const { visibility } = props;
  let className = `${style.header} ground-glass`;
  if (!visibility) className += ` ${style['hide-menu']}`;

  return (
    <header
      className={className}
      ref={ref}
    >
      <div className="content-container">
        <div className="content">
          {
            Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
              const [menu, link] = menuAndLink;
              return (
                <h3
                  className={style['header-link']}
                  key={menu}
                >
                  <Link href={link}>
                    { menu }
                  </Link>
                </h3>
              )
            })
          }
        </div>
      </div>
    </header>
  )
})

/**
 * The header component of layout component.
 * @param props {Object} component props
 * @param [props.autoHide] {boolean} Auto hide the header.
 * @param [props.onVisibilityChange] {Function} The callback of visibility changes.
 */
const Header: NextPage<IHeaderProps> = (props) => {
  const { autoHide = false, onVisibilityChange } = props;
  const [visibility, setVisibility] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const ref = React.createRef();
  let isSetEvent = false;
  let timer: number;

  useEffect(() => {
    if (!autoHide) return;
    const scrollHandler = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const height = ref?.current?.getBoundingClientRect()?.height;
        const scrollTop = document.documentElement.scrollTop;
        const isHide = scrollTop > height && scrollTop > lastScrollTop;
        setVisibility(!isHide);
        setLastScrollTop(scrollTop);
        onVisibilityChange && onVisibilityChange(!isHide);
      }, 50);
    };
    if (!isSetEvent && ref.current) {
      isSetEvent = true;
      window.addEventListener('scroll', scrollHandler);
    }
    return () => {
      isSetEvent = false;
      clearTimeout(timer);
      window.removeEventListener('scroll', scrollHandler);
    }
  });

  return (
    <HeaderRef
      ref={ref}
      visibility={visibility}
    />
  )
}

export default Header;
