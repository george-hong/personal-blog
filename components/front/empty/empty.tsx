import { Component } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from './empty.module.scss';
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
const Empty: NextPage<IEmptyProps, Component> = (props) => {
  const { tips, cover = false } = props;
  let className = style.empty;
  if (cover) className += ` ${style.cover}`

  return (
    <Box className={className}>
      <Typography
        variant="h3"
        component="div"
        color="font.main"
      >
        No Results Found
      </Typography>
      <Typography
        sx={{ mb: 1.5 }}
        color="text.secondary"
        className="single-line"
      >
        { tips ?? 'Please try another search' }
      </Typography>
    </Box>
  );
};

export default Empty;
