import Middle from '../../../../components/middle/middle';
import style from './list-menu.module.scss';
import Box from '@mui/material/Box';
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
  if (top) className += ` ${style.top}`

  return (
    <Middle
      className={className}
      type="thin"
    >
      <Box sx={{ pt: 1, pb: 1, backgroundColor: 'bg.main' }}>
        <span>Category1</span>
        <span>Category2</span>
        <span>Category3</span>
        <span>Category4</span>
      </Box>
    </Middle>
  );
};

export default ListMenu;
