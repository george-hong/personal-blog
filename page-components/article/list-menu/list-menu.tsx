import style from './list-menu.module.scss';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';

interface IListMenuProps {
  top?: boolean;
}

/**
 * the menu component for the page of article list
 * @param props {Object} component props
 * @param [props.top] {boolean} Is menu capture to the top of page.
 */
const ListMenu: NextPage<IListMenuProps> = (props) => {
  const { top } = props;
  let className = style['list-menu'];
  if (top) className += ` ${style.top}`;

  return (
    <Container
      classes={{ root: className }}
      sx={{ pt: 1, pb: 1, backgroundColor: 'bg.main' }}
      disableGutters
      maxWidth={false}
    >
      <span>Category1</span>
      <span>Category2</span>
      <span>Category3</span>
      <span>Category4</span>
    </Container>
  );
};

export default ListMenu;
