import { Component, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import style from './login-form.module.scss';
import type { NextPage } from 'next';

interface ILoginFormProps {

}
interface IFieldInfo {
  value: string;
  error: boolean;
  tips: string;
}
type SetFieldInfo = (fieldInfo: IFieldInfo) => void;
const getFieldDefaultValue = (): IFieldInfo => ({ value: '', error: false, tips: ' ' });
const resetFieldValidation = (fieldInfo: IFieldInfo, setFieldInfo: SetFieldInfo) => {
  setFieldInfo({
    ...fieldInfo,
    error: false,
    tips: ' ',
  });
}
const validateAccountAndPassword = (
  accountInfo: IFieldInfo,
  setAccountInfo: SetFieldInfo,
  passwordInfo: IFieldInfo,
  setPasswordInfo: SetFieldInfo
) => {
  if (!accountInfo.value) {
    setAccountInfo({
      ...accountInfo,
      error: true,
      tips: '请填写账号',
    });
  }
  if (!passwordInfo.value) {
    setPasswordInfo({
      ...passwordInfo,
      error: true,
      tips: '请填写密码',
    });
  }
}

/**
 * content login form component
 * @constructor
 */
const LoginForm: NextPage<ILoginFormProps, Component> = (props) => {
  const [accountInfo, setAccountInfo] = useState<IFieldInfo>(getFieldDefaultValue());
  const [passwordInfo, setPasswordInfo] = useState<IFieldInfo>(getFieldDefaultValue());

  return (
    <Box className={style['login-form']}>
      <TextField
        required
        id="account"
        label="账号"
        variant="standard"
        value={accountInfo.value}
        helperText={accountInfo.tips}
        error={accountInfo.error}
        onChange={(e) => setAccountInfo({ ...accountInfo, value: e.target.value })}
        onFocus={() => resetFieldValidation(accountInfo, setAccountInfo)}
      />
      <TextField
        required
        id="password"
        type="password"
        label="密码"
        variant="standard"
        value={passwordInfo.value}
        helperText={passwordInfo.tips}
        error={passwordInfo.error}
        onChange={(e) => setPasswordInfo({ ...passwordInfo, value: e.target.value })}
        onFocus={() => resetFieldValidation(passwordInfo, setPasswordInfo)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 1 }}
        onClick={() => {
          validateAccountAndPassword(
            accountInfo,
            setAccountInfo,
            passwordInfo,
            setPasswordInfo
          )
        }}
      >
        登录
      </Button>
    </Box>
  );
};

export default LoginForm;
