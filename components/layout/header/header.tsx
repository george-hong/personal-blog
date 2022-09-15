import React, { useEffect, useState, ReactNode, ForwardedRef } from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import style from './header.module.scss';

interface IHeaderRefProps {
  visibility?: boolean;
  ref: ForwardedRef<HTMLHeadElement>;
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

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility } = props;
  let className = `${style.header} ground-glass`;
  if (!visibility) className += ` ${style['hide-menu']}`;

  return (
    <header
      className={className}
      ref={ref}
    >
      <Container classes={{ root: style['content-container'] }}>
        <Grid container>
          <Grid item xs={8}>
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
          </Grid>
          <Grid
            className="content-to-right"
            item
            xs={4}
          >
            <Typography
              classes={{ root: 'cursor-point' }}
              component="h3"
              sx={{ color: 'primary.main' }}
            >
              Login in / Sign in
            </Typography>
          </Grid>
        </Grid>

      </Container>
    </header>
  )
});

HeaderRef.displayName = 'HeaderRef';

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
  const ref = React.createRef<HTMLHeadElement>();
  let isSetEvent = false;
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (!autoHide) return;
    const scrollHandler = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const height = ref?.current?.getBoundingClientRect()?.height ?? 0;
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
