import React, {
  useEffect,
  useState,
  ReactNode,
  ForwardedRef,
  Fragment,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoginDialog from '../../login-dialog/login-dialog';
import type { NextPage } from 'next';
import style from './header.module.scss';
import { IUserBaseInfo } from '../../../../interface/user.interface';
import UserForFront from '../../../../business/user/user-for-front';
import UserOperation from '../../user-operation';

interface IHeaderRefProps {
  visibility?: boolean;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
  ref: ForwardedRef<HTMLHeadElement>;
}
interface IHeaderProps {
  autoHide?: boolean;
  onLogin?: (userBaseInfo: IUserBaseInfo) => void;
  onVisibilityChange?: (visibility: boolean) => void;
}

const menuLinkContrast = {
  Home: '/',
  About: '/article/edit',
  List: '/article/list',
}

const HeaderRef: NextPage<IHeaderRefProps, ReactNode> = React.forwardRef<HTMLHeadElement, IHeaderRefProps>((props, ref) => {
  const { visibility, onLogin } = props;
  let className = `${style.header} ground-glass`;
  if (!visibility) className += ` ${style['hide-menu']}`;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  // TODO: Avoid the rendering error of next line;
  // const [userBaseInfo] = useState<IUserBaseInfo | null>((typeof window !== undefined && UserForFront.getUserBaseInfoFromLocal()) || null);
  const userBaseInfo = null;
  const router = useRouter();
  const { asPath } = router;
  const isRegisterPage = asPath.startsWith('/register');

  const headerRightPart = (
    userBaseInfo ?
      (
        <UserOperation userBaseInfo={userBaseInfo} />
      ) : (
        <Typography
          classes={{ root: 'cursor-point' }}
          component="h3"
          sx={{ color: 'primary.main' }}
          onClick={() => setDialogVisible(true)}
        >
          登录/注册
        </Typography>
      )
  )

  return (
    <Fragment>
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
              {
                !isRegisterPage && headerRightPart
              }
            </Grid>
          </Grid>
        </Container>
      </header>
      <LoginDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onLogin={onLogin}
      />
    </Fragment>
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
  const { autoHide = false, onVisibilityChange, onLogin } = props;
  const [visibility, setVisibility] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const ref = React.createRef<HTMLHeadElement>();
  let isSetEvent = false;

  useEffect(() => {
    if (!autoHide) return;
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
    }
  });

  return (
    <HeaderRef
      ref={ref}
      visibility={visibility}
      onLogin={onLogin}
    />
  )
}

export default Header;
