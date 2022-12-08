import { FC } from 'react';
import Container from '@mui/material/Container';
import style from './error-info.module.scss';
import { IErrorInfoProps } from './error-info.interface';

const ErrorInfo: FC<IErrorInfoProps> = (props) => {
  const { className, error } = props;
  let errorInfo;
  try {
    errorInfo = JSON.stringify(error);
  } catch (err) {
    errorInfo = String(error);
  }

  return (
    <Container classes={{ root: `${className ?? ''} ${style['error-info']}` }}>
      { errorInfo }
    </Container>
  )
}

export default ErrorInfo;
