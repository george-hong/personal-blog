import { Component } from 'react';
import Box from '@mui/material/Box';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import type { NextPage } from 'next';
import type { IInfiniteScrollProps } from './infinite-scroll.interface';
import useTranslation, { DefaultTranslationEnum } from '../../../tools/translation';

const getEndContent = (content: string) => {
  return (
    <Box
      className="content-horizontal-center"
      sx={{
        pt: 2,
        pb: 2,
        color: 'description.main'
      }}
    >{ content }</Box>
  )
};

const InfiniteScroll: NextPage<IInfiniteScrollProps, Component> = (props) => {
  const { t } = useTranslation(DefaultTranslationEnum.Base);
  const {
    next,
    loader,
    hasMore,
    children,
    dataLength,
    endMessage,
  } = props;
  return (
    <InfiniteScrollComponent
      next={next}
      hasMore={hasMore}
      dataLength={dataLength}
      loader={loader || getEndContent(t('加载中...'))}
      endMessage={endMessage || getEndContent(t('没有更多了。'))}
    >
      { children }
    </InfiniteScrollComponent>
  )
}

export default InfiniteScroll;
