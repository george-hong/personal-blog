import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  COPYRIGHT,
  github,
  record,
} from '../../../../config/constant';
import style from './footer.module.scss';

const Footer = () => {
  const fontColorConfig = {
    color: 'primaryContrast.dark',
  };
  const fontConfig = {
    pl: 2,
    pr: 2,
    ...fontColorConfig,
  };
  return (
    <Box
      className={style.footer}
      sx={{
        backgroundColor: 'primary.dark',
        display: {
          xs: 'none',
          sm: 'block',
        }
      }}
    >
      <Container
        sx={{ pt: 3, pb: 3 }}
        classes={{ root: 'content-horizontal-center content-vertical-center' }}
      >
        <Typography
          component="span"
          sx={fontConfig}
        >
          { COPYRIGHT }
        </Typography>
        <Typography
          component="span"
          sx={fontColorConfig}
        >
          |
        </Typography>
        <Typography
          href={ record.link }
          target="blank"
          component="a"
          sx={fontConfig}
        >
          { record.text }
        </Typography>
        <Typography
          component="span"
          sx={fontColorConfig}
        >
          |
        </Typography>
        <Typography
          href={ github.link }
          target="blank"
          component="a"
          sx={fontConfig}
          classes={{ root: 'content-vertical-center' }}
        >
          <GitHubIcon
            fontSize="small"
            sx={{ mr: 1 }}
          />
          { github.text }
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer;
