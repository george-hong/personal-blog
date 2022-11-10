import React, {
  Component,
} from 'react';
import { useRouter, NextRouter } from 'next/router';
import Box from '@mui/material/Box';
import TranslateIcon from '@mui/icons-material/Translate';
import type { NextPage } from 'next';
import PopoverMenu from '../popover-menu';
import { ILanguageSwitcherProps } from './language-switcher.interface';

const getFuncOfToggleLanguage = (language: string, router: NextRouter) => {
  return () => {
    const { pathname, query, locale, asPath } = router;
    if (locale !== language) router.push({ pathname, query }, asPath, { locale: language });
  }
};

/**
 * language switch component
 * @param {Object} [props] component options
 * @param {string} [props.className] The class name of container.
 * @constructor
 */
const LanguageSwitcher: NextPage<ILanguageSwitcherProps, Component> = (props) => {
  const router = useRouter();
  const { className } = props;
  const menus = {
    zh: {
      content: '中文',
      onClick: getFuncOfToggleLanguage('zh', router),
    },
    en: {
      content: 'English',
      onClick: getFuncOfToggleLanguage('en', router),
    }
  };

  return (
    <Box className={className}>
      <PopoverMenu menus={menus}>
        <TranslateIcon />
      </PopoverMenu>
    </Box>
  );
};

export default LanguageSwitcher;
