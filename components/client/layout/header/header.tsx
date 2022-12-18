import React, {
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import useTranslation, { DefaultTranslationEnum } from '../../../../tools/translation';
import SignInDialog from '../../sign-in-dialog';
import LanguageSwitcher from '../../language-switcher';
import type { NextPage } from 'next';
import style from './header.module.scss';
import { IUserBaseInfo } from '../../../../interface/request-response/user.interface';
import UserForClient from '../../../../business/user/user-for-client';
import UserOperation from '../../user-operation';
import {
  connectStore,
  dispatcher,
  IWithStore,
  StoreModuleEnum,
} from '../../../../store';
import {
  IHeaderProps,
  IHeaderRefProps,
} from './header.interface';

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility, onSignIn, onSignOut, user } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const menuLinkContrast = {
    '/': t('首页'),
    '/article/list': t('文章'),
  };
  let className = `${ style.header } ground-glass`;
  if (!visibility) className += ` ${ style['hide-menu'] }`;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const router = useRouter();
  const { asPath } = router;
  const isSignUpPage = asPath.startsWith('/sign-up');
  const isEditPage = asPath.startsWith('/article/edit');
  const setUserBaseInfo = dispatcher.setUser;
  const mobileDisplayRuler = {
    xs: 'flex !important',
    sm: 'none !important',
  }
  const deskDisplayRuler = {
    xs: 'none !important',
    sm: 'flex !important',
  }

  useEffect(() => {
    dispatcher.setUser(UserForClient.getUserBaseInfoFromLocal());
  }, []);

  const signInFromHeader = (userBaseInfo: IUserBaseInfo) => {
    setUserBaseInfo(userBaseInfo);
    onSignIn && onSignIn(userBaseInfo);
  };
  const signOutFromHeader = () => {
    setUserBaseInfo(null);
    onSignOut && onSignOut();
  };
  const clickWritingButton = () => {
    setDrawerVisible(false);
    user ? router.push('/article/edit') : setDialogVisible(true);
  };
  const openDrawer = () => {
    if (!drawerVisible) setDrawerVisible(true);
  };
  const goToPage = (url: string) => {
    setDrawerVisible(false);
    router.push(url);
  };

  const headerRightPart = (
    <Fragment>
      {
        !isEditPage && (
          <Button
            sx={{
              mr: 2,
              display: deskDisplayRuler,
            }}
            variant="contained"
            onClick={clickWritingButton}
          >
            <EditIcon
              sx={{ mr: 1 }}
              fontSize="small"
            />
            {t('创作')}
          </Button>
        )
      }
      {
        user ?
          (
            <UserOperation
              userBaseInfo={ user }
              onSignOut={ signOutFromHeader }
            />
          ) : (
            <Typography
              classes={ { root: 'cursor-point' } }
              component="h3"
              sx={ { color: 'primary.main' } }
              onClick={ () => setDialogVisible(true) }
            >
              {t('登录/注册')}
            </Typography>
          )
      }
    </Fragment>
  );

  return (
    <Fragment>
      <Box
        component="header"
        className={ className }
        ref={ ref }
      >
        <Container classes={ { root: style['content-container'] } }>
          <Grid container>
            <Grid
              item
              xs={ 6 }
              sx={{ display: mobileDisplayRuler }}
            >
              <MenuIcon
                onClick={openDrawer}
                sx={{
                  color: 'primary.main',
                }}
              />
            </Grid>
            <Grid
              item
              xs={ 6 }
              sx={{ display: deskDisplayRuler }}
            >
              {
                Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
                  const [link, menu] = menuAndLink;
                  return (
                    <h3
                      className={ style['header-link'] }
                      key={ menu }
                    >
                      <Link href={ link }>
                        <Typography
                          component="span"
                          variant="h6"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                          }}
                        >
                          { menu }
                        </Typography>
                      </Link>
                    </h3>
                  );
                })
              }
            </Grid>
            <Grid
              className={`content-horizontal-right ${style['header-right']}`}
              item
              xs={ 6 }
            >
              <LanguageSwitcher className={style['language-switcher']} />
              {
                !isSignUpPage && headerRightPart
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Drawer
        anchor="top"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        sx={{ display: mobileDisplayRuler }}
      >
        <List>
          {
            Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
              const [link, menu] = menuAndLink;
              return (
                <ListItem key={link} disablePadding>
                  <ListItemButton onClick={() => goToPage(link)}>
                    <ListItemText primary={menu} />
                  </ListItemButton>
                </ListItem>
              );
            })
          }
          <ListItem key="writing" disablePadding>
            <ListItemButton onClick={clickWritingButton}>
              <ListItemText primary={t('创作')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <SignInDialog
        visible={ dialogVisible }
        onClose={ () => setDialogVisible(false) }
        onSignIn={ signInFromHeader }
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
 * @param {Function} [props.onSignIn] The callback of user sign in.
 * @param {Function} [props.onSignOut] The callback of user sign out.
 */
const Header: NextPage<IHeaderProps & IWithStore> = (props) => {
  const { autoHide = false, onVisibilityChange, onSignIn, onSignOut, dispatch, store } = props;
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
      onSignIn={ onSignIn }
      onSignOut={ onSignOut }
      user={ store.user }
      dispatch={ dispatch }
    />
  );
};

export default connectStore([StoreModuleEnum.USER])(Header);
