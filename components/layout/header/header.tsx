import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
import Link from 'next/link';
import type { NextPage } from 'next';

interface IHeaderProps {
  isSubmenu?: boolean;
  submenu?: React.Component,
}

const menuLinkContrast = {
  Home: '/',
  Article: '/article/detail',
  About: '/article/edit',
  List: '/article/list',
}

const DomContent: NextPage<IHeaderProps> = React.forwardRef((props, ref) => {
  const { isSubmenu, submenu } = props;
  const submenuContent = submenu || null;
  let className = `${style.header} ground-glass`;
  if (isSubmenu && submenu) className += ` ${style.submenu}`;

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
      { submenuContent }
    </header>
  )
})


const Header: NextPage<IHeaderProps> = (props) => {
  const { submenu } = props;
  const [isSubmenu, setIsSubmenu] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const ref = React.createRef();
  let isSetEvent = false;
  let timer: number;

  useEffect(() => {
    const scrollHandler = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const height = ref?.current?.getBoundingClientRect()?.height;
        const scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop, lastScrollTop, height);
        setIsSubmenu(scrollTop > height && scrollTop > lastScrollTop);
        setLastScrollTop(scrollTop);
      }, 100);
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
    <DomContent
      ref={ref}
      isSubmenu={isSubmenu}
      submenu={submenu}
    />
  )
}

export default Header;
