import Box from '@mui/material/Box';
import style from './list-menu.module.scss';
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
    <Box
      className={`${className} ground-glass`}
      sx={{ pt: 1, pb: 1 }}
    >
      <Box className={style['menu-container']}>
        <Box>
          <span>Category1</span>
          <span>Category2</span>
          <span>Category3</span>
          <span>Category4</span>
        </Box>
      </Box>
    </Box>
  );
};

export default ListMenu;
