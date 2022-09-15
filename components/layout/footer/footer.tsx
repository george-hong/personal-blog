import Box from '@mui/material/Box';
import style from './footer.module.scss';

const Footer = () => {
  return (
    <Box
      className={style.footer}
      sx={{ pd: 3, backgroundColor: 'info.dark' }}
    >
      Footer
    </Box>
  )
}

export default Footer;
