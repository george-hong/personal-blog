import React, {
  Component,
} from 'react';
import { useRouter, NextRouter } from 'next/router';
import Box from '@mui/material/Box';
import TranslateIcon from '@mui/icons-material/Translate';
import PopoverMenu from '../popover-menu';
import { AVAILABLE_LANGUAGES_CONFIG } from '../../../config/project';
import type { NextPage } from 'next';
import type { ILanguageSwitcherProps } from './language-switcher.interface';
import type { IMenus } from '../popover-menu';

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
  const { locale } = router;
  const { className } = props;
  let hasOtherLanguage = false;
  let menus: IMenus = {};
  menus = Object.entries(AVAILABLE_LANGUAGES_CONFIG).reduce((result, languageAndConfig) => {
    const [language, config] = languageAndConfig;
    if (language !== locale) {
      hasOtherLanguage = true;
      result[language] = {
        content: config.description,
        onClick: getFuncOfToggleLanguage(language, router),
      }
    }
    return result;
  }, menus);

  // If did't had other languages, do not show switcher.
  if (!hasOtherLanguage) return null;

  return (
    <Box className={className}>
      <PopoverMenu menus={menus}>
        <TranslateIcon color="primary" />
      </PopoverMenu>
    </Box>
  );
};

export default LanguageSwitcher;
