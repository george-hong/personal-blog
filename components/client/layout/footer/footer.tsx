import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import style from './footer.module.scss';

const Footer = () => {
  return (
    <Box
      className={style.footer}
      sx={{ backgroundColor: 'info.dark' }}
    >
      <Container
        sx={{ pt: 3, pb: 3 }}
      >
        Footer
      </Container>
    </Box>
  )
}

export default Footer;
