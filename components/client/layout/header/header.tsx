import React, {
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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
  StoreModuleEnum,
  UserActionEnum,
} from '../../../../store';
import {
  IHeaderProps,
  IHeaderRefProps,
  IHeaderStore,
} from './header.interface';
import { StoreUserField } from '../../../../interface/store.interface';

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility, onSignIn, onSignOut, user, dispatch } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const menuLinkContrast = {
    '/': t('Home'),
    '/article/list': t('Article'),
  };
  let className = `${ style.header } ground-glass`;
  if (!visibility) className += ` ${ style['hide-menu'] }`;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();
  const { asPath } = router;
  const isSignUpPage = asPath.startsWith('/sign-up');
  const isEditPage = asPath.startsWith('/article/edit');

  const setUserBaseInfo = (userBaseInfo: StoreUserField) => dispatch({
    module: StoreModuleEnum.USER,
    type: UserActionEnum.SET,
    data: userBaseInfo,
  });

  useEffect(() => {
    setUserBaseInfo(UserForClient.getUserBaseInfoFromLocal());
    setIsSet(true);
  }, [isSet]);

  const signInFromHeader = (userBaseInfo: IUserBaseInfo) => {
    setUserBaseInfo(userBaseInfo);
    onSignIn && onSignIn(userBaseInfo);
  };
  const signOutFromHeader = () => {
    setUserBaseInfo(null);
    onSignOut && onSignOut();
  };
  const clickWritingButton = () => {
    user ? router.push('/article/edit') : setDialogVisible(true);
  };

  const headerRightPart = isSet && (
    <Fragment>
      {
        !isEditPage && (
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={clickWritingButton}
          >
            <EditIcon
              sx={{ mr: 1 }}
              fontSize="small"
            />
            {t('writing')}
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
              {t('sign in / sign up')}
            </Typography>
          )
      }
    </Fragment>
  );

  return (
    <Fragment>
      <header
        className={ className }
        ref={ ref }
      >
        <Container classes={ { root: style['content-container'] } }>
          <Grid container>
            <Grid item xs={ 6 }>
              {
                Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
                  const [link, menu] = menuAndLink;
                  return (
                    <h3
                      className={ style['header-link'] }
                      key={ menu }
                    >
                      <Typography
                        href={ link }
                        component="a"
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      >
                        { menu }
                      </Typography>
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
      </header>
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
const Header: NextPage<IHeaderProps & IHeaderStore> = (props) => {
  const { autoHide = false, onVisibilityChange, onSignIn, onSignOut, user, dispatch } = props;
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
      user={ user }
      dispatch={ dispatch }
    />
  );
};

export default connectStore([StoreModuleEnum.USER])(Header);
