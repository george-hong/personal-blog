import headerStyle from './header.module.scss';
import Link from 'next/link';

const menuLinkContrast = {
  Home: '/',
  Article: '/',
  About: '/',
}

const Header = () => {
  return (
    <header className={`${headerStyle.header} ground-glass`}>
      {
        Object.entries(menuLinkContrast).map((menuAndLink: [string, string]) => {
          const [menu, link] = menuAndLink;
          return (
            <h3
              className={headerStyle['header-link']}
              key={menu}
            >
              <Link href={link}>
                { menu }
              </Link>
            </h3>
          )
        })
      }
    </header>
  )
}

export default Header;
