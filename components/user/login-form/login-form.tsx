import { Component, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import style from './login-form.module.scss';
import type { NextPage } from 'next';

interface IEmptyProps {
  tips?: string;
  cover?: boolean;
}

/**
 * content empty layout component
 * @param {Object} [props] component options
 * @param {string} [props.tips] Literal tips.
 * @constructor
 */
const LoginForm: NextPage<IEmptyProps, Component> = (props) => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Box className={style['login-form']}>
      <FormControl
        margin="normal"
        variant="standard"
      >
        <InputLabel htmlFor="account">Account</InputLabel>
        <Input
          id="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </FormControl>
      <FormControl
        variant="standard"
        margin="normal"
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
