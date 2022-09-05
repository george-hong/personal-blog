import Middle from '../../../components/middle/middle';
import type { NextPage } from 'next';

const ListMenu: NextPage = () => {
  return (
    <Middle type="thin">
      <span>Category1</span>
      <span>Category2</span>
      <span>Category3</span>
      <span>Category4</span>
    </Middle>
  );
};

export default ListMenu;
