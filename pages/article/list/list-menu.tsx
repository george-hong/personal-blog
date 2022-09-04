import Middle from '../../../components/middle/middle';
import TextField from '@mui/material/TextField';
import type { NextPage } from 'next';

const ListMenu: NextPage = () => {
  return (
    <Middle type="thin">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="filled"
        size="small"
      />
    </Middle>
  );
};

export default ListMenu;
