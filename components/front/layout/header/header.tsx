import React, {
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoginDialog from '../../login-dialog';
import type { NextPage } from 'next';
import style from './header.module.scss';
import { IUserBaseInfo } from '../../../../interface/request-response/user.interface';
import UserForFront from '../../../../business/user/user-for-front';
import UserOperation from '../../user-operation';
import {
  IHeaderProps,
  IHeaderRefProps,
} from './header.interface';

const menuLinkContrast = {
  '/': '首页',
  '/article/list': '文章',
};

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility, onLogin, onLogout } = props;
  let className = `${ style.header } ground-glass`;
  if (!visibility) className += ` ${ style['hide-menu'] }`;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [userBaseInfo, setUserBaseInfo] = useState<IUserBaseInfo | null>(null);
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();
  const { asPath } = router;
  const isRegisterPage = asPath.startsWith('/register');

  useEffect(() => {
    setUserBaseInfo(UserForFront.getUserBaseInfoFromLocal());
    setIsSet(true);
  }, [isSet]);

  const loginFromHeader = (userBaseInfo: IUserBaseInfo) => {
    setUserBaseInfo(userBaseInfo);
    onLogin && onLogin(userBaseInfo);
  };
  const logoutFromHeader = () => {
    setUserBaseInfo(null);
    onLogout && onLogout();
  };
  const headerRightPart = isSet && (
    userBaseInfo ?
      (
        <UserOperation
          userBaseInfo={ userBaseInfo }
          onLogout={ logoutFromHeader }
        />
      ) : (
        <Typography
          classes={ { root: 'cursor-point' } }
          component="h3"
          sx={ { color: 'primary.main' } }
          onClick={ () => setDialogVisible(true) }
        >
          登录/注册
        </Typography>
      )
  );

  return (
    <Fragment>
      <header
        className={ className }
        ref={ ref }
      >
        <Container classes={ { root: style['content-container'] } }>
          <Grid container>
            <Grid item xs={ 8 }>
              {
                Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
                  const [link, menu] = menuAndLink;
                  return (
                    <h3
                      className={ style['header-link'] }
                      key={ menu }
                    >
                      <Link href={ link }>
                        { menu }
                      </Link>
                    </h3>
                  );
                })
              }
            </Grid>
            <Grid
              className="content-to-right"
              item
              xs={ 4 }
            >
              {
                !isRegisterPage && headerRightPart
              }
            </Grid>
          </Grid>
        </Container>
      </header>
      <LoginDialog
        visible={ dialogVisible }
        onClose={ () => setDialogVisible(false) }
        onLogin={ loginFromHeader }
      />
    </Fragment>
  );
});

HeaderRef.displayName = 'HeaderRef';

/**
 * The header component of layout component.
 * @param {Object} props component props
 * @param {boolean} [props.autoHide] Auto hide the header.
 * @param {Function} [props.onVisibilityChange] The callback of visibility changes.
 * @param {Function} [props.onLogin] The callback of user login.
 * @param {Function} [props.onLogout] The callback of user logout.
 */
const Header: NextPage<IHeaderProps> = (props) => {
  const { autoHide = false, onVisibilityChange, onLogin, onLogout } = props;
  const [visibility, setVisibility] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const ref = React.createRef<HTMLHeadElement>();

  useEffect(() => {
    if (!autoHide) return;
    let isSetEvent = false;
    const scrollHandler = () => {
      if (timer) clearTimeout(timer);
      const index = setTimeout(() => {
        const height = ref?.current?.getBoundingClientRect()?.height ?? 0;
        const scrollTop = document.documentElement.scrollTop;
        const isHide = scrollTop > height && scrollTop > lastScrollTop;
        setVisibility(!isHide);
        setLastScrollTop(scrollTop);
        onVisibilityChange && onVisibilityChange(!isHide);
      }, 50);
      setTimer(index);
    };
    if (!isSetEvent && ref.current) {
      isSetEvent = true;
      window.addEventListener('scroll', scrollHandler);
    }
    return () => {
      isSetEvent = false;
      if (timer) clearTimeout(timer);
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  return (
    <HeaderRef
      ref={ ref }
      visibility={ visibility }
      onLogin={ onLogin }
      onLogout={ onLogout }
    />
  );
};

export default Header;
