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
  IHeaderProps,
  IHeaderRefProps,
} from './header.interface';

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility, onSignIn, onSignOut } = props;
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const menuLinkContrast = {
    '/': t('home'),
    '/article/list': t('article'),
  };
  let className = `${ style.header } ground-glass`;
  if (!visibility) className += ` ${ style['hide-menu'] }`;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [userBaseInfo, setUserBaseInfo] = useState<IUserBaseInfo | null>(null);
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();
  const { asPath } = router;
  const isSignUpPage = asPath.startsWith('/sign-up');
  const isEditPage = asPath.startsWith('/article/edit');

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
    userBaseInfo ? router.push('/article/edit') : setDialogVisible(true);
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
        userBaseInfo ?
          (
            <UserOperation
              userBaseInfo={ userBaseInfo }
              onSignOut={ signOutFromHeader }
            />
          ) : (
            <Typography
              classes={ { root: 'cursor-point' } }
              component="h3"
              sx={ { color: 'primary.main' } }
              onClick={ () => setDialogVisible(true) }
            >
              {t('signIn/signUp')}
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
                      <Link href={ link }>
                        { menu }
                      </Link>
                    </h3>
                  );
                })
              }
            </Grid>
            <Grid
              className={`content-to-right ${style['header-right']}`}
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
const Header: NextPage<IHeaderProps> = (props) => {
  const { autoHide = false, onVisibilityChange, onSignIn, onSignOut } = props;
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
    />
  );
};

export default Header;